export function calculateTotalRepayment(
  mortgageAmount: number,
  interestRate: number,
  years: number
): number {
  // Convert annual interest rate to monthly interest rate
  const monthlyInterestRate: number = interestRate / 12 / 100

  // Convert years to months
  const totalMonths: number = years * 12

  // Calculate total repayment
  const monthlyPayment: number =
    (mortgageAmount * monthlyInterestRate) /
    (1 - Math.pow(1 + monthlyInterestRate, -totalMonths))
  const totalRepayment: number = monthlyPayment * totalMonths

  return Number(totalRepayment.toFixed(2))
}
