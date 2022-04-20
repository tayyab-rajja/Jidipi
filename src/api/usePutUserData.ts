import axios, { AxiosResponse, AxiosPromise } from "axios";
import useSWR from "swr";
import { useAuth } from "src/providers/AuthProvider/AuthProvider";
interface UserData {
  firstName?: string;
  lastName?: string;
  email?: string;
  avatar?: string;
  logoId?: string;
}

interface UpdatePassword {
  currentPassword: string;
  password: string;
}

const url = `${process.env.NEXT_PUBLIC_API_URL}/user/`

const fetcher = (url: string, token: string) => axios
    .get(url, { headers: { Authorization: "Bearer " + token } })
    .then((res) => res.data);

export const usePutUserData = () => {
  const {
    session: { token, user },
  } = useAuth();

  const {data, error, isValidating} = useSWR(user?._id ? [`${url}${user._id}`, token] : null, fetcher);

  const putData = (request: UserData) => {
    const formData = new FormData();
    
    for (let key in request) {
      formData.append(key, request[key]);
    }
    
    return axios.put(
      `${url}${user?._id}`,
      formData,
    );
  }
  
  const updatePassword = (request: UpdatePassword) => axios.put(
    `${url}${user?._id}/updatePassword`,
    request
  );
  
  return {data, error, isValidating, putData, updatePassword};
};