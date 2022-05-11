import styles from "./index.module.scss";
import clsx from "clsx";
import DesktopView from "./DesktopView";
import TabletView from "./TabletView";
import MobileView from "./MobileView";
import { useEffect } from "react";

interface IProps {}

export default function Profile({}: IProps) {
    useEffect(() => {
        const resizeObserver = new ResizeObserver((entries) => {
            for (let entry of entries) {
                const cr = entry.contentRect;
                console.log("Element:", entry.target);
                console.log(`Element size: ${cr.width}px x ${cr.height}px`);
                console.log(`Element padding: ${cr.top}px ; ${cr.left}px`);
            }
        });
        resizeObserver.observe(document.body);
        return () => {
            resizeObserver.disconnect();
        };
    }, []);
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
