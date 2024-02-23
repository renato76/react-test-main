import { calculateRemainingBalance } from './remainingBalance'

describe('calculateRemainingBalance function', () => {
  it('should calculate the remaining balance at Year 5 given mortgage amount of £100,000, interest rate of 5% and term of 30 years', () => {
    const remainingBalance = calculateRemainingBalance(100000, 5, 30)[4].balance
    expect(remainingBalance).toBeCloseTo(91829, 2)
  })

  it('should calculate the remaining balance at Year 3 given mortgage amount of £250,000, interest rate of 4.5% and term of 20 years', () => {
    const remainingBalance = calculateRemainingBalance(250000, 4.5, 20)[2]
      .balance
    expect(remainingBalance).toBeCloseTo(225223, 2)
  })

  it('should calculate the remaining balance at Year 6 given mortgage amount of £300,000, interest rate of 5.25% and term of 18 years', () => {
    const remainingBalance = calculateRemainingBalance(300000, 5.25, 18)[5]
      .balance
    expect(remainingBalance).toBeCloseTo(229318, 2)
  })
})
