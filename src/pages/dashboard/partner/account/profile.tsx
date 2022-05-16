import { useEffect, useState } from "react";
import { DashboardLayout } from "src/components/Dashboard/Layout/Layout";
import TopMenuContent from "src/components/Dashboard/Partner/Account/Profile";
import TopMenuContentWrapper from "src/components/Dashboard/Partner/Account/Profile/Wrapper";
import Menu from "src/components/Dashboard/Partner/Account/Menu";
import Form from "src/components/Dashboard/Partner/Account/Form";
import { CompanyAdd } from "types/companyInfoTypes";
import { GET } from "src/lib/common/api";
import { GetServerSideProps } from "next";
import { ICountry } from "types/country";
import { CategoryAPI } from "types/categoryTypes";

interface IProps {
    countries: ICountry[];
    categories: CategoryAPI[];
}

export default function Profile({ countries, categories }: IProps) {
    const [company, setCompany] = useState<CompanyAdd>({
        brandName: "",
        companyName: "",
        email: "",
        description: "",
        telephone: "",
        fax: "",
        label: "",
        groups: [],
        avatar: "",
        profileUrl: "",
        partnerUrl: "",
        website: "",
        country: "",
        address: "",
        qrCode: "",
        qrLink: "",
        googleMapLink: "",
        facebookLink: "",
        twitterLink: "",
        instagramLink: "",
        pininterestLink: "",
        youtubeLink: "",
        vimeoLink: "",
        linkedLink: "",
        behancLink: "",
        status: "Draft",
        publishedDate: "",
        scheduledDate: "",
        isActive: true,
        _id: undefined,
        logoId: null,
    });

    const handleChange = (prop: string, value: string) => {
        setCompany((company: any) => {
            company[prop] = value;
            return { ...company };
        });
    };
    return (
        <DashboardLayout
            TopDropdownComponent={<TopMenuContent company={company} />}
            TopDropdownComponentWrapper={TopMenuContentWrapper}
            TopDropdownButtonName={"PROFILE"}
            tab={<Menu />}
        >
            <Form
                handleChange={handleChange}
                company={company}
                countries={countries}
                categories={categories}
            />
        </DashboardLayout>
    );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const props: any = {};
    try {
        const urls = ["/company/list/countries", "/category?type=GROUP"];
        const [countries, categories] = await Promise.all(
            urls.map((url) => GET(url, req.cookies))
        );
        props.countries = countries;
        props.categories = categories.categories[0].categories;
        console.log(props);
    } catch (error) {
        console.log(error);
    }
    return {
        props,
    };
};
