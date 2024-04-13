export const useProgressBoard = () => {
  // ゴールまでのステップ数
  const fieldStep = 10

  // fieldStepの数だけ、indexが入る配列
  const fieldStepArray = new Array(fieldStep + 1)
    .fill(null)
    .map((_, index) => (index === 0 ? 'START' : index === fieldStep ? 'GOAL' : index))

  return {
    fieldStepArray,
  }
}
