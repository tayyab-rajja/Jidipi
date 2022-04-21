import Image from "next/image";
import styles from "./HomePageFooter.module.css";

const HomePageFooter = () => {
  return (
    <section className={styles["HomePageFooter"]}>
      <Image
        className={styles["HomePageFooter-Image"]}
        width={400}
        height={100}
        src="https://jidipi.com/wp-content/uploads/2021/08/space-story-grey.png"
        alt="Space Story"
      />
      <h2>We focus on the space, and the lives in it.</h2>
      <p>
        The best space construction should be based on the harmony between
        people and nature.
      </p>
    </section>
  );
};

export default HomePageFooter;
