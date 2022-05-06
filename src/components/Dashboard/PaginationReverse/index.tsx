/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import NextIcon from "public/images/pagination/next.svg";
import PrevIcon from "public/images/pagination/last.svg";
import { DebounceInput } from "react-debounce-input";
import styles from "./PaginationReverse.module.scss";
import clsx from "clsx";
import Image from "next/image";
const Pagination = ({
    size,
    page,
    step,
    className,
    sequel,
    onChange,
    showAll,
}: any) => {
    const [data, setData] = useState({
        size: size || 100,
        page: page || 1,
        step: step || 1,
    });
    const [displayInput, setDisplayInput] = useState(false);
    useEffect(() => {
        setData({
            size: size || 1,
            page: page || 1,
            step: step || 1,
        });
    }, [size, page, step]);
    const firstPage = () => (
        <>
            <li className={`${sequel ? styles["page-item"] : ""}`}>
                <a
                    onClick={(e) => {
                        e.preventDefault();
                        setPage(data.size);
                    }}
                    href="#a"
                    className={`${sequel ? styles["item-link"] : ""}`}
                >
                    {data.size}
                </a>
            </li>
            <li className={`${sequel ? styles["page-item"] : ""}`}>
                {displayInput ? (
                    <DebounceInput
                        minLength={1}
                        type="number"
                        debounceTimeout={250}
                        onKeyPress={(e: any) => {
                            if (e.key === "Enter") {
                                let pageNumber = parseInt(e.target.value, 10);
                                if (pageNumber > size) {
                                    pageNumber = size;
                                }
                                setPage(pageNumber);
                                setDisplayInput(false);
                            }
                        }}
                    />
                ) : (
                    <i aria-hidden onClick={() => setDisplayInput(true)}>
                        ...
                    </i>
                )}
            </li>
        </>
    );
    const getPages = (s: any, f: any) => {
        const list = [];

        for (let i = f; i >= s; i -= 1) {
            list.push(i);
        }

        return list.map((singlePage) => (
            <li
                className={`${sequel ? styles["page-item"] : ""} ${
                    singlePage === data.page ? styles["active"] : ""
                }`}
                key={singlePage}
            >
                <a
                    onClick={(e) => {
                        e.preventDefault();
                        setPage(singlePage);
                    }}
                    href="#test"
                    className={`${sequel ? styles["item-link"] : ""}`}
                >
                    {singlePage}
                </a>
            </li>
        ));
    };

    const lastPage = () => (
        <>
            <li className={`${sequel ? styles["page-item"] : ""}`}>
                {sequel ? (
                    <a>
                        {displayInput ? (
                            <DebounceInput
                                minLength={1}
                                type="number"
                                debounceTimeout={250}
                                onKeyPress={(e: any) => {
                                    if (e.key === "Enter") {
                                        let pageNumber = parseInt(
                                            e.target.value,
                                            10
                                        );
                                        if (pageNumber > size) {
                                            pageNumber = size;
                                        }
                                        setPage(pageNumber);
                                        setDisplayInput(false);
                                    }
                                }}
                            />
                        ) : (
                            <i
                                aria-hidden
                                onClick={() => setDisplayInput(true)}
                            >
                                ...
                            </i>
                        )}
                    </a>
                ) : (
                    <>
                        {displayInput ? (
                            <DebounceInput
                                minLength={1}
                                type="number"
                                debounceTimeout={250}
                                onKeyPress={(e: any) => {
                                    if (e.key === "Enter") {
                                        let pageNumber = parseInt(
                                            e.target.value,
                                            10
                                        );
                                        if (pageNumber > size) {
                                            pageNumber = size;
                                        }
                                        setPage(pageNumber);
                                        setDisplayInput(false);
                                    }
                                }}
                            />
                        ) : (
                            <i
                                aria-hidden
                                onClick={() => setDisplayInput(true)}
                            >
                                ...
                            </i>
                        )}
                    </>
                )}
            </li>
            <li className={`${sequel ? styles["page-item"] : ""}`}>
                <a
                    href="#test"
                    onClick={(e) => {
                        e.preventDefault();
                        setPage(1);
                    }}
                    className={styles["item-link"]}
                >
                    {1}
                </a>
            </li>
        </>
    );

    const setPage = (newPage: any) => {
        // if (newPage === data.page) return;

        const newData = { ...data };
        newData.page = newPage;
        setData(newData);
        onChange(newPage);
    };

    const render = () => {
        if (showAll !== undefined && showAll === true) {
            return getPages(1, data.size);
        }
        if (data.size < data.step * 2 + 4) {
            return getPages(1, data.size);
        }
        if (data.page < data.step * 2 + 1) {
            return (
                <>
                    {firstPage()} {getPages(1, data.step * 2 + 3)}
                </>
            );
        }
        if (data.page > data.size - data.step * 2) {
            return (
                <>
                    {getPages(data.size - data.step * 2 - 2, data.size)}
                    {lastPage()}
                </>
            );
        }
        return (
            <>
                {firstPage()}
                {getPages(data.page - data.step, data.page + data.step)}
                {lastPage()}
            </>
        );
    };

    const next = () => {
        if (data.page === 1) return;
        setPage(data.page - 1);
    };

    const prev = () => {
        if (data.page === data.size) return;
        setPage(data.page + 1);
    };

    if (showAll !== undefined && showAll === true) {
        return <ul className={styles["show-all"]}>{render()}</ul>;
    }
    // const listStyles = className && className.split(' ').forEach({})
    return (
        <ul className={`${className || ""}`}>
            {sequel ? (
                <li className={clsx(styles["page-item"], styles["next-page"])}>
                    <a
                        href="#d"
                        className={styles["item-link"]}
                        onClick={(e) => {
                            e.preventDefault();
                            prev();
                        }}
                    >
                        <Image alt="" src={PrevIcon} />
                    </a>
                </li>
            ) : (
                <span aria-hidden onClick={prev}>
                    <Image alt="" src={PrevIcon} />
                </span>
            )}
            {render()}

            {sequel ? (
                <li className={clsx(styles["page-item"], styles["prev-page"])}>
                    <a
                        href="#test"
                        className={styles["item-link"]}
                        onClick={(e) => {
                            e.preventDefault();
                            next();
                        }}
                    >
                        <Image alt="" src={NextIcon} />
                    </a>
                </li>
            ) : (
                <span aria-hidden onClick={next}>
                    <Image alt="" src={NextIcon} />
                </span>
            )}
        </ul>
    );
};

export default Pagination;
