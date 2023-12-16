import axios from "axios";
import { useFetch } from "./useFetch";

export const useCourses = () => {
  const { data } = useFetch(
    [],
    async () =>
      await axios({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        url: "https://admin.mzc-appmega.click/api/auth/read/manager_course",
        withCredentials: true,
      })
  );

  return { data };
};
