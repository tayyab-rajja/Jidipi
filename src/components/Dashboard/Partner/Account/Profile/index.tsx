import styles from "./Profile.module.scss";
import clsx from "clsx";
import DesktopView from "./DesktopView";
import TabletView from "./TabletView";
import MobileView from "./MobileView";
import { CompanyAdd } from "types/companyInfoTypes";
import { useSelector } from "react-redux";
import { UploadStatus } from "src/lib/file/action";

interface IProps {
    company: CompanyAdd;
}

export default function Profile({ company }: IProps) {
    // @ts-ignore
    const file = useSelector((state) => state.file.files?.[0]);
    // @ts-ignore
    const status = useSelector((state) => state.file.status);
    const showCompanyLogo =
        company.logo || (file && status === UploadStatus.allSuccess);
    const logo = company?.logo || file?.liveURL;
    return (
        <div
            className={clsx(
                styles["profile-form-mini"],
                styles["profile-container"]
            )}
        >
            <MobileView
                company={company}
                showCompanyLogo={showCompanyLogo}
                logo={logo}
            />

            <TabletView
                company={company}
                showCompanyLogo={showCompanyLogo}
                logo={logo}
            />

            <DesktopView
                company={company}
                showCompanyLogo={showCompanyLogo}
                logo={logo}
            />
        </div>
    );
}
