import { useState, useEffect } from "react";

export function useSocket(keys, fetcher, options) {
  const [wSocket, setWSocket] = useState(new WebSocket("wss://fx3kyx3yj7.execute-api.ap-northeast-3.amazonaws.com/bsdev08_production/"));
  const [message, setMessage] = useState("");
  const [to, setTo] = useState([]);
  const [title, setTitle] = useState("");

  let myId = 6;

  const sendMyIdToSocket = () => {
    const connectObject = {
      action: "sendMyId",
      myRole: "manager",
      myId: myId,
    };
    const jsonMessage = JSON.stringify(connectObject);
    console.log("sendMyIdToSocket!");
    wSocket.send(jsonMessage);
  };

  const initWebSocket = () => {
    wSocket.onopen = onOpen;
    wSocket.onclose = onClose;
    wSocket.onmessage = onMessage;
    wSocket.onerror = onError;
  };

  //$connect 때 실행되는 함수
  const onOpen = (e) => {
    console.log("WebSocket opened!");
    console.log("connect: ", e);

    if (wSocket) {
      sendMyIdToSocket();
    }
  };

  //$disconnect 때 실행되는 함수
  const onClose = () => {
    console.log("WebSocket closed!");
  };

  //웹소켓으로부터 메시지를 받았을 때 실행되는 함수
  const onMessage = (e) => {
    const receivedMessage = e.data;
    console.log(receivedMessage);
  };

  //에러발생 시 실행되는 함수 (연결에 문제가 있을 때)
  const onError = (e) => {
    alert("오류발생 : " + e.data);
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

  const doSend = () => {
    if (wSocket) {
      //제이슨 형식으로 작성해야 함.
      // action이 경로 (람다에서 event.requestContext.routeKey; 로 추출)
      // connectionId는 웹소켓이 connect때 알아서 만듦. (람다에서 event.requestContext.connectionId;로 추출)

      const messageObject = {
        action: "sendToStudent",
        from: myId,
        to: [16],
        title: "쪽지제목",
        message: "쪽지내용",
      };
      // .send 웹소켓에 메시지 보내는 함수
      const jsonMessage = JSON.stringify(messageObject);
      console.log("메시지발송: " + jsonMessage);
      wSocket.send(jsonMessage);
    }
  };

  return { doOpen, doClose, doSend };
}

// 람다 실행 = 람다 내부 exports.handler 실행되는 것
