export interface ISubQuestionRequest {
  id?:number
  description:string;
  status:boolean;
  isAvailableForReport:boolean;
  type: "DEFAULT" | "PERSONALIZED" | "MULTIPLE_CHOICE"
}