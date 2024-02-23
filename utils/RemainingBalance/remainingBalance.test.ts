import { calculateRemainingBalance } from './remainingBalance'

describe('calculateRemainingBalance function', () => {
  it('should calculate the remaining balance at Year 5 given mortgage amount of £100,000, interest rate of 5% and term of 30 years', () => {
    const remainingBalanceArray = calculateRemainingBalance(100000, 5, 30)
    const remainingBalanceYear5 = remainingBalanceArray[4].balance
    expect(remainingBalanceYear5).toBeCloseTo(91829, 2)
  })

  it('should calculate the remaining balance at Year 3 given mortgage amount of £250,000, interest rate of 4.5% and term of 20 years', () => {
    const remainingBalanceArray = calculateRemainingBalance(250000, 4.5, 20)
    const remainingBalanceYear3 = remainingBalanceArray[2].balance
    expect(remainingBalanceYear3).toBeCloseTo(225223, 2)
  })

  it('should calculate the remaining balance at Year 6 given mortgage amount of £300,000, interest rate of 5.25% and term of 18 years', () => {
    const remainingBalanceArray = calculateRemainingBalance(300000, 5.25, 18)
    const remainingBalanceYear6 = remainingBalanceArray[5].balance
    console.log(remainingBalanceYear6)
    expect(remainingBalanceYear6).toBeCloseTo(229318, 2)
  })
})
