"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { BACKEND_URL } from "@/config/api";
import { IAdmission } from "@/interfaces/admission.interface";
import { Iformat } from "@/interfaces/format.interface";
import axios from "axios";
import { CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { cn } from "../../../../../lib/utils";
import { Calendar } from "../../../../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../../../../ui/popover";
import Question from "./../../../list/adm/question";
import { es } from "date-fns/locale";
import moment from "moment";
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
  createdAt?:Date;
}

interface RegisterSurveyProps {
  admission: IAdmission | null;
  format: Iformat | null;
}

export default function RegisterSurvey({ format, admission }: RegisterSurveyProps) {
  const {toast} = useToast()
  const router = useRouter()
  const [answers, setAnswers] = React.useState<answerSchema[]>([]);
  const [date, setDate] = React.useState<Date>()
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

  const handlerDate = (day:Date)=> {
    setRequest((value)=>{
      const newValue = value
      newValue.createdAt = day
      return newValue
    })
    setDate(day)
  }

  const handlerOnClick = async () => {

    try {
      console.log(request)
     const response = await axios.post(`${BACKEND_URL}/answer-patient`,request)
      if(response.status=== 201){
        toast({
          variant: "default",
          description: "Gracias por responder nuestra encuesta",
          title: "Gracias",
        });
        router.push('/general/survey')
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

<div className=" border-primary border-2 p-2 rounded mt-4">
      <div className="flex justify-between">        
        <div className="flex gap-4 items-center">
        <p className="font-semibold">
          Fecha:
          </p>
        <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {date ? moment(date).format("MMM DD, YYYY ").toString() : <span>Selecciona la fecha</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(day,selectedDay) => handlerDate(selectedDay)}
          initialFocus
          locale={es}
        />
      </PopoverContent>
    </Popover>
        </div>
        <p className="font-semibold">N°. de Admisión: {admission?.admission}</p>
      </div>
      <div className=" w-full">
        <div className="flex justify-between">
          <div className="flex gap-2">
            <p className="font-semibold">Nombre y Apellido: </p>
            <p>{admission?.name}</p>
          </div>
          <div className="flex gap-2">
            <p className="font-semibold">C.I:</p>
            <p>{admission?.id_patient}</p>
          </div>
          <div className="flex gap-2">
            <p className="font-semibold">Edad:</p>
            <p>{admission?.age}</p>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2">
            <p className="font-semibold">Genero:</p>
            <p> {admission?.gender === "F" ? "Femenino" : "Masculino"}</p>
          </div>
          <div className="flex gap-2">
            <p className="font-semibold">Teléfono:</p>
            <p>{admission?.phone}</p>
          </div>
        </div>
      </div>
    </div>

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
        <Button className="mt-4 mx-auto" onClick={handlerOnClick}>Enviar</Button>
      </div>
    </>
  );
}
