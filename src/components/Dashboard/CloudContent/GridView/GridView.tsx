import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "src/components/Dashboard/CloudContent/GridView/gridview.module.css";
import img from "public/dashboard/cloud/images/jpg-file.png";
import pdfIcon from "public/dashboard/cloud/images/pdf-icon.png";
import { GET } from "src/lib/common/api";
import axios from "axios";
function GridView(props: any) {
  const [GallaryData, setGallaryData] = useState<any[]>([]);
  useEffect(() => {
    const res = GET(`/company/${props.galleryid}/Gallery`);
    res.then((res) => {
      console.log("data ", res);
      setGallaryData(res.folders);
    });
  }, [props.Postid, props.galleryid]);

  return (
    <>
      <div className={styles["Grid-view"]}>
        {GallaryData.map((item) => (
          <div className={styles["grid-box"]} key={item._id}>
            <div>
              <Image src={item.liveURL} width={250} height={250} alt="" />
            </div>
            <div className={styles["icn-name"]}>
              <Image src={img} alt="" />
              <span className={styles["file-name"]}> {item.name}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default GridView;
