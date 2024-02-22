export function calculateRemainingBalance(
  interestRate: number,
  mortgageAmount: number,
  years: number
) {
  // Convert interest rate from percentage to decimal
  interestRate /= 100

  // Monthly interest rate
  const monthlyRate = interestRate / 12

  // Total number of payments
  const totalPayments = years * 12

  // Calculate monthly payment using formula for fixed-rate mortgage
  const monthlyPayment =
    (mortgageAmount * monthlyRate) /
    (1 - Math.pow(1 + monthlyRate, -totalPayments))

  let remainingBalance = mortgageAmount
  let balanceHistory = []

  for (let i = 1; i <= years; i++) {
    // Calculate interest paid for the year
    const interestPaid = remainingBalance * monthlyRate * 12

    // Calculate principal paid for the year
    const principalPaid = monthlyPayment * 12 - interestPaid

    // Calculate remaining balance after the year
    remainingBalance -= principalPaid

    // Store remaining balance for the year
    balanceHistory.push({
      year: i,
      balance: remainingBalance,
    })
  }

  return balanceHistory
}
