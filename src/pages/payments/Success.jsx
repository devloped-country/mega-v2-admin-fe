import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useMutation } from '@/hooks/useMutation';
import axios from 'axios';
import ModalButton from '@/components/common/ModalButton';
import styles from './Success.module.css';
import { useFetch } from '@/hooks/useFetch';

export function SuccessPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const [isConfirm, setIsConfirm] = useState(false);
  console.log(location);
  const { mutate } = useMutation(
    async (params) =>
      await axios({
        url: 'https://admin.mzc-appmega.click/api/v1/payments/toss/success',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        method: 'post',
        data: params,
      })
  );

  useEffect(() => {
    const requestData = {
      orderId: searchParams.get('orderId'),
      amount: searchParams.get('amount'),
      paymentKey: searchParams.get('paymentKey'),
    };

    // TODO: 개발자센터에 로그인해서 내 결제위젯 연동 키 > 시크릿 키를 입력하세요. 시크릿 키는 외부에 공개되면 안돼요.
    // @docs https://docs.tosspayments.com/reference/using-apihttps://admin.mzc-appmega.click/api-keys
    const secretKey = 'test_gsk_docs_OaPz8L5KdmQXkzRz3y47BMw6';

    // 토스페이먼츠 API는 시크릿 키를 사용자 ID로 사용하고, 비밀번호는 사용하지 않습니다.
    // 비밀번호가 없다는 것을 알리기 위해 시크릿 키 뒤에 콜론을 추가합니다.
    // @docs https://docs.tosspayments.com/reference/using-api/authorization#%EC%9D%B8%EC%A6%9D
    const encryptedSecretKey = `Basic ${btoa(secretKey + ':')}`;

    async function confirm() {
      const response = await fetch(
        'https:/https://admin.mzc-appmega.click/api.tosspayments.com/v1/payments/confirm',
        {
          method: 'POST',
          headers: {
            Authorization: encryptedSecretKey,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        }
      );

      const json = await response.json();

      if (!response.ok) {
        // TODO: 구매 실패 비즈니스 로직 구현
        console.log(json);
        navigate(`/fail?code=${json.code}&message=${json.message}`);
        return;
      }

      // TODO: 구매 완료 비즈니스 로직 구현

      await axios(
        `https://admin.mzc-appmega.click/api/v1/payments/toss${json.orderName}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
          data: requestData,
        }
      );
      navigate('/');
    }
    confirm();
    // mutate({
    //   orderId: searchParams.get('orderId'),
    //   amount: searchParams.get('amount'),
    //   paymentKey: searchParams.get('paymentKey'),
    // });
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.innerWrapper}>
        <img src={`https://d2f3kqq80r3o3g.cloudfront.net/party_popper 1.svg`} />
        <h2 className={styles.title}>결제 완료</h2>
        <button
          className='button'
          style={{ marginTop: '30px', marginRight: '10px' }}
          onClick={() => navigate('/intro')}
        >
          홈으로 이동
        </button>
      </div>
    </div>
  );
}
