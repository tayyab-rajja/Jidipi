import styles from "./index.module.scss";
import clsx from "clsx";
import DesktopView from "./DesktopView";
import TabletView from "./TabletView";
import MobileView from "./MobileView";

interface IProps {}

export default function Profile({}: IProps) {
    return (
        <div
            className={clsx(
                styles["profile-form-mini"],
                styles["profile-container"]
            )}
        >
            <MobileView />

            <TabletView />

            <DesktopView />
        </div>
    );
}
