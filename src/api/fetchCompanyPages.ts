export const fetchCompanyPages = async (companyId: string) => {
  if (!companyId) {
    return [];
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/pages/companyPages/${companyId}`
  );

  const data = await response.json();

  return data.pageFolders.map((item: any) => ({
    ...item._id,
  }));
};
