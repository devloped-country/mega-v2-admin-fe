import { useState } from 'react';

export function useSocket() {
  const [wSocket, setWSocket] = useState(
    new WebSocket(
      'wss://fx3kyx3yj7.execute-api.ap-northeast-3.amazonaws.com/bsdev08_production/'
    )
  );

  const myId = 1;

  const sendMyIdToSocket = () => {
    const connectObject = {
      action: 'sendMyId',
      myRole: 'manager',
      myId: myId,
    };
    const jsonMessage = JSON.stringify(connectObject);
    console.log('sendMyIdToSocket!');
    wSocket.send(jsonMessage);
  };

  const initWebSocket = () => {
    wSocket.onopen = onOpen;
    wSocket.onclose = onClose;
    wSocket.onmessage = onMessage;
    wSocket.onerror = onError;
  };

  //$connect 때 실행되는 함수
  const onOpen = () => {
    console.log('Socket Opened!');
    if (wSocket) {
      sendMyIdToSocket();
    }
  };

  //$disconnect 때 실행되는 함수
  const onClose = () => {
    console.log('WebSocket closed!');
    doOpen();
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

  const doOpen = () => {
    initWebSocket();
    return wSocket;
  };

  const doClose = () => {
    if (wSocket) {
      wSocket.close();
    }
  };

  const doSend = (messageObject) => {
    const jsonMessage = JSON.stringify(messageObject);
    console.log('메시지발송: ' + jsonMessage);
    wSocket.send(jsonMessage);
  };

  return { doOpen, doClose, doSend, sendMyIdToSocket };
}

// 람다 실행 = 람다 내부 exports.handler 실행되는 것
