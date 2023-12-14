import Info from "@components/AttendanceRenew/Info";
import { useFetch } from "@/hooks/useFetch";
import ContentLoading from "@components/common/ContentLoading";
import axios from "axios";

function AttendanceInfo() {
  const { data, isLoading } = useFetch(
    [],
    async () =>
      await axios({
        url: "/api/attendance",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
  );

  if (isLoading) {
    return <ContentLoading />;
  }

  return (
    <>
      <Info term="이름" definition="김유범" />
      <Info term="생년월일" definition="123456" />
      <Info term="이메일" definition="kub1234@naver.com" />
      <Info term="전화번호" definition="010-1234-5678" />
      <Info term="주소" definition="대연역 2번 출구" />
      <Info term="계좌번호" definition="123456-12-123456" />
      <Info term="은행" definition="국민은행" />
    </>
  );
}

export default AttendanceInfo;
