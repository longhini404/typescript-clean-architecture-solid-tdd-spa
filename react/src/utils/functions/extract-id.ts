export const extractID = (list: any): number[] => {
  return Object.keys(list).map(item => list[item].id)
}
