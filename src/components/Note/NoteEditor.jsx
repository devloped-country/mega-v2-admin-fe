import { useState, useEffect, useRef } from "react";
import styles from "./NoteEditor.module.css";
import ModalButton from "@/components/common/ModalButton";
import { useNewSocket } from "@/hooks/useNewSocket";
import { useMutation } from "@/hooks/useMutation";
import axios from "axios";
import { useFetch } from "@/hooks/useFetch";
import { useNavigate } from "react-router-dom";

function NoteEditor({ handleCancelClick, selectedIds }) {
  console.log(selectedIds);
  const navigate = useNavigate();
  const { doSend, receivedNotes } = useNewSocket();
  const [isSend, setIsSend] = useState(false);
  const [noteObject, setNoteObject] = useState({
    action: "sendToStudent",
    type: "note",
    from: parseInt(localStorage.getItem("id")),
    senderName: "",
    to: selectedIds,
    title: "",
    content: "",
    noteSendId: "",
  });

  //쪽지발신
  const { mutate } = useMutation(
    async (param) =>
      await axios({
        url: "/api/note/register",
        method: "post",
        data: params,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    {
      onSuccess: ({ data }) => {
        setNoteObject((prev) => ({ ...prev, senderName: data.myName, noteSendId: data.noteSendId }));
        setIsSend(true);
      },
    }
  );

  useEffect(() => {
    if (isSend) {
      doSend(noteObject);
      handleCancelClick();
    }
  }, [noteObject]);
  // console.log(noteObject);
  // useRef를 사용하여 이전 noteObject를 기억
  // const prevNoteObjectRef = useRef();

  // useEffect를 사용하여 noteObject가 업데이트될 때 doSend 호출
  // useEffect(() => {
  // 이전 noteObject와 현재 noteObject를 비교
  //    if (prevNoteObjectRef.current && prevNoteObjectRef.current !== noteObject) {
  //      mutate(noteObject);
  //    }

  // noteObject 업데이트 후 이전 noteObject를 현재 noteObject로 설정
  //    prevNoteObjectRef.current = noteObject;
  //  }, [noteObject]);

  // 전송 버튼 클릭 시 noteObject 업데이트
  const handleSendClick = () => {
    mutate({
      ...noteObject,
      to: selectedIds,
    });
  };

  return (
    <section className={styles.wrapper}>
      <input type="text" placeholder="제목을 입력하세요" className={styles.title} value={noteObject.title} onChange={(e) => setNoteObject((prev) => ({ ...prev, title: e.target.value }))} />
      <textarea placeholder="내용을 입력하세요" className={styles.content} value={noteObject.content} onChange={(e) => setNoteObject((prev) => ({ ...prev, content: e.target.value }))} />
      <footer className={styles.footer}>
        <ModalButton onAction={handleCancelClick} text="취소" />
        <ModalButton type="mutated" onAction={handleSendClick} text="전송" />
      </footer>
    </section>
  );
}

export default NoteEditor;
