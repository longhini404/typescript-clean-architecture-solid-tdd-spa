export const cleanJsonEmptyInformation = (json: string) => {
  const formattedData = { ...JSON.parse(json) }
  const tests = Object.entries(formattedData)
  for (const [key, value] of tests) {
    if (typeof value === 'object' && value !== null) {
      const deeperEntries = Object.entries(value)
      for (const [innerKey, innerValue] of deeperEntries) {
        if (innerValue === '') {
          delete formattedData[key][innerKey]
        }
      }
      if (Object.keys(value).length === 0) {
        delete formattedData[key]
      }
    }
  }
  return formattedData
}
