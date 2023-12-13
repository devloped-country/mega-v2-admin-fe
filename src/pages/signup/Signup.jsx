import { useLocation, useNavigate, useParams } from "react-router-dom";
import SignupTitles from "@/components/common/SignupTitles";
import SignupButton from "@/components/common/SignupButton";
import First from "@/components/Signup/First";
import Second from "@/components/Signup/Second";
import Third from "@/components/Signup/Third";
import Fourth from "@/components/Signup/Fourth";
import Sixth from "@/components/Signup/Sixth";
import Fifths from "@/components/Signup/Fifths";
import Seventh from "@/components/Signup/Seventh";
import styles from "@/pages/Signup/Signup.module.css";

function Signup() {
  const navigate = useNavigate();
  const { page } = useParams();
  const location = useLocation();

  if (parseInt(page) === 1) {
    return <First />;
  } else if (parseInt(page) === 2) {
    return <Second />;
  } else if (parseInt(page) === 3) {
    return <Third />;
  } else if (parseInt(page) === 4) {
    return <Fourth />;
  } else if (parseInt(page) === 5) {
    return <Fifths />;
  } else if (parseInt(page) === 6) {
    return <Sixth />;
  } else if (parseInt(page) === 7) {
    return <Seventh />;
  }
  const handleClickNextButton = () => {
    navigate("/intro");
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.form}>
        <SignupTitles text={`${location.state.name}님 환영해요!`} />
        <img
          className={styles.img}
          src={`${import.meta.env.VITE_CLOUD_FRONT_ID}/party_popper 1.svg`}
          alt="가입 환영"
        />
        <SignupButton text="확인" onClick={handleClickNextButton} />
      </div>
    </section>
  );
}

export default Signup;
