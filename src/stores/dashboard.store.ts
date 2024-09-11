import { create } from 'zustand';

type State = {
  averageAnswers: { average: string; description: string }[];
  totalAnswer: number;
  dataChart: { date: string; [key: string]: string };
  lastAnswers: any;
}

type Action = {
  update: (search: State)=> void
}

const initialState: State = {
averageAnswers:[{average:'',description:''}],
dataChart:{date:''},
lastAnswers:'',
totalAnswer:0
}

export const useDashboard = create<State & Action>((set) => ({
  ...initialState,
  update: (search) => set(() => ({ ...search})),

}))