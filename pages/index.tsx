import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import InputGroup from 'react-bootstrap/InputGroup'
import Table from 'react-bootstrap/Table'

import { formatCurrency } from '../utils/formatCurrency'

import { calculateMonthlyPayment } from '../utils/MortgageCalculator/calculateRepayment'
import { calculateTotalRepayment } from '../utils/TotalRepayment/totalRepayment'

export default function MortgageCalculator() {
  const [propertyPrice, setPropertyPrice] = useState(0)
  const [deposit, setDeposit] = useState(0)
  const [interestRate, setInterestRate] = useState(5.25)
  const [term, setTerm] = useState(15)
  const [monthlyPayment, setMonthlyPayment] = useState(0)
  const [totalRepayment, setTotalRepayment] = useState(0)
  const [capital, setCapital] = useState(0)
  const [interest, setInterest] = useState(0)
  const [affordabilityInterestRate, setAffordabilityInterestRate] = useState(0)
  const [affordabilityCheck, setAffordabilityCheck] = useState(0)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const monthlyPayment = calculateMonthlyPayment(
      propertyPrice,
      deposit,
      interestRate,
      term
    )
    setMonthlyPayment(monthlyPayment)

    const mortgageAmount = propertyPrice - deposit
    const total = calculateTotalRepayment(mortgageAmount, interestRate, term)
    setTotalRepayment(total)

    setCapital(propertyPrice - deposit)

    setInterest(totalRepayment - capital)

    setAffordabilityInterestRate(interestRate + 3)

    const affordability = calculateMonthlyPayment(
      propertyPrice,
      deposit,
      affordabilityInterestRate,
      term
    )
    setAffordabilityCheck(affordability)
  }

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
                defaultValue={5.25}
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
              {/* TODO: */}
              {/* map through the array of remaining balance and display the results in table */}
              <tr>
                <td>1</td>
                <td>{formatCurrency(10000)}</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  )
}
