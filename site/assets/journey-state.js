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

export function resolveGuidePosition(index, progress, count) {
  if (count < 2) return 0;
  const handoff = Math.max(0,Math.min(1,(progress - 0.65) / 0.35));
  return Math.min(1,(index + handoff) / (count - 1));
}
