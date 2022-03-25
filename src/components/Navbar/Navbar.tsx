import Link from "next/link";

import styles from "./Navbar.module.css";

export const Navbar = () => {
  return (
    <header className={styles["Navbar"]}>
      <h1 className={styles["Navbar-Title"]}>jidipi</h1>
      <nav className={styles["Navbar-Menu"]}>
        <ul>
          <li className={styles["Navbar-ActiveTab"]}>
            <Link href="#">
              <a>home</a>
            </Link>
          </li>
          <li>
            <Link href="#">
              <a>architectures</a>
            </Link>
          </li>
          <li>
            <Link href="#">
              <a>interiors</a>
            </Link>
          </li>
          <li>
            <Link href="#">
              <a>constructions</a>
            </Link>
          </li>
          <li>
            <Link href="#">
              <a>electronics</a>
            </Link>
          </li>
          <li>
            <Link href="#">
              <a>furniture</a>
            </Link>
          </li>
          <li>
            <Link href="#">
              <a>goods</a>
            </Link>
          </li>
        </ul>
      </nav>
      <div className={styles["Navbar-User"]}>
        <svg
          data-name="icon people"
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
        >
          <path
            d="M7.223 2.8a1.723 1.723 0 0 1-1.768 1.675A1.723 1.723 0 0 1 3.686 2.8a1.723 1.723 0 0 1 1.769-1.675A1.723 1.723 0 0 1 7.223 2.8Zm1.169 0a2.871 2.871 0 0 1-2.937 2.8 2.871 2.871 0 0 1-2.938-2.8A2.871 2.871 0 0 1 5.455 0a2.871 2.871 0 0 1 2.937 2.8ZM4.257 7.525h2.395a3.116 3.116 0 0 1 3.088 3.142.228.228 0 0 1-.064.164.135.135 0 0 1-.1.045H1.33a.135.135 0 0 1-.1-.045.228.228 0 0 1-.064-.164 3.116 3.116 0 0 1 3.091-3.142ZM0 10.667A4.262 4.262 0 0 1 4.257 6.4h2.395a4.262 4.262 0 0 1 4.257 4.267A1.332 1.332 0 0 1 9.579 12H1.33A1.332 1.332 0 0 1 0 10.667Z"
            fill="#fff"
          />
        </svg>
      </div>
    </header>
  );
};
