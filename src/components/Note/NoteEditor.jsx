import { useState, useEffect, useRef } from "react";
import styles from "./NoteEditor.module.css";
import ModalButton from "@/components/common/ModalButton";
import { useNewSocket } from "@/hooks/useNewSocket";
import { useMutation } from "@/hooks/useMutation";

function NoteEditor({ handleCancelClick }) {
  const myId = 6;
  const { doSend, receivedNotes, ReceivedAlarms } = useNewSocket();
  console.log(receivedNotes);
  console.log("useNewSocket 실행2222");
  // 제목과 내용을 저장할 상태 변수
  const [to, setTo] = useState([16]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [noteObject, setNoteObject] = useState({
    action: "sendToStudent",
    type: "note",
    from: myId,
    to: to,
    title: "",
    content: "",
  });

  const { mutate } = useMutation(async (params) => await axios({ url: "/api/...", method: "post", data: params }));

  // useRef를 사용하여 이전 noteObject를 기억
  const prevNoteObjectRef = useRef();

  // useEffect를 사용하여 noteObject가 업데이트될 때 doSend 호출
  useEffect(() => {
    // 이전 noteObject와 현재 noteObject를 비교
    if (prevNoteObjectRef.current && prevNoteObjectRef.current !== noteObject) {
      doSend(noteObject);
      mutate(noteObject);
    }

    // noteObject 업데이트 후 이전 noteObject를 현재 noteObject로 설정
    prevNoteObjectRef.current = noteObject;
  }, [noteObject, doSend]);

  // 전송 버튼 클릭 시 noteObject 업데이트
  const handleSendClick = () => {
    if (title.trim() !== "" && content.trim() !== "") {
      setNoteObject((prevNoteObject) => ({
        ...prevNoteObject,
        action: "sendToStudent",
        type: "note",
        from: myId,
        to: to,
        title: title,
        content: content,
      }));
    }
  };

  return (
    <section className={styles.wrapper}>
      <input type="text" placeholder="제목을 입력하세요" className={styles.title} value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea placeholder="내용을 입력하세요" className={styles.content} value={content} onChange={(e) => setContent(e.target.value)} />
      <footer className={styles.footer}>
        <ModalButton onAction={handleCancelClick} text="취소" />
        <ModalButton type="mutated" onAction={handleSendClick} text="전송" />
      </footer>
    </section>
  );
}

export default NoteEditor;
