import { useRouter } from "next/router";
import Menu from "src/components/Dashboard/Menu";
import { MenuType } from "types/topTabsMenu";

interface IProps {}

function ProfileMenu({}: IProps) {
    const router = useRouter();
    const pathNameFregments = router.asPath.split("/");
    let fileName = pathNameFregments[pathNameFregments.length - 1];
    const menu: MenuType[] = [
        {
            _id: "1",
            active: fileName.includes("profile"),
            controls: "profile",
            href: "/dashboard/partner/account/profile",
            name: "PROFILE",
        },
        {
            _id: "2",
            active: fileName.includes("user"),
            controls: "user",
            href: "/dashboard/partner/account/user",
            name: "USER",
        },
        {
            _id: "3",
            active: fileName.includes("membership"),
            controls: "membership",
            href: "/dashboard/partner/account/membership",
            name: "MEMBERSHIP",
        },
    ];
    return <Menu menu={menu} />;
}

export default ProfileMenu;
