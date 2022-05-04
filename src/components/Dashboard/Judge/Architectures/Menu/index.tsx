import Link from "next/link";
import { useRouter } from "next/router";
import type { PageFolder } from "types/pageFolderType";
interface IProps {
    menuFolders: PageFolder[];
}

export default ({ menuFolders }: IProps) => {
    const router = useRouter();
    const pathNameFregments = router.asPath.split("/");
    const folderName = pathNameFregments[pathNameFregments.length - 1];
    return (
        <div className="scroll-tabs">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
                {menuFolders?.map((folder) => (
                    <li
                        className="nav-item"
                        role="presentation"
                        key={folder._id}
                    >
                        <Link
                            href={`/dashboard/post/list/${folder.title}`}
                            data-bs-toggle="tab"
                            data-bs-target="#architectures"
                            aria-controls="architectures"
                            aria-selected="true"
                        >
                            <a
                                className={`nav-link tab-button ${
                                    folderName === folder.title && "active"
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
};