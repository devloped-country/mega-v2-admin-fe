import useSocketStore from '@/store/useSocketStore.js';
import { useEffect, useState } from 'react';
import { shallow } from 'zustand/shallow';

export const useNewSocket = () => {
  const wSocket = useSocketStore((state) => state.wSocket, shallow);
  const [receivedNotes, setReceivedNotes] = useState([]);
  const [ReceivedAlarms, setReceivedAlarms] = useState([]);

  useEffect(() => {
    initWebSocket();
  }, [receivedNotes]);

  useEffect(() => {
    const timer = setInterval(() => {
      sendMyIdToSocket();
    }, 30000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  let myId = 1;
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
  const onOpen = (e) => {
    console.log('WebSocket opened!');
    console.log('connect: ', e);

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
    const receivedData = e.data;
    console.log('받은메시지' + receivedData);
    const parsedData = JSON.parse(receivedData);
    if (parsedData.type) {
      if (parsedData.type === 'note') {
        console.log('쪽지!!!');
        setReceivedNotes((prevNotes) => [parsedData, ...prevNotes]);
      }
      if (parsedData.type === 'alarm') {
        console.log('알림!!!');
        setReceivedAlarms((prevAlarms) => [parsedData, ...prevAlarms]);
      }
    }
  };

  //에러발생 시 실행되는 함수 (연결에 문제가 있을 때)
  const onError = (e) => {
    alert('오류발생 : ' + e.data);
  };

  const doOpen = () => {
    initWebSocket();
    console.log('rerender');
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

  return { doOpen, doSend, sendMyIdToSocket, receivedNotes, ReceivedAlarms };
};
