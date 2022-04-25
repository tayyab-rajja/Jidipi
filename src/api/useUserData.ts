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
const avatarUrl = `${process.env.NEXT_PUBLIC_API_URL}/reader/`

const fetcher = (url: string, token: string) => axios
    .get(url, { headers: { Authorization: "Bearer " + token } })
    .then((res) => res.data);

export const useUserData = () => {
  const {
    session: { token, user },
  } = useAuth();

  const {data, error, isValidating} = useSWR(user?._id ? [`${url}${user._id}`, token] : null, fetcher);

  const putData = (request: UserData) => {
    return axios.put(
      `${url}${user?._id}`,
      request,
    );
  }

  const putAvatar = (request: File | string) => {
    if (typeof request === 'string') {
      return putData({
        avatar: request
      })
    }

    const formData = new FormData();
    formData.append("file", request);

    return axios.post(
      `${avatarUrl}${user?._id}/upload`,
      formData,
    ).then(res => {
      putData({
        avatar: res.data.logo.liveURL
      })
    });
  }
  
  const updatePassword = (request: UpdatePassword) => axios.put(
    `${url}${user?._id}/updatePassword`,
    request
  );

  const sendEmailToRecoverPassword = (email: string) => axios.post(
    `${url}/forgetPassword`,
    {email}
  )
  
  return {data, error, isValidating, putData, updatePassword, putAvatar, sendEmailToRecoverPassword};
};