export const base64toBlob = (data: string): Blob => {
  const bytes = atob(data)
  let { length } = bytes
  const output = new Uint8Array(length)
  while (length--) {
    output[length] = bytes.charCodeAt(length)
  }
  return new Blob([output], { type: 'application/pdf' })
}
