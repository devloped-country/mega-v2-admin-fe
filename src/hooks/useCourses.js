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
        url: "/api/auth/read/manager_course",
      })
  );

  return { data };
};
