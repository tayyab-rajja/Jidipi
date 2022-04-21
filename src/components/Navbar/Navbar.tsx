import Link from "next/link";
import { useState, useEffect } from "react";

import { usePageFolders } from "src/api/usePageFolders";

import { PageFolder } from "types/pageFolderType";

import styles from "./Navbar.module.css";
import SidebarLoginRegister from "src/components/SidebarLoginRegister";
import SidebarSettingAccount from "src/components/SidebarSettingAccount";

import { SideBarProvider } from "src/providers/SidebarProvider/SidebarProvider";
import clsx from "clsx";
import { useRouter } from "next/router";

import PanelDropdown from "src/components/PanelDropdown";

import { usePutUserData } from "src/api/usePutUserData";

import Cookies from "js-cookie";

const deleteAllCookies = () => {
  const names = Object.keys(Cookies.get());

  names.map((name) => Cookies.remove(name));
};

interface Props {
  pageFolders: PageFolder[];
}

export const Navbar = () => {
  const [userAuthorized, setUserAuthorized] = useState(false);

  const [showLoginBar, setShowLoginBar] = useState(false);
  const { query } = useRouter();

  const [showSetting, setShowSetting] = useState(false);

  const { data: pageFolders } = usePageFolders();

  const navBarItems = pageFolders?.filter(
    (pageFolder) =>
      pageFolder.pageType === "PROJECT" || pageFolder.pageType === "PRODUCT"
  );

  const { data: serverData } = usePutUserData();

  const closePanel = (e: any) => {
    if (e.clientY > 165 || document.body.clientWidth - e.clientX > 90) {
      setShowLoginBar(false);
      removeClosePanel();
    }
  };

  const removeClosePanel = () => {
    document.removeEventListener("mousemove", closePanel);
  };

  useEffect(() => {
    if (serverData) setUserAuthorized(true);
  }, [serverData]);

  return (
    <>
      <header className={styles["Navbar"]}>
        <h1 className={styles["Navbar-Title"]}>jidipi</h1>
        <nav className={styles["Navbar-Menu"]}>
          {navBarItems && (
            <ul>
              {navBarItems.map((item) => {
                return (
                  <li
                    key={item._id}
                    className={clsx(
                      query.folder === item.subDomain &&
                        styles["Navbar-ActiveTab"]
                    )}
                  >
                    <Link href={`/${item.subDomain}`}>
                      <a>{item.title}</a>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </nav>
        <div
          className={styles["Navbar-User"]}
          onClick={() => {
            setShowLoginBar((prev) => !prev);

            if (userAuthorized) {
              document.addEventListener("mousemove", closePanel);
            }
          }}
        >
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
      {userAuthorized ? (
        <PanelDropdown
          isOpen={showLoginBar}
          setShowLoginBar={setShowLoginBar}
          setShowSetting={setShowSetting}
          logOut={() => {
            deleteAllCookies();
            setUserAuthorized(false);
          }}
        />
      ) : (
        <SideBarProvider
          isOpen={showLoginBar}
          close={() => setShowLoginBar(false)}
        >
          <SidebarLoginRegister />
        </SideBarProvider>
      )}

      {showSetting && (
        <SideBarProvider
          isOpen={showSetting}
          close={() => setShowSetting(false)}
        >
          <SidebarSettingAccount />
        </SideBarProvider>
      )}
    </>
  );
};
