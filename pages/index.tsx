import { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import InputGroup from 'react-bootstrap/InputGroup'
import Table from 'react-bootstrap/Table'
import * as Papa from 'papaparse'

import { formatCurrency } from '../utils/formatCurrency'
import { calculateMonthlyPayment } from '../utils/MortgageCalculator/calculateRepayment'
import { calculateTotalRepayment } from '../utils/TotalRepayment/totalRepayment'
import { calculateRemainingBalance } from '../utils/RemainingBalance/remainingBalance'

interface RemainingBalance {
  year: number
  balance: number
}

interface BaseRate {
  baseRate: number
}

export const MortgageCalculator: React.FC<BaseRate> = ({ baseRate }) => {
  const [propertyPrice, setPropertyPrice] = useState(0)
  const [deposit, setDeposit] = useState(0)
  const [interestRate, setInterestRate] = useState(baseRate)
  const [term, setTerm] = useState(15)
  const [monthlyPayment, setMonthlyPayment] = useState(0)
  const [totalRepayment, setTotalRepayment] = useState(0)
  const [capital, setCapital] = useState(0)
  const [interest, setInterest] = useState(0)
  const [affordabilityInterestRate, setAffordabilityInterestRate] = useState(0)
  const [affordabilityCheck, setAffordabilityCheck] = useState(0)
  const [remainingBalance, setRemainingBalance] = useState<RemainingBalance[]>(
    []
  )
  const [initialBalance, setInitialBalance] = useState(0)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const monthlyPayment = calculateMonthlyPayment(
      propertyPrice,
      deposit,
      interestRate,
      term
    )
    setMonthlyPayment(+monthlyPayment)

    const mortgageAmount = propertyPrice - deposit
    const total = calculateTotalRepayment(mortgageAmount, interestRate, term)
    setTotalRepayment(total)

    setCapital(propertyPrice - deposit)

    const affordability = calculateMonthlyPayment(
      propertyPrice,
      deposit,
      affordabilityInterestRate,
      term
    )
    setAffordabilityCheck(affordability)

    setInitialBalance(propertyPrice - deposit)

    const remaining = calculateRemainingBalance(
      mortgageAmount,
      interestRate,
      term
    )
    setRemainingBalance(remaining)
  }

  useEffect(() => {
    setAffordabilityInterestRate(interestRate + 3)
    setInterest(totalRepayment - capital)
  }, [totalRepayment, capital, interestRate])

  return (
    <Container>
      <title>Mortgage Calculator Test</title>
      <Row className="gap-x-10 pt-3">
        <Col className="border-r" md="auto">
          <Form onSubmit={handleSubmit}>
            <Form.Label htmlFor="price">Property Price</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Text>£</InputGroup.Text>
              <Form.Control
                id="price"
                name="price"
                type="number"
                className="no-spinner"
                step="any"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPropertyPrice(Number(e.target.value))
                }
              />
            </InputGroup>
            <Form.Label htmlFor="deposit">Deposit</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Text>£</InputGroup.Text>
              <Form.Control
                id="deposit"
                name="deposit"
                type="number"
                className="no-spinner"
                step="any"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setDeposit(Number(e.target.value))
                }
              />
            </InputGroup>

            <Form.Label htmlFor="term">Mortgage Term</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                id="term"
                name="term"
                type="number"
                step="any"
                defaultValue={15}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setTerm(Number(e.target.value))
                }
              />
              <InputGroup.Text>years</InputGroup.Text>
            </InputGroup>
            <Form.Label htmlFor="interest">Interest rate</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                id="interest"
                name="interest"
                type="number"
                step="any"
                className="no-spinner"
                defaultValue={baseRate}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setInterestRate(Number(e.target.value))
                }
              />
              <InputGroup.Text>%</InputGroup.Text>
            </InputGroup>
            <Button className="w-full" variant="primary" type="submit">
              Calculate
            </Button>
          </Form>
        </Col>
        <Col md="auto">
          <h2 className="pb-3">Results</h2>
          <Table striped="columns">
            <tbody>
              <tr className="border-b border-t">
                <td>Monthly Payment</td>
                <td className="text-right">{formatCurrency(monthlyPayment)}</td>
              </tr>
              <tr className="border-b">
                <td>Total Repayment</td>
                <td className="text-right">{formatCurrency(totalRepayment)}</td>
              </tr>
              <tr className="border-b">
                <td>Capital</td>
                <td className="text-right">{formatCurrency(capital)}</td>
              </tr>
              <tr className="border-b">
                <td>Interest</td>
                <td className="text-right">{formatCurrency(interest)}</td>
              </tr>
              <tr className="border-b">
                <td>Affordability check</td>
                <td className="text-right">
                  {formatCurrency(affordabilityCheck)}
                </td>
              </tr>
            </tbody>
          </Table>
        </Col>

        <Col md="auto">
          <h2 className="pb-3">Yearly Breakdown</h2>
          <Table className="max-w-52" bordered hover size="sm">
            <thead>
              <tr>
                <th>Year</th>
                <th>Remaining Debt</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Year 0</td>
                <td>{formatCurrency(initialBalance || 0, 0)}</td>
              </tr>
              {remainingBalance.map((item) => (
                <tr key={item.year}>
                  <td>Year {item.year}</td>
                  <td>{formatCurrency(item.balance, 0)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  )
}

export async function getServerSideProps() {
  try {
    const response = await fetch(
      'https://www.bankofengland.co.uk/boeapps/iadb/fromshowcolumns.asp?csv.x=yes&Datefrom=18/Jan/2024&Dateto=18/Feb/2024&SeriesCodes=IUMABEDR&CSVF=TN&UsingCodes=Y&VPD=Y&VFD=N'
    )
    const baseRateData = await response.text()
    const baseRateParsed = Papa.parse(baseRateData).data[1]
    const baseRate = baseRateParsed[1]
    return {
      props: {
        baseRate,
      },
    }
  } catch (error) {
    console.error('Error fetching base rate:', error)
    return {
      props: {
        baseRate: null,
      },
    }
  }
}

export default MortgageCalculator
