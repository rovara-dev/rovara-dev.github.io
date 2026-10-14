// The same position selects the same beat in either scroll direction.
export function resolveJourney(cursor, starts, end) {
  if (!starts.length) return null;
  let index = 0;
  for (let i = 1; i < starts.length; i++) {
    if (cursor >= starts[i]) index = i;
  }
  const next = starts[index + 1] ?? end;
  const progress = Math.max(0, Math.min(1, (cursor - starts[index]) / Math.max(1, next - starts[index])));
  return { index, progress };
}

export function resolveGuidePosition(index, groups) {
  const lastGroup = Math.max(0,...groups);
  if (!lastGroup) return 0;
  return (groups[index] ?? 0) / lastGroup;
}

// Reading holds remain still. Only a small interval around each boundary
// carries the conversation to its next message, in either scroll direction.
export function resolveJourneyMotion(cursor, starts, end) {
  const state = resolveJourney(cursor,starts,end);
  if (!state) return null;
  const halfSpan = index => Math.min(110,
    Math.max(1,starts[index]-starts[index-1]) * .22,
    Math.max(1,(starts[index+1] ?? end)-starts[index]) * .22);
  const { index } = state;
  const settleAt = index ? starts[index] + halfSpan(index) + 1 : starts[0];
  let boundary;
  if (index && cursor < starts[index] + halfSpan(index)) boundary = index;
  else if (index < starts.length-1 && cursor > starts[index+1] - halfSpan(index+1)) boundary = index+1;
  if (boundary === undefined) return { index,from:index,to:index,mix:0,settleAt };
  const span = halfSpan(boundary);
  const progress = Math.max(0,Math.min(1,(cursor-starts[boundary]+span)/(2*span)));
  const mix = progress * progress * (3-2*progress);
  return { index,from:boundary-1,to:boundary,mix,settleAt };
}
