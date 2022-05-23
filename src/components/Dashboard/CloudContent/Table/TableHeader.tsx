import React, { useState, useEffect, useCallback, useContext } from "react";
import styles from "src/components/Dashboard/CloudContent/CloudContent.module.css";
// import Form from "react-bootstrap/Form";
import Image from "next/image";
import ArrowUp from "public/dashboard/cloud/images/arrow-up.png";
import ArrowDown from "public/dashboard/cloud/images/arrow-down.png";
  //unconnected headers
  const unconnectedHeaders = [
    {
      arrowup: ArrowUp,
      name: "NAME",
      arrowdown: ArrowDown,
    },
    {
      arrowup: ArrowUp,
      name: "CREATOR",
      arrowdown: ArrowDown,
    },
    {
      arrowup: ArrowUp,
      name: "MODIFIED",
      arrowdown: ArrowDown,
    },
    {
      arrowup: ArrowUp,
      name: "VOLUMEN",
      arrowdown: ArrowDown,
    },
    {
      arrowup: ArrowUp,
      name: "PAGE",
      arrowdown: ArrowDown,
    },
    {
      arrowup: ArrowUp,
      name: "STATUS",
      arrowdown: ArrowDown,
    },
  ];
  const postHeaders = [
    {
      arrowup: ArrowUp,
      name: "Name",
      arrowdown: ArrowDown,
    },
    {
      arrowup: ArrowUp,
      name: "CREATOR",
      arrowdown: ArrowDown,
    },
    {
      arrowup: ArrowUp,
      name: "MODIFIED",
      arrowdown: ArrowDown,
    },
    {
      arrowup: ArrowUp,
      name: "VOLUMEN",
      arrowdown: ArrowDown,
    },
    {
      arrowup: ArrowUp,
      name: "URL",
      arrowdown: ArrowDown,
    },
  ];
function TableHeader(props: any) {
  const [headers, setHeaders] = useState<any[]>([]);

  useEffect(() => {
    if (props.type === false) {
      setHeaders(unconnectedHeaders);
    } else if (props.type === true) {
      setHeaders(postHeaders);
    }
  }, [props.type]);

  return (
    <thead>
      <tr className={styles["table-row"]}>
        {headers.map((item, index) => (
          <th className={styles[item[0] ? "name-width" : ""]} key={index}>
            <div className={styles[item[0] ? "txt-bx-name" : "txt-bx"]}>
              <Image
                src={item.arrowup}
                alt=""
                className={styles["ar-up s-arrow"]}
              />
              <div className={styles["table-head-font"]}>{item.name}</div>
              <Image
                src={item.arrowdown}
                alt=""
                className={styles["ar-up s-arrow"]}
              />
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default TableHeader;
