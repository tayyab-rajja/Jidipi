import Link from "next/link";

import styles from "./Navbar.module.css";

export const Navbar = () => {
  return (
    <header className={styles["Navbar"]}>
      <h1 className={styles["Navbar-Title"]}>jidipi</h1>
      <nav className={styles["Navbar-Menu"]}>
        <ul>
          <li>
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
      <div className={styles["Navbar-User"]}></div>
    </header>
  );
};
