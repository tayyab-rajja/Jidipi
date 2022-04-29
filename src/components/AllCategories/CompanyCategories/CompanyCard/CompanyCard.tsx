import { FC } from "react";
import Image from "next/image";
import { ICompany } from "types/categoryTypes";

import styles from "./CompanyCard.module.css";

interface Props {
    company: ICompany,
}

const emptyImage =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAM8AAAD0CAMAAAAL4oIDAAAAOVBMVEXAwMD///+7u7vJycnu7u7Pz8/7+/v19fXS0tK+vr7x8fG6urrd3d34+PjCwsLGxsbl5eXY2Njo6OhvnUvPAAABN0lEQVR4nO3Yy46CMABAUeRd3vj/HzuIksxMlMTNmHbO2SB00xvSBptlAAAAAAAAAAAAAAAAAAAAAAAAAAAAwN8J+blPz+9NYShPddOnZ/ieUF7OxdczVK/VEfa0L5dQ6KPsya/NU+Ocx9nTvFg7Rcw99dAuCfXUcwh5m07PELa7fEymZ917umR6yv3L5t4xJtBzWUI/3Te6bqoT6Nm2hMdrWfMliZ7DHOY6oZ4lz8KSUM+8PS7qZHr2jTsrk+hpyqHYc7Iq/p5xKLIQjoEu9p7rFL4PrLeeSP//bD31Gn4OTF3MPdc5/B5Z61h7QlU9GZmqdopy/VT9cVzwuNzcfvR5lO9nbJpu03RluV2Oc7f7EUKM51XnIuvJ5uLcp+cHAAAAAAAAAAAAAAAAAAAAAAAAAAAA/8cXFZgNlyZfDNsAAAAASUVORK5CYII=";

export const CompanyCard: FC<Props> = ({company}) => {

    const {count, title, logoId} = company;

    return (
        <div className={styles["CompanyCard-Container"]}>
            <div className={styles["CompanyCard-ImageContainer"]}>
                <img className={styles["CompanyCard-Image"]} src={logoId?.liveURL || emptyImage} alt={`${title}`}/>
            </div>
            <div className={styles["CompanyCard-TextContainer"]}>
                <span className={styles["CompanyCard-Text_Title"]}>{title}</span>
                <span>({count})</span>
            </div>
        </div>
    )
}