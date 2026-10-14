import test from 'node:test';
import assert from 'node:assert/strict';

// Regressions guarded: a boundary assigning two active beats, early advancement
// during a reading hold, and stale state after a reverse or distant scroll.
const { resolveJourney, resolveGuidePosition } = await import('../site/assets/journey-state.js').catch(() => ({}));
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

test('keeps the guide still for reading and advances only during the handoff', () => {
  assert.equal(typeof resolveGuidePosition,'function','The guide reading hold is not implemented');
  assert.equal(resolveGuidePosition(2,0.1,10),2/9);
  assert.equal(resolveGuidePosition(2,0.6,10),2/9);
  assert.ok(Math.abs(resolveGuidePosition(2,0.825,10)-0.2777777777777778)<1e-12);
  assert.equal(resolveGuidePosition(2,1,10),3/9);
  assert.equal(resolveGuidePosition(9,1,10),1);
});
