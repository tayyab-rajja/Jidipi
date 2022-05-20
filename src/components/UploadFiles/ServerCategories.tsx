import React, { useState, useEffect } from "react";
import { getUserLogos } from "src/utils/fetch";

import LinkIcon from "public/images/icons/link.svg";
import ImageIcon from "public/images/icons/image-black.svg";
import DownloadIcon from "public/images/icons/download.svg";
import DeleteIcon from "public/images/icons/trash.svg";
import styles from "./style.module.scss";
import clsx from "clsx";
import Image from "next/image";

const ServerCategories = ({
    filter,
    onSelectLogo,
    searchKey,
    userDetails,
    type,
    typeKey,
}: any) => {
    const [logoList, setLogoList] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const getLogos = async () => {
        setLoaded(false);
        const logos = await getUserLogos({
            authToken: userDetails.authToken,
            searchKey,
        });
        setLogoList(logos);
        setLoaded(true);
    };
    useEffect(() => {
        getLogos();
    }, [searchKey]);
    const selectedLogos = () => {
        if (filter === 2)
            return logoList.filter((f: any) => f[typeKey]?.length === 0);
        if (filter === 3)
            return logoList.filter((f: any) => f[typeKey]?.length > 0);
        return logoList;
    };

    // if (logoList.length === 0 && !loaded) return <LoadingIndicator />;
    if (logoList.length === 0)
        return (
            <div
                className={`${
                    (styles["gallery-section"],
                    "p-4",
                    styles[`${type}-gallery`])
                }`}
            >
                Logos not found!
            </div>
        );

    return (
        <div
            className={`${styles["gallery-section"]} p-4 ${
                styles[`${type}-gallery`]
            }`}
        >
            <ul className="p-0 w-100">
                {selectedLogos().map((logo: any) => (
                    <li key={logo._id}>
                        <div className={styles["gallery-items"]}>
                            <div className={styles["img-gallery"]}>
                                <img
                                    src={`${logo.liveURL}`}
                                    alt=""
                                    className={`${
                                        logo[typeKey]?.length > 0
                                            ? styles["active"]
                                            : ""
                                    }`}
                                />
                                {logo[typeKey]?.length > 0 && (
                                    <div className={styles["corner"]}>
                                        <span>{logo[typeKey]?.length}</span>
                                    </div>
                                )}
                            </div>
                            <p>{logo.name}</p>

                            <div
                                className={clsx(
                                    styles["hover-icon"],
                                    "rounded"
                                )}
                            >
                                <div
                                    className={clsx(
                                        styles["link-logo"],
                                        "text-center",
                                        "d-flex",
                                        "flex-wrap",
                                        "justify-content-around"
                                    )}
                                >
                                    <a
                                        href="#test"
                                        onClick={(e) => {
                                            e.preventDefault();
                                        }}
                                    >
                                        <Image src={DeleteIcon} />
                                        {/* <DeleteIcon /> */}
                                    </a>
                                    <a href={`${logo.liveURL}`} target="_blank" rel="noreferrer">
                                        <Image src={LinkIcon} />

                                        {/* <LinkIcon /> */}
                                    </a>
                                    <a href="#test">
                                        <Image src={DownloadIcon} />
                                        {/* <DownloadIcon /> */}
                                    </a>
                                    <a
                                        href="#test"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            onSelectLogo(logo);
                                        }}
                                    >
                                        <Image src={ImageIcon} />

                                        {/* <ImageIcon /> */}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ServerCategories;
