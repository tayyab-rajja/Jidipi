import styles from './post.module.scss';
import {GetServerSideProps} from "next";
import {ActivityStatus, CoverStatus, MessageStatus, PostStatus} from "../../../lib/models/post";
import {GET} from "../../../lib/common/api";

export default function Posts(props: any) {
    console.log(props);
    //Use swr?
    return (
        <div className={styles.container}>
            companies list...
        </div>
    );
};

// export const getStaticProps = async () => {
//
// };


export const getServerSideProps: GetServerSideProps = async (context) => {
    //TODO check if user is logged in

    const pages = await GET('/pages');
    const competitions = await GET('/competition');
    // Filters for partners
    const languages: any[] = [];
    const status = ActivityStatus;
    const message = MessageStatus;
    // Filter for staffs
    // editor,manager, image(CoverStatus)
    const posts: any[] = []; //Fetch by AJAX
    // const status = PostStatus;
    // Get
    return {
        props: {PostStatus, MessageStatus, CoverStatus, competitions, pages},
    };
}