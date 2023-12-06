import { useState } from 'react';
import styles from './SettingContent.module.css';
import SettingContentItem from '@components/Setting/SettingContentItem';
import SettingLocationModal from '@components/Setting/SettingLocationModal';
import SettingManagerModal from './SettingManagerModal';
import { useNavigate } from 'react-router-dom';

function SettingContent() {
  const navigate = useNavigate();
  const [isShowingLocationModal, setIsShowingLocationModal] = useState(false);
  const [isShowingManagerModal, setIsShowingManagerModal] = useState(false);

  const onClickLogout = () => {
    localStorage.clear();
    navigate('/intro');
  };

  return (
    <>
      <section className={styles.wrapper}>
        <ul className={styles.settingList}>
          <SettingContentItem
            icon='🚩'
            title='위치 설정'
            desc='QR인증 위치 설정'
            onClick={() => setIsShowingLocationModal(true)}
          />
          <SettingContentItem
            icon='🔑'
            title='매니저 계정 생성'
            onClick={() => setIsShowingManagerModal(true)}
          />
          <SettingContentItem
            icon='🚪'
            title='로그아웃'
            onClick={onClickLogout}
          />
        </ul>
      </section>
      {isShowingLocationModal && (
        <SettingLocationModal
          onClose={() => setIsShowingLocationModal(false)}
        />
      )}
      {isShowingManagerModal && (
        <SettingManagerModal
          title='매니저 계정 생성'
          onClose={() => setIsShowingManagerModal(false)}
        />
      )}
    </>
  );
}

export default SettingContent;
