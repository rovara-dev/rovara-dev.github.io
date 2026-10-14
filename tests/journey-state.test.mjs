import test from 'node:test';
import assert from 'node:assert/strict';

// Regressions guarded: a boundary assigning two active beats, early advancement
// during a reading hold, and stale state after a reverse or distant scroll.
const { resolveJourney, resolveGuidePosition, resolveJourneyMotion } = await import('../site/assets/journey-state.js').catch(() => ({}));
const state = (...args) => {
  assert.equal(typeof resolveJourney, 'function', 'The guided journey resolver is not implemented');
  return resolveJourney(...args);
};

test('holds a single beat until its next scroll boundary', () => {
  const starts = [100, 850, 1600];
  for (const cursor of [100, 300, 600, 849.9]) {
    assert.equal(state(cursor, starts, 2350).index, 0);
  }
  assert.equal(state(850, starts, 2350).index, 1);
});

test('resolves reverse and distant jumps from position rather than previous state', () => {
  const starts = [100, 850, 1600, 2350, 3100, 3850];
  assert.equal(state(3900, starts, 4600).index, 5);
  assert.equal(state(900, starts, 4600).index, 1);
  assert.equal(state(3200, starts, 4600).index, 4);
});

test('clamps positions outside the story without losing its first or final beat', () => {
  assert.deepEqual(state(-500, [100, 850, 1600], 2350), { index:0, progress:0 });
  assert.deepEqual(state(5000, [100, 850, 1600], 2350), { index:2, progress:1 });
});

test('uses each measured beat length, including the final reading hold', () => {
  assert.deepEqual(state(650, [100, 1200, 1600], 2400), { index:0, progress:0.5 });
  assert.deepEqual(state(1400, [100, 1200, 1600], 2400), { index:1, progress:0.5 });
  assert.deepEqual(state(2000, [100, 1200, 1600], 2400), { index:2, progress:0.5 });
});

test('keeps the guide beside Plan through clarification, revision and approval', () => {
  const groups = [0,1,1,1,2,3,4,4,5,6];
  for (const index of [1,2,3]) assert.equal(resolveGuidePosition(index,groups),1/6);
  assert.equal(resolveGuidePosition(4,groups),2/6);
});

test('keeps correction and retest on one chapter and supports reverse jumps', () => {
  const groups = [0,1,1,1,2,3,4,4,5,6];
  assert.equal(resolveGuidePosition(9,groups),1);
  assert.equal(resolveGuidePosition(6,groups),4/6);
  assert.equal(resolveGuidePosition(7,groups),4/6);
  assert.equal(resolveGuidePosition(0,groups),0);
});

test('a single chapter has a stable guide origin', () => {
  assert.equal(resolveGuidePosition(0,[0]),0);
  assert.equal(resolveGuidePosition(0,[]),0);
});

// A snapped index would move an entire message between adjacent scroll pixels.
const motion = (...args) => {
  assert.equal(typeof resolveJourneyMotion, 'function', 'Continuous journey motion is not implemented');
  return resolveJourneyMotion(...args);
};
const visualPosition = state => state.from + (state.to - state.from) * state.mix;

test('moves continuously across a chapter boundary while selecting one chapter', () => {
  const before = motion(599, [0,600,1200], 1800);
  const middle = motion(600, [0,600,1200], 1800);
  const after = motion(601, [0,600,1200], 1800);
  assert.equal(before.index,0);
  assert.equal(after.index,1);
  assert.equal(visualPosition(middle),0.5);
  assert.ok(visualPosition(before)<0.5 && visualPosition(after)>0.5);
  assert.ok(visualPosition(after)-visualPosition(before)<0.02,'Two pixels must not jump an entire message');
});

test('keeps a settled reading interval without revealing the next message', () => {
  for (const cursor of [0,100,300,400]) {
    const state = motion(cursor,[0,600,1200],1800);
    assert.equal(state.from,0);
    assert.equal(state.to,0);
    assert.equal(visualPosition(state),0);
  }
  assert.equal(visualPosition(motion(900,[0,600,1200],1800)),1);
});

test('reverses the same glide from scroll position without accumulating animation state', () => {
  const cursors=[480,530,580,600,620,670,720];
  const forward=cursors.map(cursor=>visualPosition(motion(cursor,[0,600,1200],1800)));
  assert.ok(forward.every((value,index)=>!index || value>=forward[index-1]));
  assert.deepEqual(cursors.toReversed().map(cursor=>visualPosition(motion(cursor,[0,600,1200],1800))),forward.toReversed());
});

test('short beats still have a settled arrival before their next handoff', () => {
  const starts=[0,240,800,1040];
  for(const index of [1,2,3]) {
    const arrival=motion(starts[index],starts,2000);
    const settled=motion(arrival.settleAt,starts,2000);
    assert.equal(settled.index,index);
    assert.equal(settled.from,index);
    assert.equal(settled.to,index);
    assert.ok(arrival.settleAt<(starts[index+1]??2000));
  }
});

test('distant scrolls and the final hold never invent intermediate or future scenes', () => {
  assert.equal(visualPosition(motion(900,[0,240,800,1040],2000)),2);
  assert.equal(visualPosition(motion(5000,[0,240,800,1040],2000)),3);
  assert.equal(visualPosition(motion(-500,[0,240,800,1040],2000)),0);
  assert.equal(motion(100,[],2000),null);
  assert.equal(visualPosition(motion(100,[0],2000)),0);
});
