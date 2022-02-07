import { useCallback, useContext, useEffect, useMemo, useState } from "react"
import BodyText from "../../components/BodyText/BodyText"
import Button from "../../components/Button/Button"
import TitleText from "../../components/TitleText/TitleText"
import shuffleArray from "../../helpers/shuffleArray"
import { QUESTIONS } from "./questions"
import "./QuizPage.scss"
import Confetti from "react-confetti"
import { WalletContext } from "../../context/wallet"

type Answer = {
  answer: string
  isCorrect: boolean
}

export type Question = {
  question: string
  answers: Answer[]
}

const emptyAnswer: Answer = {
  answer: "",
  isCorrect: false,
}

const QuizPage = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<Answer>(emptyAnswer)
  const [questionIndex, setQuestionIndex] = useState<number>(0)
  const questions: Question[] = useMemo(() => shuffleArray(QUESTIONS), [])
  const [answers, setAnswers] = useState<Answer[]>([])
  const [submitted, setSubmitted] = useState(false)
  const { walletAddress } = useContext(WalletContext)

  const onNextClick = () => {
    setQuestionIndex((current) => current + 1)
    setAnswers((current) => [...current, selectedAnswer || emptyAnswer])
  }

  const onSubmit = () => {
    setAnswers((current) => [...current, selectedAnswer || emptyAnswer])
    setSubmitted(true)
  }

  const score = answers.filter((answer) => answer.isCorrect).length

  const addAddressToWhiteList = useCallback(async () => {
    try {
    } catch (error) {}
  }, [])

  useEffect(() => {
    if (submitted && score > questions.length / 2) {
      addAddressToWhiteList()
    }
  }, [submitted, addAddressToWhiteList, score, questions.length])

  return (
    <div className="quiz-page">
      <div className="content">
        {submitted ? (
          <>
            {score > questions.length / 2 && (
              <Confetti width={window.innerWidth} height={window.innerHeight} />
            )}
            <TitleText className="head-text">Score</TitleText>
            <div className="score-container">
              <TitleText>
                {score}/{questions.length}
              </TitleText>
            </div>
            <BodyText>
              {score > questions.length / 2
                ? "Congrats! You've been added to the whitelist."
                : "Sorry! You do not qualify for the whitelist"}
            </BodyText>
          </>
        ) : (
          <>
            <TitleText className="question">
              {questions[questionIndex].question}
            </TitleText>
            <div className="answers-container">
              {questions[questionIndex].answers.map((answer, i) => (
                <div
                  onClick={() => setSelectedAnswer(answer)}
                  className={`answer ${
                    selectedAnswer?.answer === answer.answer ? "selected" : ""
                  }`}
                >
                  <BodyText>{answer.answer}</BodyText>
                </div>
              ))}
            </div>
            {questionIndex === questions.length - 1 ? (
              <Button
                title="Submit"
                onClick={onSubmit}
                className="submit-btn"
              />
            ) : (
              <Button title="Next" onClick={onNextClick} className="next-btn" />
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default QuizPage
