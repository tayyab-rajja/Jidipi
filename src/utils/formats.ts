import { CompanyAdd } from "types/companyInfoTypes";

export const telephoneFaxFieldFormat = (company: CompanyAdd) => {
    const { telephone, fax } = company;
    return telephone && fax
        ? `T ${telephone}    F ${fax}`
        : telephone
        ? `T ${telephone}`
        : fax
        ? `F ${fax}`
        : "";
};

export const websiteUrlFormat = (website: string) => {
    if (!website) return "http://jidipi.com";
    return website.startsWith("http") ? website : `https://${website}`;
};
