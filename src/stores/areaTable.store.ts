import { create } from "zustand";

type State = {
 state:boolean
}

type Action = {
refresh: (state:State['state'])=> void
}

const initialState: State = {
  state:false
}

export const useAreaTableRefresh = create<State & Action>((set) => ({
  ...initialState,
  refresh: (state) => set(() => ({ state: state })),

}))