import NoteItem from "./NoteItem";
import NoteModal from "./NoteModal";
import styles from "./NoteList.module.css";
import { useFetch } from "@/hooks/useFetch";
import axios from "axios";
import ContentLoading from "@components/common/ContentLoading";
import { useState } from "react";
import { useMutation } from "@/hooks/useMutation";

function NoteSendList() {
  const [isShowingModal, setIsShowingModal] = useState(false);
  const [messages, setMessages] = useState([]);
  const [id, setId] = useState("");
  const { isLoading, refetch } = useFetch(
    [],
    async () =>
      await axios({
        url: "https://admin.mzc-appmega.click/api/note/sent",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    {
      onSuccess: ({ data }) => {
        const mapedData = data.map((data) => ({ ...data, isSelect: false }));
        setMessages((prev) => [...mapedData]);
      },
    }
  );

  const { mutate } = useMutation(
    async (params) =>
      await axios({
        url: "https://admin.mzc-appmega.click/api/note/real_delete_sent",
        method: "put",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: params,
      }),
    {
      onSuccess: () => {
        refetch();
      },
    }
  );

  if (isLoading) {
    return <ContentLoading />;
  }

  if (!messages || messages.length === 0) {
    return <div>쪽지가 없습니다.</div>;
  }

  const handleClickList = (id) => {
    setIsShowingModal(true);
    setId(id);
  };

  const handleClose = () => {
    setIsShowingModal(false);
  };

  const onChange = (id) => {
    setMessages((prev) => {
      return prev.map((message) => {
        if (id === message.id) {
          return { ...message, isSelect: !message.isSelect };
        }

        return message;
      });
    });
  };

  const onDelete = () => {
    const filterdMessages = messages.filter((message) => message.isSelect).map((message) => message.id);
    mutate({ selectedNoteId: filterdMessages });
  };

  const mapedMessages = messages.map((note, index) => {
    return (
      <NoteItem
        key={note.id}
        title={note.title}
        desc={note.content}
        date={new Date().toLocaleDateString()}
        id={note.id}
        onClick={() => handleClickList(note.id)}
        isSelect={note.isSelect}
        onChange={onChange}
      />
    );
  });

  return (
    <>
      <section className={styles.wrapper}>
        <ul className={styles.noteList}>{mapedMessages}</ul>
        {isShowingModal && <NoteModal handleClose={handleClose} id={id} />}
      </section>
      <img src={`https://d2f3kqq80r3o3g.cloudfront.net/Frame 565.svg`} alt="메일 삭제" className={styles.deleteBtn} onClick={onDelete} />
    </>
  );
}

export default NoteSendList;
