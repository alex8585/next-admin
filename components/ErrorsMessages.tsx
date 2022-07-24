import Alert from "@mui/material/Alert"

import { useState, useEffect, useMemo } from "react"
interface Props {
  errors: ErrorsObj
}

function ErrorsMessages(props: Props) {
  const { errors } = props

  let [messages, setMessages] = useState<Array<string>>([])

  useEffect(() => {
    let errorsMessages = []
    for (const error in errors) {
      errorsMessages.push(errors[error][0])
    }
    setMessages(errorsMessages)
  }, [errors])
  return (
    <div>
      {messages.map((error) => (
        <Alert key={error} severity="error">
          {error}
        </Alert>
      ))}
    </div>
  )
}

export default ErrorsMessages
