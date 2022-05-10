import { useAuth } from "src/providers/AuthProvider/AuthProvider";
import axios from "axios";
import { ILoginSuccess } from "types/loginTypes";
import { useSideBar } from "src/providers/SidebarProvider/SidebarProvider";

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
  const { close } = useSideBar();

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
        close();
        return;
      }
      return socialLoginResponse as {[key: string]: any};
    } catch (error: any) {
      console.log(error?.response?.data?.error);
      // TODO: show error message
    }
  };

  return { login };
};
