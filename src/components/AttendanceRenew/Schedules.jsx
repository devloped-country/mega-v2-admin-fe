import Schedule from "./Schedule";
import { useFetch } from "@/hooks/useFetch";
import ContentLoading from "@components/common/ContentLoading";
import axios from "axios";

function Schedules({ id }) {
  const { data, isLoading, refetch } = useFetch(
    [],
    async () =>
      await axios({
        url: `https://admin.mzc-appmega.click/api/attendance/${id}/getAppliancesById`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
  );

  if (isLoading) {
    return <ContentLoading />;
  }

  const mapedData = data.data.map(({ status, attendance, time, statusChangeAllow }) => {
    status = 4;
    return (
      <Schedule
        key={attendance}
        refetch={refetch}
        attendance={attendance}
        status={status}
        title={status === 3 ? "조퇴" : status === 4 && "공가"}
        date={time}
        type={statusChangeAllow === 0 ? "green" : statusChangeAllow === 1 ? "blue" : "orange"}
        text={statusChangeAllow === 0 ? "대기중" : statusChangeAllow === 1 ? "승인" : "미승인"}
      />
    );
  });

  return <ul>{data.data.length ? mapedData : "일정이 없습니다."}</ul>;
}

export default Schedules;
