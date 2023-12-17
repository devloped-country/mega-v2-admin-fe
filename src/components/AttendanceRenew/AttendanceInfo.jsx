import Info from "@components/AttendanceRenew/Info";
import { useFetch } from "@/hooks/useFetch";
import ContentLoading from "@components/common/ContentLoading";
import axios from "axios";

function AttendanceInfo({ id }) {
  const { data, isLoading } = useFetch(
    [],
    async () =>
      await axios({
        url: `https://admin.mzc-appmega.click/api/attendance/${id}/userInfo`,
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
      <Info term="이름" definition={data.data.name} />
      <Info term="이메일" definition={data.data.email} />
      <Info term="전화번호" definition={`${data.data.phone.substring(0, 3)}-${data.data.phone.substring(3, 7)}-${data.data.phone.substring(7)}`} />
    </>
  );
}

export default AttendanceInfo;
