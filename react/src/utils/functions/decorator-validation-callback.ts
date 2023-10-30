export const decoratorValidationCallback = (
  value: string,
  length: number,
  callback: () => void
) => {
  if (value.length >= length) {
    callback()
  }
}
