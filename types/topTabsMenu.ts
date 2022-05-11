import { PageFolder } from "./pageFolderType";

// export type MenuType = PageFolder & { href: string; name: string; active: boolean };

export interface MenuType {
    _id: string;
    href: string;
    name: string;
    active: boolean;
    controls: string;
}