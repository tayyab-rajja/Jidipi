import { useEffect, useState } from "react";
import Masonry from "react-masonry-css";

import styles from "./PostsLoading.module.css";

function randomNumber(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

const PostsLoading = () => {
  const [heigth, setHeigth] = useState(0);

  useEffect(() => {
    setHeigth(randomNumber(100, 300));
  }, []);

  return (
    <Masonry
      breakpointCols={{
        default: 5,
        1800: 4,
        1520: 3,
        1220: 2,
        620: 1,
      }}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
        <div key={item} className={styles["Posts_SkeletonConatiner"]}>
          <div
            className={styles["Posts_SkeletonImage"]}
            style={{ height: heigth }}
          />
          <div className={styles["Posts_SkeletonTitle"]} />
        </div>
      ))}
    </Masonry>
  );
};

export default PostsLoading;
