import { create } from 'zustand';

const initialState = {
  wSocket: new WebSocket(
    'wss://fx3kyx3yj7.execute-api.ap-northeast-3.amazonaws.com/bsdev08_production/'
  ),
  onOpen: () => {
    console.log('Socket Opened!');
    console.log(this.wSocket);
  },
};

//$connect 때 실행되는 함수
const onOpen = (wSocket) => {
  console.log('Socket Opened!');
  if (wSocket) {
    // sendMyIdToSocket();
  }
};

//$disconnect 때 실행되는 함수
const onClose = () => {
  console.log('WebSocket closed!');
  // doOpen();
};

//웹소켓으로부터 메시지를 받았을 때 실행되는 함수
const onMessage = (e) => {
  console.log('메시지 왔씁니다');
  console.log(e);
  const receivedMessage = e.data;
  console.log(receivedMessage);
};

//에러발생 시 실행되는 함수 (연결에 문제가 있을 때)
const onError = (e) => {
  alert('오류발생 : ' + e.data);
};

const useSocketStore = create((set) => ({
  wSocket: initialState.wSocket,
  initWebSocket: () => {
    set((state) => {
      state.wSocket.onopen = onOpen.bind(state.wSocket);
      state.wSocket.onclose = onClose;
      state.wSocket.onmessage = onMessage;
      state.wSocket.onerror = onError;

      return { ...state };
    });
  },
  doClose: () => {
    set((state) => {
      if (state.wSocket) {
        state.wSocket.close();
      }

      return { ...state };
    });
  },
  doSend: (messageObject) => {
    set((state) => {
      const jsonMessage = JSON.stringify(messageObject);
      console.log('메시지발송: ' + jsonMessage);
      state.wSocket.send(jsonMessage);

      return { ...state };
    });
  },
}));

export default useSocketStore;
