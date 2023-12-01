import ContentHeader from '@components/common/ContentHeader';
import SettingContent from '@components/Setting/SettingContent';

function Setting() {
  return (
    <>
      <ContentHeader
        title='설정'
        img={`${
          import.meta.env.VITE_CLOUD_FRONT_ID
        }/free-icon-font-settings-3917058 1.svg`}
      />
      <SettingContent />
    </>
  );
}

export default Setting;
