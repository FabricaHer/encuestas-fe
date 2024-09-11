"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";

import { BACKEND_URL } from "@/config/api";
import { IArea } from "@/interfaces/area.interface";
import { IQuestion } from "@/interfaces/question.interface";
import { IQuestionRequest } from "@/interfaces/request/question-request.interface";
import axios from "axios";
import React from "react";
import { CardQuestion } from "./question/cardQuestion";

interface QuestionProps {
  question: IQuestion[];
  formatId: number;
}

export default function Question({ question, formatId }: QuestionProps) {
  const [questionList, setQuestionList] = React.useState<IQuestionRequest[]>([]);
  const [area, setArea] = React.useState<IArea[]>([]);
  const { toast } = useToast();
  React.useEffect(() => {
    axios.get(`${BACKEND_URL}/area/active`).then((response) => {
      setArea(response.data);
    });
  }, []);


  React.useEffect(()=>{

   const questionRequest: IQuestionRequest[]=  question.map((question)=> {
    return {
      id: question.id,
      areaId : question.area?.id,
      description: question.description,
      format: formatId,
      status: question.status,
      subQuestion : question.subQuestion?.map((subQuestion)=> {
        return {
         id: subQuestion.id, 
         description: subQuestion.description,
         status: subQuestion.status,
         isAvailableForReport: subQuestion.isAvailableForReport,
         type: subQuestion.type
        }
      })
    } as IQuestionRequest
   })

   setQuestionList(questionRequest)
  },[])

  const add = () => {
    setQuestionList((prev) => [
      ...prev,
      { description: "", format: formatId, subQuestion: [], status: true, areaId: NaN },
    ]);
  };

  const save = () => {
    for (const question of questionList) {
    
      if (!question.description) {
        toast({
          title: "Error",
          description: "Existen campos vacios",
          variant: "destructive",
          duration: 3000,
        });
        throw Error("error")
      }
      

      if(question.subQuestion && question.subQuestion?.length >= 0) {
        for(const subquestion of question.subQuestion){
          if(!subquestion.description || !subquestion.type){
            toast({
              title: "Error",
              description: "Existen campos vacios",
              variant: "destructive",
              duration: 3000,
            });
            throw Error("error")
          }
        }
      }
    }
    axios.post(`${BACKEND_URL}/question`, questionList).then((response) => {

      if(response.status === 201){
        toast({
          title: "Guardado",
          description: "Guardado Exitoso",
          variant: "default",
          duration: 3000,
        }); 
      }
    });
  };

  return (
    <div className="col-start-2 col-end-5 flex flex-col justify-start   gap-5">
      <ScrollArea className="h-[600px] w-[100%]">
        <Card>
          <CardHeader className="text-base font-semibold">
            Agregar Pregunta
          </CardHeader>

          <CardContent>
            {questionList.map((question, index) => (
              <CardQuestion
                key={index}
                area={area}
                question={question}
                setQuestionList={setQuestionList}
                index={index}
                questionList={questionList}
              />
            ))}
          </CardContent>

          {questionList.length !== 0 ? (
            <CardFooter className="flex justify-between">
              <Button onClick={save}>Guardar</Button>
              <Button variant="secondary" onClick={add}>
                Añadir
              </Button>
            </CardFooter>
          ) : null}
        </Card>

        {questionList.length === 0 ? (
          <Button onClick={add}>Agregar</Button>
        ) : null}
      </ScrollArea>
    </div>
  );
}
