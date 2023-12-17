import SignupTitles from "@/components/common/SignupTitles";
import SignupButton from "@components/common/SignupButton";
import styles from "./Sixth.module.css";
import { useNavigate } from "react-router-dom";
import { useSignup } from "@/hooks/useSignup";
import { useEffect, useState } from "react";
import { useMutation } from "@/hooks/useMutation";
import axios from "axios";

function Sixth() {
  const { companyName, courses, phoneNumber, email, adminName, password, changePassword, address, detailAddress, latitude, longitude, reset } = useSignup();
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const navigate = useNavigate();
  const [isActiveButton, setIsActiveButton] = useState(true);

  useEffect(() => {
    setIsActiveButton(!password.length || !passwordConfirm.length);
  }, [password, passwordConfirm]);

  const { mutate } = useMutation(
    async (param) =>
      await axios({
        url: "https://admin.mzc-appmega.click/api/auth/register/institution",
        method: "post",
        data: param,
      }),
    {
      onSuccess: ({ isManager, isToken }) => {
        localStorage.setItem("token", isToken);
        reset();
        navigate("/signup/7", {
          state: { name: adminName },
        });
      },
    }
  );

  const handleChangePasswordConfirm = ({ target }) => {
    setPasswordConfirm(target.value);
  };

  const handleClickNextButton = () => {
    if (!password.length || !passwordConfirm.length || password !== passwordConfirm) {
      return;
    }

    mutate({
      latitude,
      longitude,
      name: companyName,
      courses: courses.map((course) => course.value),
      email,
      password,
      phone: phoneNumber,
      address: address + detailAddress,
    });
  };

  const onConfirmPassword = ({ code }) => {
    if (code === "Enter") {
      handleClickNextButton();
    }
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.form}>
        <SignupTitles text="비밀번호를 입력해주세요." />
        <input type="password" placeholder="비밀번호" onChange={changePassword} onKeyDown={onConfirmPassword} className={styles.input} value={password} />
        <input type="password" placeholder="비밀번호 확인" onChange={handleChangePasswordConfirm} onKeyDown={onConfirmPassword} className={styles.input} value={passwordConfirm} />
        <SignupButton text="가입" onClick={handleClickNextButton} isDisabled={isActiveButton} />
      </div>
    </section>
  );
}

export default Sixth;
