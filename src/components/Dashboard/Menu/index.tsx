import Link from "next/link";
import { MenuType } from "types/topTabsMenu";
interface IProps {
    menu: MenuType[];
}

function Menu({ menu }: IProps) {
    return (
        <div className="scroll-tabs">
            <ul
                className="nav nav-tabs"
                id="myTab"
                role="tablist"
                suppressHydrationWarning={true}
            >
                {menu?.map((item: MenuType) => (
                    <li className="nav-item" role="presentation" key={item._id}>
                        <Link
                            href={item.href}
                            aria-controls={item.controls}
                            aria-selected="true"
                        >
                            <a
                                className={`nav-link tab-button ${
                                    item.active && "active"
                                }`}
                                role="tab"
                            >
                                {item.name}
                            </a>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Menu;
