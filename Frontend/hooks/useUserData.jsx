import { useEffect, useState } from "react";
import api from "../api/index";

const useUserData = () => {
  const initialState = {
    info: {
      _id: "",
      username: "",
      email: "",
    },
    status: null,
    isError: false,
    error: {
      errorMsg: "",
      sessionExpired: false,
    },
  };

  const [userData, setUserData] = useState(initialState);
  useEffect(() => {
    (async () => {
      try {
        const endpoint = "/user";
        const response = await api.get(endpoint);
        if (response && response.status == 200) {
          const data = {
            info: {
              _id: response?.data?._id,
              username: response?.data?.username,
              email: response?.data?.email,
            },
            status: response?.status || 201,
            isError: false,
            error: {
              errorMsg: "",
              sessionExpired: false,
            },
          };
          setUserData(data);
        } else {
          console.error("Couldn't load data");
        }
      } catch (error) {
        console.log("Couldn't load data", error);
        const data = {
          info: {
            _id: null,
            username: null,
            email: null,
          },
          status: error.response?.status || 403,
          isError: true,
          error: {
            errorMsg: error?.response?.data?.message,
            sessionExpired: true,
          },
        };
        if (error?.response?.status == 401) {
        }
        setUserData(data);
      }
    })();
  }, []);

  return { userData, setUserData };
};

export default useUserData;
