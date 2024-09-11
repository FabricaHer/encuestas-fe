"use client";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ISubQuestion } from "@/interfaces/question.interface";
import React from "react";
import { answerSchema, requestForm } from "./formPatient";

interface QuestionDefaultProps {
  subQuestion: ISubQuestion;
  answers: answerSchema[];
  setAnswers: React.Dispatch<React.SetStateAction<answerSchema[]>>;
  setRequest: React.Dispatch<React.SetStateAction<requestForm>>;
}

export default function QuestionDefault({
  subQuestion,
  answers,
  setAnswers,
  setRequest,
}: QuestionDefaultProps) {
  function handlerRadioChange(value: string) {
    const questionArray = answers.map((subQuestionList, i) => {
      if (subQuestionList.subQuestion === subQuestion.id) {
        return { ...subQuestionList, qualification: parseInt(value) };
      }
      return subQuestionList;
    });
    setAnswers(questionArray);
    setRequest((value) => {
      const newValue = value;
      newValue.answers = questionArray;

      return newValue;
    });
  }

  return (
    <div className="flex justify-between pt-2">
      <p className="text-base font-semibold">{subQuestion.description}</p>

      <RadioGroup
        onValueChange={(value) => handlerRadioChange(value)}
        className="flex"
        defaultValue="comfortable"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="0" id={`r1-${subQuestion.id}`} />
          <Label className="font-semibold" htmlFor={`r1-${subQuestion.id}`}>
            No Aplica
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="1" id={`r2-${subQuestion.id}`} />
          <Label className="font-semibold" htmlFor={`r2-${subQuestion.id}`}>
            Deficiente
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="2" id={`r3-${subQuestion.id}`} />
          <Label className="font-semibold" htmlFor={`r3-${subQuestion.id}`}>
            Regular
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="3" id={`r4-${subQuestion.id}`} />
          <Label className="font-semibold" htmlFor={`r4-${subQuestion.id}`}>
            Bueno
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="4" id={`r5-${subQuestion.id}`} />
          <Label className="font-semibold" htmlFor={`r5-${subQuestion.id}`}>
            Excelente
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
}
