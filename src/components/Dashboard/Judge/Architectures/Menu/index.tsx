import { useRouter } from "next/router";
import type { PageFolder } from "types/pageFolderType";
import IUser from "types/user";
import Menu from "src/components/Dashboard/Menu";
import { MenuType } from "types/topTabsMenu";

interface IProps {
    menuFolders: PageFolder[];
    user: IUser;
}

function JudgeMenu({ menuFolders, user }: IProps) {
    const router = useRouter();
    const pathNameFregments = router.asPath.split("/");
    let folderName = pathNameFregments[pathNameFregments.length - 1];
    let menu: MenuType[] = [];
    if (user && menuFolders?.length) {
        menu = menuFolders
            .filter((f) =>
                user.competitionPageFolderIds?.some((c) => c === f._id)
            )
            .map((folder) => {
                return {
                    _id: folder._id,
                    href: `/dashboard/post/list/${folder.title}?competitionId=${router.query.competitionId}`,
                    name: folder.title.toUpperCase(),
                    active: folderName.includes(folder.title),
                    controls: "architectures",
                };
            });
    }
    return <Menu menu={menu} />;
}

export default JudgeMenu;
