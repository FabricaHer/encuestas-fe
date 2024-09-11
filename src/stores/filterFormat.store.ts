import { create } from 'zustand';

type State = {
    search: String;
    state: string;
}

type Action = {
  updateSearch: (search: State['search'])=> void
  updateState: (state: State['state'])=> void
  reset: ()=> void
}

const initialState: State = {
  search:'',
  state:''
}

export const useFilterFormat = create<State & Action>((set) => ({
  ...initialState,
  updateSearch: (search) => set(() => ({ search: search })),
  updateState: (state) => set(() => ({ state: state })),
  reset: ()=> set(initialState)
}))