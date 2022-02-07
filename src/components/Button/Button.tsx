import React from "react"
import BodyText from "../BodyText/BodyText"
import "./Button.scss"

const Button = (props: {
  title: string
  onClick: Function
  className: string
}) => {
  const { title, onClick, className } = props

  return (
    <button
      onClick={() => onClick()}
      className={`primary-button ${className || ""}`}
    >
      <BodyText>{title}</BodyText>
    </button>
  )
}

export default Button
