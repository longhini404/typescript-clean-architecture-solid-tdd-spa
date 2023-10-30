export const notEmptyCell = (cel: string) => {
  const unmaskedCel = cel.replace(/\D/g, '')
  const validation = unmaskedCel.length === 11
  return validation
}

export const notEmptyPhone = (phone: string) => {
  const unmaskedPhone = phone.replace(/\D/g, '')
  const validation = unmaskedPhone.length === 10 || unmaskedPhone.length === 11
  return validation
}
