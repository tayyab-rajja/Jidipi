import useSWR from "swr";

import { CompanyInfo } from "types/companyInfoTypes";

export const useCompanyInfo = (companyId?: string) => {
  const { data, error, isValidating } = useSWR<CompanyInfo>(
    companyId ? `${process.env.NEXT_PUBLIC_API_URL}/company/${companyId}` : null
  );

  return { data, error, isValidating };
};
