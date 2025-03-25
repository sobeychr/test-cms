export const hasIntersection = (arr1: Array<number | string>, arr2: Array<number | string>): boolean => {
  const set1 = new Set(arr1);
  const set2 = new Set(arr2);
  return set1.intersection(set2).size > 0;
};
