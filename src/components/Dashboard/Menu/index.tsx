import Link from "next/link";
import { MenuType } from "types/topTabsMenu";
import styles from "./Menu.module.scss";
import clsx from "clsx";
interface IProps {
    menu: MenuType[];
}

function Menu({ menu }: IProps) {
    return (
        <div className="scroll-tabs">
            <ul
                className={clsx("nav", styles["nav-tabs"], "nav-tabs")}
                id="myTab"
                role="tablist"
                suppressHydrationWarning={true}
            >
                {menu?.map((item: MenuType) => (
                    <li
                        className={styles["nav-item"]}
                        role="presentation"
                        key={item._id}
                    >
                        <Link
                            href={item.href}
                            aria-controls={item.controls}
                            aria-selected="true"
                        >
                            <button
                                className={clsx(
                                    styles["nav-link"],
                                    styles["tab-button"],
                                    item.active && styles["active"]
                                )}
                                role="tab"
                            >
                                {item.name}
                            </button>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Menu;
