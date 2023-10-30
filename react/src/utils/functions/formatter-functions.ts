export const dateTimeFormatter = (dateTimeString: string): string => {
  const options: any = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }
  return new Date(dateTimeString).toLocaleDateString(undefined, options)
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
