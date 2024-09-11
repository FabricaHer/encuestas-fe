"use client";
import { IQuestion } from "@/interfaces/question.interface";
import React from "react";
import { answerSchema, requestForm } from "./formPatient";
import QuestionDefault from "./questionDefault";

interface QuestionProps {
  question: IQuestion | null;
  answers: answerSchema[];
  setAnswers: React.Dispatch<React.SetStateAction<answerSchema[]>>;
  setRequest: React.Dispatch<React.SetStateAction<requestForm>>;
}

export default function Question({
  question,
  answers,
  setAnswers,
  setRequest,
}: QuestionProps) {
  return (
    <div className="mt-4">
      <h3 className="text-lg font-bold">{question?.description}</h3>

      {question?.subQuestion?.map((subquestion, i) => {
        return (
          <QuestionDefault
            key={subquestion.id}
            subQuestion={subquestion}
            answers={answers}
            setAnswers={setAnswers}
            setRequest={setRequest}
          />
        );
      })}
    </div>
  );
}
