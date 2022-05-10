import Link from "next/link";
import { useRouter } from "next/router";
import type { PageFolder } from "types/pageFolderType";
import IUser from "types/user";
interface IProps {
    menuFolders: PageFolder[];
    user: IUser;
}

function Menu({ menuFolders, user }: IProps) {
    const router = useRouter();
    const pathNameFregments = router.asPath.split("/");
    let folderName = pathNameFregments[pathNameFregments.length - 1];

    if (user && menuFolders?.length) {
        menuFolders = menuFolders.filter((f) =>
            user.competitionPageFolderIds?.some((c) => c === f._id)
        );
    }
    return (
        <div className="scroll-tabs">
            <ul
                className="nav nav-tabs"
                id="myTab"
                role="tablist"
                suppressHydrationWarning={true}
            >
                {menuFolders?.map((folder) => (
                    <li
                        className="nav-item"
                        role="presentation"
                        key={folder._id}
                    >
                        <Link
                            href={`/dashboard/post/list/${folder.title}?competitionId=${router.query.competitionId}`}
                            data-bs-toggle="tab"
                            data-bs-target="#architectures"
                            aria-controls="architectures"
                            aria-selected="true"
                        >
                            <a
                                className={`nav-link tab-button ${
                                    folderName.includes(folder.title) &&
                                    "active"
                                }`}
                                id="architectures-tab"
                                role="tab"
                            >
                                {folder.title.toUpperCase()}
                            </a>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Menu;
