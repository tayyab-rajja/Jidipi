import useSWR from "swr";

import { ComnanyInfo } from "types/companyInfoTypes";

export const useCompanyInfo = (companyId?: string) => {
  const { data, error, isValidating } = useSWR<ComnanyInfo>(
    companyId ? `${process.env.NEXT_PUBLIC_API_URL}/company/${companyId}` : null
  );

  return { data, error, isValidating };
};
