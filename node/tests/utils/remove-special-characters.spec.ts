import { stayOnlyNumbers } from '@/utils'

describe('removeSpecialCaracters', () => {
  it('should return a string witht only numbers', () => {
    const text = '(44)-9-5555-5555'
    expect(stayOnlyNumbers(text)).toBe('44955555555')
  })
})
