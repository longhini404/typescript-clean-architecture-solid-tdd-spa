export const nameFormatter = (
  name: string | null,
  maxLength?: number
): string => {
  if (name) {
    const nameLength = name.length
    let nameArray = []
    let spaceIndex = 0

    for (let i = 0; i < nameLength; i += 1) {
      const letra = name.charAt(i)
      if (letra === ' ') {
        nameArray.push(name.slice(spaceIndex, i).toLowerCase())
        spaceIndex = i + 1
      }
    }

    nameArray.push(name.slice(spaceIndex, nameLength).toLowerCase())
    nameArray = nameArray.map(element => {
      if (element.length <= 3) {
        if (
          element === 'e' ||
          element === 'de' ||
          element === 'do' ||
          element === 'da' ||
          element === 'dos' ||
          element === 'das'
        ) {
          return element
        }
      }
      return element.charAt(0).toUpperCase() + element.slice(1)
    })
    const formattedName = nameArray.join(' ')

    if (maxLength && nameLength > maxLength) {
      const cuttedName = `${formattedName.slice(0, maxLength)}...`
      return cuttedName
    }
    return formattedName
  }
  return ''
}

export const stringShortener = (
  string: string,
  doesItHaveToBeCut: boolean,
  size = 15
): string => {
  const formatedString = doesItHaveToBeCut
    ? `${string.slice(0, size)}...`
    : string
  return formatedString
}

export const dateFormatter = (date: string): string => {
  if (date) {
    return new Intl.DateTimeFormat('pt-BR').format(new Date(date))
  }
  return ''
}

export const phoneFormatter = (value: string): string => {
  const cellphoneLengthWithDDDFormatted = 14

  const numericValue = value.replace(/[^0-9]/g, '')

  let formattedValue = numericValue.replace(/(\d{2})(\d)/, '($1) $2')

  formattedValue = formattedValue.replace(/(\d{4})(\d)/, '$1-$2')

  if (formattedValue.length === cellphoneLengthWithDDDFormatted) {
    formattedValue = formattedValue.replace(/(\d{5})(\d)/, '$1-$2')
  }

  return formattedValue
}
