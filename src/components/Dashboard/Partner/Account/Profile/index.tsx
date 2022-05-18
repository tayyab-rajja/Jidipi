import styles from "./Profile.module.scss";
import clsx from "clsx";
import DesktopView from "./DesktopView";
import TabletView from "./TabletView";
import MobileView from "./MobileView";
import { CompanyAdd } from "types/companyInfoTypes";

interface IProps {
    company: CompanyAdd;
}

export default function Profile({ company }: IProps) {
    return (
        <div
            className={clsx(
                styles["profile-form-mini"],
                styles["profile-container"]
            )}
        >
            <MobileView company={company} />

            <TabletView company={company} />

            <DesktopView company={company} />
        </div>
    );
}
