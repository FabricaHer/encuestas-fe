import { ISubQuestionRequest } from "./sub-question-request.interface";

export interface IQuestionRequest {
  id?:number;
  description: string;
  format: number;
  areaId:number;
  status:boolean;
  subQuestion:ISubQuestionRequest[] 

}