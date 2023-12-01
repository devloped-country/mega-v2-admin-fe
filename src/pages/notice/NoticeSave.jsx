import NoticeMutateHeader from '@components/Notice/NoticeMutateHeader';
import { useEffect, useState } from 'react';
import NoticeSaved from '@components/Notice/NoticeSaved';
import NoticePreview from '@components/Notice/NoticePreview';
import { useNoticeSave } from '@/hooks/useNoticeSave';
import { useMutation } from '@/hooks/useMutation';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function NoticeSave() {
  const [isViewStatus, setIsViewStatus] = useState(true);
  const navigate = useNavigate();
  const {
    title,
    tag,
    content,
    textContent,
    tags,
    thumbnail,
    changeTitle,
    changeTag,
    changeTags,
    reset,
  } = useNoticeSave();
  const [
    isShowingTitleInputValidateMessage,
    setIsShowingTitleInputValidateMessage,
  ] = useState(false);
  const [
    isShowingTagsInputValidateMessage,
    setIsShowingTagsInputValidateMessage,
  ] = useState(false);
  const [
    isShowingContentInputValidateMessage,
    setIsShowingContentInputValidateMessage,
  ] = useState(false);

  const { mutate, isLoading } = useMutation(
    async (param) =>
      await axios({ url: '/api/notice', method: 'post', data: param }),
    {
      onSuccess: () => {
        navigate('/notice');
        reset();
      },
    }
  );

  useEffect(() => {
    reset();
  }, []);

  const handleClickSaveButton = () => {
    if (isLoading) {
      return;
    }

    if (!title.length) {
      setIsShowingTitleInputValidateMessage(true);
      return;
    }

    if (!content.length) {
      setIsShowingContentInputValidateMessage(true);
      return;
    }

    if (!tags.length) {
      setIsShowingTagsInputValidateMessage(true);
      return;
    }

    if (
      isShowingTagsInputValidateMessage ||
      isShowingContentInputValidateMessage ||
      isShowingTitleInputValidateMessage
    ) {
      return;
    }

    mutate({
      title,
      textContent,
      content,
      tags: tags.map(({ tag }) => tag),
      author: 'asdsad',
      createdTime: new Date(Date.now()),
      thumbnail,
    });
  };

  const handleClickViewButton = (isStatus) => {
    setIsViewStatus(isStatus);
  };

  return (
    <>
      <NoticeMutateHeader
        isViewStatus={isViewStatus}
        onMutate={handleClickSaveButton}
        onStatus={handleClickViewButton}
      />
      {isViewStatus ? (
        <NoticeSaved
          title={title}
          tag={tag}
          tags={tags}
          isShowingTitleInputValidateMessage={
            isShowingTitleInputValidateMessage
          }
          setIsShowingTitleInputValidateMessage={
            setIsShowingTitleInputValidateMessage
          }
          isShowingContentInputValidateMessage={
            isShowingContentInputValidateMessage
          }
          setIsShowingTagsInputValidateMessage={
            setIsShowingTagsInputValidateMessage
          }
          isShowingTagsInputValidateMessage={isShowingTagsInputValidateMessage}
          setIsShowingContentInputValidateMessage={
            setIsShowingContentInputValidateMessage
          }
          changeTitle={changeTitle}
          changeTag={changeTag}
          changeTags={changeTags}
        />
      ) : (
        <NoticePreview />
      )}
    </>
  );
}

export default NoticeSave;
