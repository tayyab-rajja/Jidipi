import axios from "axios";
import useSWR from "swr";

import { PageFolder } from "types/pageFolderType";
import { infoPages } from "types/companyInfoPages";

import { useAuth } from "src/providers/AuthProvider/AuthProvider";

const fetcher = (url: string, token: string) =>
  axios
    .get(url, { headers: { Authorization: "Bearer " + token } })
    .then((res) => res.data);

export const useCompanyInfo = (partnerId?: string) => {
  const {
    session: { token },
  } = useAuth();

  let cardPages: PageFolder[] = [];
  let infoPages: infoPages[] = [];

  const {
    data: company,
    error,
    isValidating,
  } = useSWR(
    [`${process.env.NEXT_PUBLIC_API_URL}/company/public/${partnerId}`, token],
    fetcher
  );

  if (company?.pages) {
    cardPages = company.pages;
  }

  if (company?.about) {
    infoPages = [{ title: "about", content: company.about }];
  }

  const data = {
    company: company?.company || company || null,
    cardPages,
    infoPages,
  };

  return { data, error, isValidating };
};
