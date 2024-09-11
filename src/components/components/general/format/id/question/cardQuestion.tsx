import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IArea } from "@/interfaces/area.interface";
import { IQuestionRequest } from "@/interfaces/request/question-request.interface";
import { ISubQuestionRequest } from "@/interfaces/request/sub-question-request.interface";
import { X } from "lucide-react";
import { CardSubquestion } from "./cardSubQuestion";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { DialogDelete } from "./dialogDelete";
import axios from "axios";
import { BACKEND_URL } from "@/config/api";
import { useToast } from "@/components/ui/use-toast";

interface CardQuestionProps {
  question: IQuestionRequest;
  area: IArea[];
  setQuestionList: Function;
  index: number;
  questionList: IQuestionRequest[];
}

export function CardQuestion({
  question,
  area,
  index,
  questionList,
  setQuestionList,
}: CardQuestionProps) {
  const [open, setOpen] = React.useState<boolean>(false);
  const { toast } = useToast();
  function handlerInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const questionArray = questionList.map((question, i) => {
      if (i === index) {
        return { ...question, description: e.target.value };
      }
      return question;
    });
    setQuestionList(questionArray);
  }

  function handlerClick() {
    const questionArray = questionList.map((question, i) => {
      if (i === index) {
        const addSubquestion: ISubQuestionRequest = {
          description: "",
          isAvailableForReport: true,
          status: true,
          type: "DEFAULT",
        };
        question.subQuestion.push(addSubquestion);
        return question;
      }
      return question;
    });
    setQuestionList(questionArray);
  }

  function handlerClickDelete(e: React.MouseEventHandler, id: number) {
    const questionArray = questionList;

    if (id) {
      axios.delete(`${BACKEND_URL}/question/${id}`).then((response) => {
        if (response.status === 200) {
          toast({
            variant: "default",
            description: "La pregunta fue elimina correctamente",
            title: "Correctamente",
          });
        }
      });
    }
    questionArray.splice(index, 1);

    setQuestionList(questionArray);
    setOpen(false);
  }

  function handlerSelect(e: string) {
    const questionArray = questionList.map((question, i) => {
      if (i === index) {
        return { ...question, areaId: parseInt(e) };
      }
      return question;
    });

    setQuestionList(questionArray);
  }

  return (
    <div className="flex gap-4 flex-col mt-4 border-b-2 pb-4 border-gray-300">
      <p className="text-sm font-bold">Pregunta</p>
      <div className="flex items-center gap-4">
        <p className="text-sm font-black">{index + 1}.-</p>
        <Input
          placeholder=""
          value={question?.description}
          onChange={handlerInputChange}
        />
        <Dialog open={open} onOpenChange={setOpen}>
          <Button variant={"destructive"} className="text-xs p-2" asChild>
            <DialogTrigger>
              {" "}
              <X />
            </DialogTrigger>
          </Button>
          <DialogDelete
            isSubQuestion={false}
            id={question.id}
            handlerDelete={handlerClickDelete}
            setOpen={setOpen}
          />
        </Dialog>
      </div>
      <p className="text-sm font-bold">Area</p>
      <div className="flex justify-between">
        <Select
          onValueChange={(value) => handlerSelect(value)}
          defaultValue={
            question?.areaId ? question.areaId.toString() : undefined
          }
        >
          <SelectTrigger className="w-[50%]">
            <SelectValue placeholder="Areas" />
          </SelectTrigger>

          <SelectContent>
            {area?.map((area, index) => (
              <SelectItem key={index} value={area.id.toString()}>
                {area.description}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={handlerClick}>Añadir sub-pregunta</Button>
      </div>
      <div className="px-4">
        {question.subQuestion?.map((subQuestion, i) => (
          <CardSubquestion
            key={i}
            indexQuestion={index}
            indexSubQuestion={i}
            questionList={questionList}
            setQuestionList={setQuestionList}
            subQuestion={subQuestion}
          />
        ))}
      </div>
    </div>
  );
}
