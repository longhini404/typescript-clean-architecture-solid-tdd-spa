export type DataAdapter = Array<{
  id: string
  value: string
}>

export const selectDataAdapter = (
  data: any[],
  keyId: string,
  keyValue: string
): DataAdapter => {
  const dataAdapter = data.map(item => {
    return { id: String(item[`${keyId}`]), value: item[`${keyValue}`] }
  })
  return dataAdapter
}
