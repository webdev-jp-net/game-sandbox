type useProgressBoardProps = {
  fieldStep: number
}

export const useProgressBoard = ({ fieldStep }: useProgressBoardProps) => {
  // fieldStepの数だけ、indexが入る配列
  const fieldStepArray = new Array(fieldStep + 1)
    .fill(null)
    .map((_, index) => (index === 0 ? 'START' : index === fieldStep ? 'GOAL' : index))

  return {
    fieldStepArray,
  }
}
