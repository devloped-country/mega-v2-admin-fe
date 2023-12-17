import { createPortal } from 'react-dom';
import Modal from '@components/common/Modal';
import ModalButton from '@components/common/ModalButton';
import styles from './SettingManagerModal.module.css';
import { useReducer } from 'react';
import {
  addManagerReducer,
  initialAddManagerState,
} from '@/reducer/addManagerReducer';
import { useMutation } from '@/hooks/useMutation';
import axios from 'axios';

function SettingManagerModal({ title, onClose }) {
  const [addManagerState, dispatch] = useReducer(
    addManagerReducer,
    initialAddManagerState
  );

  const { mutate } = useMutation(
    async (param) =>
      await axios({
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        url: 'https://admin.mzc-appmega.click/api/auth/register/manager',
        method: 'post',
        data: param,
      }),
    {
      onSuccess: () => {
        onClose();
      },
    }
  );

  const onInvite = () => {
    const { name, email, phoneNumber, password, passwordConfirm } =
      addManagerState;

    if (
      !name.length ||
      !email.length ||
      !phoneNumber.length ||
      !password.length ||
      !passwordConfirm.length ||
      password !== passwordConfirm
    ) {
      return;
    }

    mutate({
      name,
      email,
      phone: phoneNumber,
      password,
    });
  };

  return (
    <>
      {createPortal(
        <Modal onClose={onClose}>
          <div className={styles.wrapper}>
            <div className={styles.content}>
              <header className={styles.header}>
                <h2 className={styles.headerTitle}>{title}</h2>
                <div className={styles.modalWrapper}>
                  <div className={styles.innerWrapper}>
                    <h2 className={styles.title}>
                      <img
                        src={`${
                          import.meta.env.VITE_CLOUD_FRONT_ID
                        }/free-icon-font-attribution-pencil-9291615 1.svg`}
                        alt=''
                      />
                      기본정보 입력
                    </h2>
                    <dl className={styles.inputWrapper}>
                      <dt>이름</dt>
                      <dd>
                        <input
                          type='text'
                          placeholder='이름'
                          className={styles.input}
                          value={addManagerState.name}
                          onChange={({ target }) =>
                            dispatch({
                              type: 'INPUT',
                              payload: 'name',
                              value: target.value,
                            })
                          }
                        />
                      </dd>
                    </dl>
                    <dl className={styles.inputWrapper}>
                      <dt>이메일</dt>
                      <dd>
                        <input
                          type='text'
                          placeholder='이메일'
                          className={styles.input}
                          onChange={({ target }) =>
                            dispatch({
                              type: 'INPUT',
                              payload: 'email',
                              value: target.value,
                            })
                          }
                        />
                      </dd>
                    </dl>
                    <dl className={styles.inputWrapper}>
                      <dt>전화번호</dt>
                      <dd>
                        <input
                          type='text'
                          placeholder='전화번호'
                          className={styles.input}
                          onChange={({ target }) =>
                            dispatch({
                              type: 'INPUT',
                              payload: 'phoneNumber',
                              value: target.value,
                            })
                          }
                        />
                      </dd>
                    </dl>
                    <dl className={styles.inputWrapper}>
                      <dt>비밀번호</dt>
                      <dd>
                        <input
                          type='password'
                          placeholder='비밀번호'
                          className={styles.input}
                          onChange={({ target }) =>
                            dispatch({
                              type: 'INPUT',
                              payload: 'password',
                              value: target.value,
                            })
                          }
                        />
                      </dd>
                    </dl>
                    <dl className={styles.inputWrapper}>
                      <dt>비밀번호 확인</dt>
                      <dd>
                        <input
                          type='password'
                          placeholder='비밀번호 확인'
                          className={styles.input}
                          onChange={({ target }) =>
                            dispatch({
                              type: 'INPUT',
                              payload: 'passwordConfirm',
                              value: target.value,
                            })
                          }
                        />
                      </dd>
                    </dl>
                  </div>
                </div>
              </header>
            </div>
            <footer className={styles.footer}>
              <ModalButton type='canceled' text='취소' onAction={onClose} />
              <ModalButton type='mutated' text='확인' onAction={onInvite} />
            </footer>
          </div>
        </Modal>,
        document.body
      )}
    </>
  );
}

export default SettingManagerModal;
