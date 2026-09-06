const sortBySequence = <T extends { sequence?: number }>(items: readonly T[]) =>
  [...items].sort((left, right) => (left.sequence ?? 0) - (right.sequence ?? 0));

export default sortBySequence;
