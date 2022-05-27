import React, {useState} from "react";
import {Document, Page, pdfjs,} from 'react-pdf';
import styles from "../pdf.module.scss";
import {GetServerSideProps} from "next";
import {GET} from "../../../lib/common/api";
import Script from "next/script";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
import Image from "next/image";
import ArrowLeft from '/public/dashboard/images/icons/angle-left.svg';
import ArrowRight from '/public/dashboard/images/icons/angle-right.svg';

export default function Pdf(props: any) {
    const [numPages, setNumPages] = useState(1);
    const [pageNumber, setPageNumber] = useState(1);

    const [file, setFile] = useState(props.file ? props.file.liveURL:'');

    function onDocumentLoadSuccess({numPages}: any) {
        console.log('onDocumentLoadSuccess', numPages);
        setNumPages(numPages);
    }

    return (
        <div id="pdf" className={styles.pdf}>
            <Script src="/pdf.js" strategy="lazyOnload"
                    onLoad={() =>
                        console.log(`script loaded correctly, window.FB has been populated`)
                    }
            />
            <Document file={file}
                      onLoadSuccess={onDocumentLoadSuccess}>
                <div className={`  ${styles['page']} page`}>
                    <Page pageNumber={pageNumber} renderTextLayer={false}/>
                </div>
                <div className={`  ${styles['page']} page`}>
                    {(pageNumber + 1) <= numPages && <Page pageNumber={pageNumber + 1} renderTextLayer={false}/>}
                </div>
            </Document>
            <div id="pdf-controller" className={`  ${styles['pager']} `}>
                <div className={styles.pagination}>
                    <a onClick={() => {
                        if (pageNumber - 2 > 0) {
                            setPageNumber(pageNumber - 2)
                        }
                    }} href="#">
                        <span><Image src={ArrowLeft}/></span>
                    </a>
                    <div>
                        <input className={styles.search} type="text"></input>
                    </div>
                    <span> {pageNumber}</span> {pageNumber + 1 <= numPages ? "-" + (pageNumber + 1) : ''}
                    <span>/</span> {numPages}
                    <a onClick={() => {
                        if (pageNumber + 2 <= numPages) {
                            setPageNumber(pageNumber + 2)
                        }
                    }} href="#">
                        <span><Image src={ArrowRight}/></span>
                    </a>
                </div>
                <div className={styles['fullscreen-container']}>
                    <a id="fullscreen">X</a>
                </div>
            </div>
        </div>
    );
};

/**
 * Get server side props
 * Load require data from API.
 * @param context
 */
export const getServerSideProps: GetServerSideProps = async (context) => {
    const id = context && context.query && context.query.id;
    const name = context && context.query && context.query.name;
    //TODO check if user is logged in
    let props = {};
    try {
        const file = await GET("/file/" + id);
        if (file.success) {
            props = {
                ...props,
                file: file.file
            }
        }
    } catch (e) {
        console.log(e)
    }
    return {
        props: props,
    };
}