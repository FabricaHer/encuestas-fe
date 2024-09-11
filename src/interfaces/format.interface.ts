import { IQuestion } from "./question.interface";

export interface Iformat {
bed:string;
createdAt: Date;
deletedAt?:Date | null;
description?: string;
id:number;
isForAll:boolean;
name:string;
status:Boolean;
updatedAt:Date;
questions?:IQuestion[];
}