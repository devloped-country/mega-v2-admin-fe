import { useState } from 'react';
import styles from './SettingContent.module.css';
import SettingContentItem from '@components/Setting/SettingContentItem';
import SettingLocationModal from '@components/Setting/SettingLocationModal';

function SettingContent() {
  const [isShowingLocationModal, setIsShowingLocationModal] = useState(false);

  return (
    <>
      <section className={styles.wrapper}>
        <ul className={styles.settingList}>
          <SettingContentItem
            icon='🙋🏼'
            title='마이페이지'
            desc='본인정보 조회 및 수정'
          />
          <SettingContentItem
            icon='🚩'
            title='위치 설정'
            desc='QR인증 위치 설정'
            onClick={() => setIsShowingLocationModal(true)}
          />
          <SettingContentItem icon='🔑' title='관리자 계정 생성' />
          <SettingContentItem icon='🔒' title='비밀번호 변경' />
          <SettingContentItem icon='🚪' title='로그아웃' />
        </ul>
      </section>
      {isShowingLocationModal && (
        <SettingLocationModal
          onClose={() => setIsShowingLocationModal(false)}
        />
      )}
    </>
  );
}

export default SettingContent;
