import { useEffect } from 'react';
import { useNewSocket } from './useNewSocket';

export function useSocketSetup() {
  const { initWebSocket, doSend, doClose } = useNewSocket();

  useEffect(() => {
    initWebSocket();

    const connectObject = {
      action: 'sendMyId',
      myRole: 'manager',
      myId: 1,
    };

    const timer = setInterval(() => {
      doSend(connectObject);
    }, 30000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return { doSend };
}
