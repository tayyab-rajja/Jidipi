import styles from './company.module.scss';
import {GetServerSideProps} from "next";
export default function Companies(props: any) {
    console.log(props);
    //Use swr?

    return (
        <div className={styles.container}>
            companies list...
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    console.log(context.params);
    return {
        props: {
            // props for your component
        }
    }
}