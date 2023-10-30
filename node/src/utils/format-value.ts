export const stayOnlyNumbers = (field: string): string => {
  if (!field) {
    return ''
  }

  return field.replace(/[^\d]+/g, '')
}
