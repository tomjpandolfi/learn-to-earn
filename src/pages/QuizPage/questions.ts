import { Question } from "./QuizPage"

export const QUESTIONS: Question[] = [
  {
    question: "What is a liquidation?",
    answers: [
      {
        answer: "Paying down your debt when it becomes undercollateralized",
        isCorrect: false,
      },
      {
        answer: "Adding liquidity to a pool",
        isCorrect: false,
      },
      {
        answer: "The protocol selling your collateral to pay back lenders",
        isCorrect: true,
      },
      {
        answer: "The lender withdrawing their supplied assets",
        isCorrect: false,
      },
    ],
  },
  {
    question: "What is a Loan-to-Value ratio (LTV) ?",
    answers: [
      {
        answer:
          "Ratio between how much you borrowed and the value of your collateral (loan / collateral)",
        isCorrect: true,
      },
      {
        answer:
          "Ratio between money in the market and money being borrowed ( $$ lent / $$ borrowed)",
        isCorrect: false,
      },
      {
        answer:
          "How valuable your loan is vs similar loans (spectrum between 0 being bad and 10 being good)",
        isCorrect: false,
      },
      {
        answer: "Ratio between the market price and the protocol price.",
        isCorrect: false,
      },
    ],
  },
  {
    question: "What can $HONEY give you access too?",
    answers: [
      {
        answer: "Governance",
        isCorrect: false,
      },
      {
        answer: "$veHONEY, by locking up tokens for a period of time",
        isCorrect: true,
      },
      {
        answer:
          "Special benefits in the protocol, like reduced fees or higher LTV",
        isCorrect: false,
      },
      {
        answer: "Nothing yet",
        isCorrect: false,
      },
    ],
  },
  {
    question: "What is the point of vesting $HONEY into $veHONEY ?",
    answers: [
      {
        answer: "To avoid exposure to the $HONEY token",
        isCorrect: false,
      },
      {
        answer: "To use your tokens as collateral",
        isCorrect: false,
      },
      {
        answer: "To pay less fees in the protocol",
        isCorrect: false,
      },
      {
        answer:
          "To own more votes in the DAO the longer you lock up your tokens",
        isCorrect: true,
      },
    ],
  },
]
