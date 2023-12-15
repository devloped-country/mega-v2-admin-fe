import NoteItem from './NoteItem';
import NoteModal from './NoteModal';
import styles from './NoteList.module.css';
import { useEffect, useState } from 'react';
import { useNewSocket } from '@/hooks/useNewSocket';
import { useFetch } from '@/hooks/useFetch';
import axios from 'axios';

function NoteReceiveList() {
  const { receivedNotes } = useNewSocket();
  const [isShowingModal, setIsShowingModal] = useState(false);
  const [messages, setMessages] = useState([]);
  // const [id, setId] = useState("");
  const { data, isLoading } = useFetch(
    [],
    async () =>
      await axios({
        url: '/api/note/received',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }),
    {
      onSuccess: (data) => {
        setMessages((prev) => [...prev, ...data.data]);
      },
    }
  );

  useEffect(() => {
<<<<<<< HEAD
    setMessages((prev) => [...prev, ...receivedNotes]);
=======
    console.log(receivedNotes + 'noteList');
    setMessages(receivedNotes);
>>>>>>> ef6830fc4127986c9dd3183f656185e34a90883b
  }, [receivedNotes]);

  if (isLoading) {
    return;
  }

  if (!data || data.length === 0) {
    return <div>No received notes.</div>;
  }

  const handleClickList = (id) => {
    setIsShowingModal(true);
    setId(id);
  };

  const handleClose = () => {
    setIsShowingModal(false);
  };

  //  {messages &&
  //    messages.map((note, index) => {
  //      return <NoteItem key={index} title={note.senderName} desc={note.title} date={new Date().toLocaleDateString()} id={noteSendId} onClick={() => handleClickList(index)} />;
  //    })}
  //  {!receivedNotes.length && !data ? (
  //    <div>Not received notes.</div>
  //  ) : (
  //    data.data.map((note, index) => <NoteItem key={index} title={note.title} desc={note.content} date={note.time} onClick={() => handleClickList(index)} />)
  //  )}

  const mapedMessages = messages.map((note, index) => {
    return <NoteItem key={note.id} title={note.senderName} desc={note.title} date={new Date().toLocaleDateString()} id={note.id} onClick={() => handleClickList(index)} />;
  });

  return (
    <section className={styles.wrapper}>
<<<<<<< HEAD
      <ul className={styles.noteList}>{mapedMessages}</ul>
      {isShowingModal && <NoteModal handleClose={handleClose} id={id} data={receivedNotes} note={note} />}
=======
      <ul className={styles.noteList}>
        {messages &&
          messages.map((note, index) => {
            return (
              <NoteItem
                key={index}
                title={note.from}
                desc={note.title}
                date={new Date().toLocaleDateString()}
                onClick={() => handleClickList(index)}
              />
            );
          })}
        {!receivedNotes.length && !data ? (
          <div>Not received notes.</div>
        ) : (
          data.data.map((note, index) => (
            <NoteItem
              key={index}
              title={note.title}
              desc={note.content}
              date={note.time}
              onClick={() => handleClickList(index)}
            />
          ))
        )}
      </ul>
      {isShowingModal && (
        <NoteModal
          handleClose={handleClose}
          id={id}
          data={receivedNotes}
          note={note}
        />
      )}
>>>>>>> ef6830fc4127986c9dd3183f656185e34a90883b
    </section>
  );
}

export default NoteReceiveList;
