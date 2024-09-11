import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { BACKEND_URL } from "@/config/api";
import { IQuestionRequest } from "@/interfaces/request/question-request.interface";
import { ISubQuestionRequest } from "@/interfaces/request/sub-question-request.interface";
import axios from "axios";
import { X } from "lucide-react";
import React from "react";
import { DialogDelete } from "./dialogDelete";

interface CardSubquestionProps {
  subQuestion: ISubQuestionRequest;
  setQuestionList: Function;
  indexQuestion: number;
  indexSubQuestion: number;
  questionList: IQuestionRequest[];
}

export function CardSubquestion({
  subQuestion,
  indexQuestion,
  indexSubQuestion,
  questionList,
  setQuestionList,
}: CardSubquestionProps) {
  const {toast} = useToast()
  const [open,setOpen] = React.useState<boolean>(false)
  function handlerInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const questionArray = questionList.map((question, i) => {
      if (i === indexQuestion) {
        const newSubquestion = question.subQuestion?.map((subQuestion, i) => {
          if (i === indexSubQuestion) {
            return {
              ...subQuestion,
              description: e.target.value,
            };
          }
          return subQuestion;
        });
        question.subQuestion = newSubquestion;
        return question;
      }
      return question;
    });

    setQuestionList(questionArray);
  }

  function handlerCheckedAvailable(e: boolean) {
    const questionArray = questionList.map((question, i) => {
      if (i === indexQuestion) {
        const newSubquestion = question.subQuestion?.map((subQuestion, i) => {
          if (i === indexSubQuestion) {
            return {
              ...subQuestion,
              isAvailableForReport: e,
            };
          }
          return subQuestion;
        });
        question.subQuestion = newSubquestion;
        return question;
      }
      return question;
    });

    setQuestionList(questionArray);
  }
  function handlerCheckedStatus(e: boolean) {
    const questionArray = questionList.map((question, i) => {
      if (i === indexQuestion) {
        const newSubquestion = question.subQuestion?.map((subQuestion, i) => {
          if (i === indexSubQuestion) {
            return {
              ...subQuestion,
              status: e,
            };
          }
          return subQuestion;
        });
        question.subQuestion = newSubquestion;
        return question;
      }
      return question;
    });

    setQuestionList(questionArray);
  }

  function handlerSelect(e: string) {
    const questionArray = questionList.map((question, i) => {
      if (i === indexQuestion) {
        const newSubquestion: ISubQuestionRequest[] = question.subQuestion?.map(
          (subQuestion, i) => {
            if (i === indexSubQuestion) {
              const updateSubQuestion: ISubQuestionRequest = {
                ...subQuestion,
                type: e as "DEFAULT" | "PERSONALIZED" | "MULTIPLE_CHOICE",
              };
              return updateSubQuestion;
            }
            return subQuestion;
          }
        );
        question.subQuestion = newSubquestion;
        return question;
      }
      return question;
    });

    setQuestionList(questionArray);
  }

  function handlerClickDelete(e: React.MouseEventHandler, id: number) {

    if (id) {
      axios.delete(`${BACKEND_URL}/subquestion/${id}`).then((response) => {
        if (response.status === 200) {
          toast({
            variant: "default",
            description: "La sub-pregunta fue elimina correctamente",
            title: "Correctamente",
          });
        }
      });
    }

    const questionArray = questionList.map((question, i) => {
      if (i === indexQuestion) {
        question.subQuestion?.splice(indexSubQuestion, 1);
      }
      return question;
    });
    setQuestionList(questionArray);
    setOpen(false)
  }

  return (
    <>
      <div className="flex justify-center  flex-col gap-4 pb-4">
        <p className="text-sm font-bold">Sub-Pregunta</p>
        <div className="flex items-center gap-4">
          <p className="text-sm font-bold">{indexSubQuestion + 1}.</p>
          <Input
            placeholder=""
            value={subQuestion?.description ? subQuestion?.description : ""}
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
              isSubQuestion={true}
              id={subQuestion.id}
              handlerDelete={handlerClickDelete}
              setOpen={setOpen}
            />
          </Dialog>
        </div>
        <div className="flex gap-12">
          <div className="flex items-center gap-4">
            <Label htmlFor={`available-${indexSubQuestion}`}>
              Habilitado para reporte
            </Label>
            <Switch
              id={`available-${indexSubQuestion}`}
              checked={subQuestion.isAvailableForReport}
              onCheckedChange={(e) => handlerCheckedAvailable(e)}
            />
          </div>
          <div className="flex items-center gap-4">
            <Label htmlFor={`status-${indexSubQuestion}`}>Estado:</Label>
            <Switch
              id={`status-${indexSubQuestion}`}
              checked={subQuestion.status}
              onCheckedChange={(e) => handlerCheckedStatus(e)}
            />
          </div>
          <div>
            <Select
              onValueChange={(e) => handlerSelect(e)}
              defaultValue={subQuestion.type}
            >
              <SelectTrigger>
                <SelectValue placeholder="Tipo de pregunta" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DEFAULT">Selección Unica</SelectItem>
                <SelectItem value="MULTIPLE_CHOICE">
                  Selección Multiple
                </SelectItem>
                <SelectItem value="PERSONALIZED">
                  Selección Unica personalizada
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </>
  );
}
