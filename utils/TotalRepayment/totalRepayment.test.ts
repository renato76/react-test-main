import { calculateTotalRepayment } from './totalRepayment'

describe('calculateTotalRepayment function', () => {
  it('should calculate the total repayment amount of given a mortgage amount of £95,000, an interest rate of 5.25% and a term of 15 years', () => {
    const remainingBalance = calculateTotalRepayment(95000, 5.25, 15)
    expect(remainingBalance).toBeCloseTo(137463.09, 2)
  })
  it('should calculate the total repayment amount of given a mortgage amount of £255,000, an interest rate of 4.25% and a term of 20 years', () => {
    const remainingBalance = calculateTotalRepayment(255000, 4.25, 20)
    expect(remainingBalance).toBeCloseTo(378971.5, 2)
  })
  it('should calculate the total repayment amount of given a mortgage amount of £435,000, an interest rate of 3.5% and a term of 18 years', () => {
    const remainingBalance = calculateTotalRepayment(435000, 3.5, 18)
    expect(remainingBalance).toBeCloseTo(586931.88, 2)
  })
})
