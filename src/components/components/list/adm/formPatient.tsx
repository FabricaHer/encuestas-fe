"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { BACKEND_URL } from "@/config/api";
import { IAdmission } from "@/interfaces/admission.interface";
import { Iformat } from "@/interfaces/format.interface";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import Question from "./question";

export interface answerSchema {
  subQuestion: number;
  qualification: number;
}

export interface requestForm {
  format: number;
  patientId: string;
  admissionId: string;
  bedId: string;
  answers: answerSchema[];
  comment: string;
}

interface FormPatientProps {
  admission: IAdmission | null;
  format: Iformat | null;
}

export default function FormPatient({ format, admission }: FormPatientProps) {
  const {toast} = useToast()
  const router = useRouter()
  const [answers, setAnswers] = React.useState<answerSchema[]>([]);
  const [request, setRequest] = React.useState<requestForm>({
    admissionId: admission?.admission ? admission?.admission : "",
    answers: [],
    bedId: admission?.bed_id ? admission?.bed_id : "",
    comment: "",
    format: format?.id ? format?.id : 0,
    patientId: admission?.id_patient ? admission?.id_patient : "",
  });

  React.useEffect(() => {
    let answers: answerSchema[] | undefined = [];
    format?.questions?.forEach((question) => {
      const internAnswers = question.subQuestion?.map((subQuestion) => {
        return {
          subQuestion: subQuestion.id,
          qualification: 0,
        };
      });
      if (Array.isArray(internAnswers)) {
        answers?.push(...internAnswers);
      }
    });
    if (answers) {
      setAnswers(answers);
      setRequest((value)=>{
        const newValue = value
        if(answers){
          newValue.answers = answers
        }
        return newValue
      })
    }
  }, []);

  const handlerTextArea = (e:React.ChangeEvent<HTMLTextAreaElement>)=>{

    setRequest((value)=>{
      const newValue = value
      newValue.comment =  e.target.value
      return newValue
    })
  }

  const handlerOnClick = async (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

    try {
     const response = await axios.post(`${BACKEND_URL}/answer-patient`,request)
      if(response.status=== 201){
        toast({
          variant: "default",
          description: "Gracias por responder nuestra encuesta",
          title: "Gracias",
        });
        router.push('/list')
      }
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Error al responder",
        title: "error",
      });
    }
  }
  return (
    <>
      {format
        ? format.questions?.length
          ? format.questions.map((question, index) => (
              <Question
                key={question.id}
                question={question}
                answers={answers}
                setAnswers={setAnswers}
                setRequest={setRequest}
              />
            ))
          : null
        : null}
      <h2 className="text-lg font-bold pt-3">Comentario</h2>
      <Textarea onChange={(e)=> handlerTextArea(e)} />
      <div className="flex justify-center items-center">
        <Button className="mt-4 mx-auto" onClick={(e)=>handlerOnClick(e)}>Enviar</Button>
      </div>
    </>
  );
}
