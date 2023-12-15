<<<<<<< HEAD
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
=======
import { useState, useEffect, useRef } from 'react';
import styles from './NoteEditor.module.css';
import ModalButton from '@/components/common/ModalButton';
import { useNewSocket } from '@/hooks/useNewSocket';
import { useMutation } from '@/hooks/useMutation';

function NoteEditor({ handleCancelClick, selectedIds }) {
  const myId = parseInt(localStorage.getItem('id'));
  const { doSend, receivedNotes } = useNewSocket();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [noteObject, setNoteObject] = useState({
    action: 'sendToStudent',
    type: 'note',
    from: myId,
    to: selectedIds,
    title: '',
    content: '',
>>>>>>> ef6830fc4127986c9dd3183f656185e34a90883b
  });

  //쪽지발신
  const { mutate } = useMutation(
    async (param) =>
      await axios({
<<<<<<< HEAD
        url: "/api/note/register",
        method: "post",
        data: param,
=======
        url: '/api/note/register',
        method: 'post',
        data: params,
>>>>>>> ef6830fc4127986c9dd3183f656185e34a90883b
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }),
    {
<<<<<<< HEAD
      onSuccess: ({ data }) => {
        setNoteObject((prev) => ({ ...prev, senderName: data.myName, noteSendId: data.noteSendId }));
        setIsSend(true);
=======
      onSuccess: () => {
        navigate('/note');
>>>>>>> ef6830fc4127986c9dd3183f656185e34a90883b
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
  const prevNoteObjectRef = useRef();

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
<<<<<<< HEAD
    mutate({
      ...noteObject,
      to: selectedIds,
    });
=======
    if (title.trim() !== '' && content.trim() !== '') {
      setNoteObject((prevNoteObject) => ({
        ...prevNoteObject,
        action: 'sendToStudent',
        type: 'note',
        from: myId,
        to: selectedIds,
        title: title,
        content: content,
      }));
    }
>>>>>>> ef6830fc4127986c9dd3183f656185e34a90883b
  };

  return (
    <section className={styles.wrapper}>
<<<<<<< HEAD
      <input type="text" placeholder="제목을 입력하세요" className={styles.title} value={noteObject.title} onChange={(e) => setNoteObject((prev) => ({ ...prev, title: e.target.value }))} />
      <textarea placeholder="내용을 입력하세요" className={styles.content} value={noteObject.content} onChange={(e) => setNoteObject((prev) => ({ ...prev, content: e.target.value }))} />
=======
      <input
        type='text'
        placeholder='제목을 입력하세요'
        className={styles.title}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder='내용을 입력하세요'
        className={styles.content}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
>>>>>>> ef6830fc4127986c9dd3183f656185e34a90883b
      <footer className={styles.footer}>
        <ModalButton onAction={handleCancelClick} text='취소' />
        <ModalButton type='mutated' onAction={handleSendClick} text='전송' />
      </footer>
    </section>
  );
}

export default NoteEditor;
