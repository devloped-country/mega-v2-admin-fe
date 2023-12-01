import NoticeMutateHeader from '@components/Notice/NoticeMutateHeader';
import { useEffect, useState } from 'react';
import NoticeSaved from '@components/Notice/NoticeSaved';
import NoticePreview from '@components/Notice/NoticePreview';
import { useNoticeSave } from '@/hooks/useNoticeSave';
import { useMutation } from '@/hooks/useMutation';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useFetch } from '@/hooks/useFetch';
import Loading from '@/components/common/Loading  ';

function NoticeEdit() {
  const [isViewStatus, setIsViewStatus] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();
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

  const {
    isTitle,
    title,
    tag,
    content,
    textContent,
    tags,
    thumbnail,
    changeIsTitle,
    changeTitle,
    changeTag,
    changeContent,
    changeTextContent,
    changeTags,
    reset,
  } = useNoticeSave();
  const { mutate, isLoading } = useMutation(
    async (param) =>
      await axios({ url: `/api/notice/${id}`, method: 'put', data: param }),
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

  const { data, isLoading: isEditLoading } = useFetch(
    [],
    async () => await axios(`/api/notice/${id}`),
    {
      onSuccess: ({ data }) => {
        changeTextContent(data.data.textContent);
        changeTitle(data.data.title);
        changeContent(data.data.content);
        changeTags(data.data.tags);
      },
    }
  );

  if (isEditLoading) {
    return <Loading />;
  }

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
      tags: tags.map((tag) => {
        return tag.tag;
      }),
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
          isTitle={isTitle}
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
          changeIsTitle={changeIsTitle}
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

export default NoticeEdit;
