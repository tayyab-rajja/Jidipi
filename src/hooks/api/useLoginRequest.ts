import { useAuth } from "src/providers/AuthProvider";
import axios from "axios";
import { ILoginSuccess } from "types/loginTypes";

type LoginByCredsParamsType = { email: string; password: string };
type LoginByFacebookType = {
  type: "social";
  network: "facebook";
  accessToken: string;
};
type LoginByGoogleType = {
  type: "social";
  network: "google";
  credential: string;
};

type LoginBodyType =
  | LoginByCredsParamsType
  | LoginByFacebookType
  | LoginByGoogleType;

export const useLoginRequest = () => {
  const { setSession, setLoading } = useAuth();

  const login = async (body: LoginBodyType) => {
    try {
      setLoading();

      const socialLoginResponse = await axios.post<ILoginSuccess>(
        `${process.env.NEXT_PUBLIC_API_URL}/user/login`,
        body
      );
      if (socialLoginResponse.status === 200) {
        const response: ILoginSuccess = socialLoginResponse.data;
        setSession(response);
        return;
      }
      return socialLoginResponse;
    } catch (error: any) {
      console.log(error?.response?.data?.error);
      // TODO: show error message
    }
  };

  return { login };
};
