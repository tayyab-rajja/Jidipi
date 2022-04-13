export const fetchCompanyInfo = async (partnerId: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/company/public/${partnerId}`
  );
  const data = await response.json();

  return data;
};
