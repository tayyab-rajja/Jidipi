import { CompanyInfo } from "types/companyInfoTypes";
import axios from "axios";
import useSWR from "swr";

import { useAuth } from "src/providers/AuthProvider/AuthProvider";

const fetcher = (url: string, token: string) =>
  axios
    .get(url, { headers: { Authorization: "Bearer " + token } })
    .then((res) => res.data);

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYyNTZiNTIzY2E5OGQyMDAwN2JiYjgwNCIsInJvbGVzIjpbeyJfaWQiOiI2MDM4ZWViMzJjMGI4YzYyMThiNzkzZWMiLCJ0aXRsZSI6ImFkbWluIn1dLCJlbWFpbCI6ImRlbW9hZG1pbkBqaWRpcGkuY29tIn0sImlhdCI6MTY1MDAxNzU3MywiZXhwIjoxNjUyNjA5NTczfQ.TI1TALzf98TzPHiqdNWmVoYs25ZAJXlHSa8Fd_yY780";

export const useCompanyInfo = (partnerId?: string) => {
  // const {
  //   session: { token },
  // } = useAuth();
  let pages = [];

  const {
    data: company,
    error,
    isValidating,
  } = useSWR(
    [`${process.env.NEXT_PUBLIC_API_URL}/company/public/${partnerId}`, token],
    fetcher
  );

  if (company?.pages) {
    pages = company.pages;
  }

  if (company?.about) {
    pages = [...pages, { title: "about" }];
  }

  const data = {
    company: company?.company || company,
    pages,
  };

  return { data, error, isValidating };
};
