
export interface IArea {
  id: number,
  description: string,
  status: boolean;
  createAt: Date;
  updatedAt: Date;
  deleteAt: Date | null;
}

export interface ISubQuestion {
  id:number;
  description: string,
  status: boolean,
  isAvailableForReport: boolean,
  type:"DEFAULT" | "PERSONALIZED" | "MULTIPLE_CHOICE"
  answers?:[]
  createAt: Date;
  updatedAt: Date;
  deleteAt: Date | null;
  qualification?:number;
}


export interface IQuestion {
  id:number,
  description:string;
  status: boolean;
  subQuestion :ISubQuestion[] | null;
  area: IArea;
  createAt: Date;
  updatedAt: Date;
  deleteAt: Date | null;
}
