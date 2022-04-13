import useSWR from "swr";

import { CompanyInfo } from "types/companyInfoTypes";

export const useCompanyInfo = (partnerId?: string) => {
  const { data, error, isValidating } = useSWR<CompanyInfo>(
    partnerId
      ? `${process.env.NEXT_PUBLIC_API_URL}/company/public/${partnerId}`
      : null
  );

  return { data, error, isValidating };
};
