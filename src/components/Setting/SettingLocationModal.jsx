import { createPortal } from 'react-dom';
import Modal from '@components/common/Modal';
import styles from './SettingLocationModal.module.css';
import ModalButton from '@components/common/ModalButton';
import LocationMap from '@components/Setting/LocationMap';
import PostCode from './PostCode';
import { useState } from 'react';
import { useFetch } from '@/hooks/useFetch';
import { useMutation } from '@/hooks/useMutation';
import axios from 'axios';

function SettingLocationModal({ onClose }) {
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

  const { isLoading } = useFetch(
    [],
    async () =>
      await axios({
        url: '/api/institution',
        params: {
          email: 'kimub1204@naver.com',
        },
      }),
    {
      onSuccess: (data) => {
        setLat(data.data.data.latitude);
        setLng(data.data.data.longitude);
      },
    }
  );

  const { mutate } = useMutation(
    async (params) =>
      await axios({
        url: '/api/institution',
        method: 'put',
        data: params,
      }),
    {
      onSuccess: () => {
        onClose();
      },
    }
  );

  if (isLoading) {
    return;
  }

  const onChangeInstitutionLocation = () => {
    mutate({
      latitude: lat,
      longitude: lng,
      email: 'kimub1204@naver.com',
    });
  };

  return (
    <>
      {createPortal(
        <Modal onClose={onClose}>
          <div className={styles.wrapper}>
            <header className={styles.header}>
              <h3 className={styles.title}>위치 설정</h3>
              <PostCode setLat={setLat} setLng={setLng} />
            </header>
            <div className={styles.content}>
              <LocationMap lat={lat} lng={lng} />
            </div>
            <footer className={styles.footer}>
              <ModalButton type='canceled' text='취소' onAction={onClose} />
              <ModalButton
                type='mutated'
                text='확인'
                onAction={onChangeInstitutionLocation}
              />
            </footer>
          </div>
        </Modal>,
        document.body
      )}
    </>
  );
}

export default SettingLocationModal;
