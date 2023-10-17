import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questionData, setQuestionData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then(r => r.json())
    .then(data  => setQuestionData(data))
  }, [])

  function handleDeleteQuestion(deletedItem) {
    const updatedQuestions = questionData.filter(question => {
      return question.id !== deletedItem.id
    })
    setQuestionData(updatedQuestions)
  }

  function handleUpdateAnswer(updatedQuestion){
    const updatedQuestions = questionData.map(question => {
      if(question.id === updatedQuestion.id) {
        return updatedQuestion;
      } else {
        return question;
      }
    })
    setQuestionData(updatedQuestions)
  }

  if (!questionData) {
    return (
      <h1>Loading...</h1>
    )
  } 
 
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questionData.map((question) => (
          <QuestionItem 
          key={question.id}
          question={question}
          onDeleteQuestion={handleDeleteQuestion}
          onUpdateAnswer={handleUpdateAnswer}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
