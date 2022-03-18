import clsx from "clsx";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import Link from "next/link";

import { categoriesSvg } from "constant/categoriesSvg";

import styles from "./Card.module.css";

interface CardProps {
  title: string;
  className?: string;
}

export const Card = ({ className, title }: CardProps) => {
  const { t } = useTranslation();

  const testData = [
    {
      title: "February 28, 2022",
      type: "DATE",
    },
    {
      title: "Switzerland",
      type: "LOCATION",
    },
    {
      title: "Houses",
      type: "CATEGORY",
    },
    {
      title: "2016",
      type: "YEAR",
    },
    {
      title: "Bauhaus",
      type: "STYLE",
    },
    {
      title: "ABCDEFG Architects",
      type: "ARCHITECTS",
    },
  ];

  return (
    <div className={clsx(styles.Card, className && className)}>
      <Image
        layout="responsive"
        width={500}
        height={500}
        src="data:image/jpeg;base64,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"
        alt="Card Img"
      />
      <h3 className={styles["Card-Title"]}>{t(title)}</h3>
      <ul className={styles["Card-Info"]}>
        {testData.map(({ type, title }, index) => (
          <li key={index}>
            <Link href="#">
              <a className={styles["Card-InfoText"]}>
                {categoriesSvg[type]}
                <span>{t(title)}</span>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

// 0: {_id: "622b13fec5a0700007fa2815", companies: [,…],…}
// categories: [{_id: "615c4af1f4d001957ed1473e", parentId: "615c4af1f4d001957ed14734", title: "Apartment Condo",…}]
// 0: {_id: "615c4af1f4d001957ed1473e", parentId: "615c4af1f4d001957ed14734", title: "Apartment Condo",…}
// parentId: "615c4af1f4d001957ed14734"
// title: "Apartment Condo"
// type: "CATEGORIES"
// uniqueId: "0309"
// _id: "615c4af1f4d001957ed1473e"
// colourCategories: []
// companies: [,…]
// 0: {_id: "615b1024899dd8828faf068e", brandName: "bark architects", companyName: "Bark Design Pty Ltd",…}
// avatar: "https://upload.jidipi.com/logo/company/5ci4l2-Bark-Design.jpg"
// brandName: "bark architects"
// companyName: "Bark Design Pty Ltd"
// _id: "615b1024899dd8828faf068e"
// companyId: {_id: "615ffdb339703a659a290212", brandName: "somdoon architects", companyName: "Somdoon Architects",…}
// avatar: "https://upload.jidipi.com/logo/company/77qrzr-Somdoon-Architects.jpg"
// brandName: "somdoon architects"
// companyName: "Somdoon Architects"
// country: "615afc95899dd8828faebe38"
// partnerId: "502-1ji"
// uniqueId: "lkl-3245"
// _id: "615ffdb339703a659a290212"
// designerCategories: []
// featuredImage: {_id: "622b14a9c5a0700007fa28c0",…}
// liveURL: "https://upload.jidipi.com/posts/622b13fec5a0700007fa2815-178-663-626/1bmrra-4774.jpg"
// name: "4774.jpg"
// sizes: ["https://upload.jidipi.com/posts/622b13fec5a0700007fa2815-178-663-626/1bmrra-4774--150x100.jpg",…]
// 0: "https://upload.jidipi.com/posts/622b13fec5a0700007fa2815-178-663-626/1bmrra-4774--150x100.jpg"
// 1: "https://upload.jidipi.com/posts/622b13fec5a0700007fa2815-178-663-626/1bmrra-4774--400x266.jpg"
// 2: "https://upload.jidipi.com/posts/622b13fec5a0700007fa2815-178-663-626/1bmrra-4774--1024x682.jpg"
// _id: "622b14a9c5a0700007fa28c0"
// functionCategories: []
// languageCategories: []
// locationCategories: [{_id: "615afc95899dd8828faebe38", parentId: "615afc95899dd8828faebde0", title: "Thailand",…}]
// 0: {_id: "615afc95899dd8828faebe38", parentId: "615afc95899dd8828faebde0", title: "Thailand",…}
// parentId: "615afc95899dd8828faebde0"
// title: "Thailand"
// type: "LOCATION"
// uniqueId: "0126"
// _id: "615afc95899dd8828faebe38"
// materialCategories: []
// metaDescription: ""
// metaKeywords: ""
// pageFolderId: "603ce60958c5c6279bc2ed96"
// postUniqueId: "j00051480"
// publicationCategories: []
// publishedDate: "2022-03-10T11:30:00.000Z"
// publisherCategories: []
// sinceCategories: []
// slug: "bangkok-tryp-residential-building"
// styleCategories: []
// title: "Bangkok TRYP Residential Building"
// typeCategories: []
// yearCategories: [,…]
// 0: {_id: "6187f83cbfe2455d019e209d", parentId: "6187f83cbfe2455d019e2091", title: "2016", type: "YEAR",…}
// parentId: "6187f83cbfe2455d019e2091"
// title: "2016"
// type: "YEAR"
// uniqueId: "1090"
// _id: "6187f83cbfe2455d019e209d"
// _id: "622b13fec5a0700007fa2815"
