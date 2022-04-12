import axios from "axios";
import useSWR from "swr";
import { useAuth } from "src/providers/AuthProvider";
interface Request {
  firstName?: string;
  lastName?: string;
  email?: string;
  avatar?: string;
  logoId?: string;
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

  const putData = (request: Request) => {
    axios({
      method: 'put',
      url: `${url}${user?._id}`,
      data: request
    });
  }
  
  return {data, error, isValidating, putData};
};