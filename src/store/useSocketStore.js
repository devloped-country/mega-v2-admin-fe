import { create } from "zustand";

const initialState = {
  wSocket: new WebSocket("wss://fx3kyx3yj7.execute-api.ap-northeast-3.amazonaws.com/bsdev08_production/"),
};

const useSocketStore = create((set) => ({
  wSocket: initialState.wSocket,
}));

export default useSocketStore;
