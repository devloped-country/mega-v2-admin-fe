import { createPortal } from 'react-dom';
import Modal from '@components/common/Modal';
import styles from './SettingLocationModal.module.css';
import ModalButton from '@components/common/ModalButton';
import LocationMap from '@components/Setting/LocationMap';
import PostCode from './PostCode';
import { useState } from 'react';

function SettingLocationModal({ onClose }) {
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

  return (
    <>
      {createPortal(
        <Modal onClose={onClose}>
          <div className={styles.wrapper}>
            <header className={styles.header}>
              <h3 className={styles.title}>
                <img
                  className={styles.icon}
                  src={`${import.meta.env.VITE_CLOUD_FRONT_ID}/map-marker.svg`}
                  alt='위치 설정'
                />
                위치 설정
              </h3>
              <PostCode setLat={setLat} setLng={setLng} />
            </header>
            <div className={styles.content}>
              <LocationMap lat={lat} lng={lng} />
            </div>
            <footer className={styles.footer}>
              <ModalButton type='canceled' text='취소' />
              <ModalButton type='mutated' text='확인' />
            </footer>
          </div>
        </Modal>,
        document.body
      )}
    </>
  );
}

export default SettingLocationModal;
