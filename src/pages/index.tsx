import type {GetServerSideProps} from "next";
import {fetchPageFolders} from "src/api/fetchPageFolders";

import {Post} from "types/postTypes";
import {PageFolder} from "types/pageFolderType";
import Link from "next/link";

interface Props {
    pageFolders: PageFolder[];
    posts: {
        posts: [] | Post[];
        total: number;
    };
    sidebarCategories: any;
}

const Home = ({pageFolders, posts, sidebarCategories}: Props) => {
    return (
        <ul>
            <li>
                <Link href="/user/login">
                    <a>user/login</a>
                </Link>
            </li>
        </ul>
    );
    console.log(`/${pageFolders[0].subDomain}`);
    return <></>;
};

export default Home;

export const getServerSideProps: GetServerSideProps = async ({locale}) => {

    // use process.env.current domain for testing in local,
    // once online, should judge the subdomain from url
    const currentDomain = process.env.CURRENT_DOMAIN ? process.env.CURRENT_DOMAIN.toString() : '';
    let redirectToPath = `/`;
    if (["partner.jidipi.com", "judge.jidipi.com"].includes(currentDomain)) {
        //If not login, redirect to login page
        redirectToPath = `/user/login`;
    }else{

        let pageFolders: PageFolder[] = [];

        try {
            pageFolders = await fetchPageFolders();
        } catch (e) {
            console.log(e);
        }
        let redirectToPath = `/${pageFolders[0].subDomain}`;
    }
    return {
        redirect: {
            permanent: false,
            destination: redirectToPath,
        },
    };
};
