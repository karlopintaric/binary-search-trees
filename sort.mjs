export default function mergeSortWithoutDuplicates(arr) {
  if (arr.length === 1) {
    return arr;
  }

  const mid = Math.ceil(arr.length / 2);
  const leftArr = mergeSortWithoutDuplicates(arr.slice(0, mid));
  const rightArr = mergeSortWithoutDuplicates(arr.slice(mid));

  let i = 0;
  let j = 0;
  const m = leftArr.length;
  const n = rightArr.length;
  const sortedArr = [];

  while (i < m && j < n) {
    if (leftArr[i] < rightArr[j]) {
      sortedArr.push(leftArr[i]);
      i++;
    } else if (leftArr[i] > rightArr[j]) {
      sortedArr.push(rightArr[j]);
      j++;
    } else {
      i++;
    }
  }

  if (i === m) {
    sortedArr.push(...rightArr.slice(j));
  } else {
    sortedArr.push(...leftArr.slice(i));
  }

  return sortedArr;
}
