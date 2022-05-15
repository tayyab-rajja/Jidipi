import styles from "./Form.module.scss";
import Image from "next/image";
import clsx from "clsx";
import Arrow from "public/images/icons/arrow.svg";
import Search from "public/images/icons/search.svg";
import Star from "public/images/icons/star.svg";
import StarActive from "public/images/icons/star-active.svg";
import { ICountry } from "types/country";
import { useEffect, useRef, useState } from "react";
import useClickOutside from "src/hooks/useClickOutside";
import { useExpanded } from "react-table";
import { PUT } from "src/lib/common/api";

interface IProps {
    countries: ICountry[];
}

export default function CountrySelect({ countries }: IProps) {
    const countrySelectRef = useRef(null);
    const [filterCountries, setFilterCountries] = useState(countries);
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
    useClickOutside(countrySelectRef, () => setIsOpen(false));

    const handleFavorite = (country: ICountry) => {
        const sortedCountries = [...filterCountries]
            .map((c) =>
                c._id === country._id ? { ...c, isFavorite: !c.isFavorite } : c
            )
            .sort((a: any, b: any) => b.isFavorite - a.isFavorite);

        setFilterCountries(sortedCountries);
        PUT("/category", [
            { _id: country._id, isFavorite: !country.isFavorite },
        ]);
    };

    useEffect(() => {
        const filteredCountries = countries
            .filter(
                (c: ICountry) =>
                    c.title.toLowerCase().indexOf(search.toLowerCase()) > -1
            )
            .sort((a: any, b: any) => b.isFavorite - a.isFavorite);
        setFilterCountries(filteredCountries);
    }, [search, countries]);

    const handleSelectedCountry = (country: ICountry) => {
        setSelectedCountry(country.title);
        setIsOpen(false);
    };

    return (
        <div
            className={clsx(styles["input-container"], "mb-3", styles["ml-8"])}
            ref={countrySelectRef}
        >
            <div className={styles["filter-item"]}>
                <div className={styles["select-group"]}>
                    <div
                        className={clsx(
                            styles["select-btn"],
                            styles["border-dashed"]
                        )}
                    >
                        <div
                            className={styles["content"]}
                            onClick={() => {
                                setIsOpen((value) => !value);
                            }}
                        >
                            <h3 className={styles["label"]}>
                                {selectedCountry ?? "Country"}
                            </h3>
                            <Image src={Arrow} alt="arrow" />
                        </div>
                        <div className={styles["selected-item"]}></div>
                    </div>

                    <div
                        className={clsx(
                            styles["select-content"],
                            isOpen && styles["open"]
                        )}
                        id="countries"
                    >
                        <div
                            className={clsx(
                                styles["search-container"],
                                styles["bg-grey"]
                            )}
                        >
                            <input
                                type="text"
                                className={styles["border-grey"]}
                                placeholder="Search"
                                value={search}
                                onChange={(event) =>
                                    setSearch(event.target.value)
                                }
                            />
                            <img
                                className={styles["search-icon"]}
                                src="/images/icons/search.svg"
                                alt="search icon"
                            />
                        </div>
                        <div>
                            <div>
                                {filterCountries.map((country) => {
                                    return (
                                        <div
                                            key={country._id}
                                            className={clsx(
                                                styles["item"],
                                                styles["bg-grey"]
                                            )}
                                            onClick={() =>
                                                handleSelectedCountry(country)
                                            }
                                        >
                                            <div
                                                className={styles["rating"]}
                                                onClick={() =>
                                                    handleFavorite(country)
                                                }
                                            >
                                                <Image
                                                    src={
                                                        country.isFavorite
                                                            ? Star
                                                            : StarActive
                                                    }
                                                    alt="star"
                                                ></Image>
                                            </div>
                                            <div className={styles["flag"]}>
                                                <Image
                                                    src={country.avatar}
                                                    alt={country.title}
                                                    width={20}
                                                    height={20}
                                                ></Image>
                                            </div>
                                            <div
                                                className={styles["short-name"]}
                                            >
                                                AM
                                            </div>
                                            <div className={styles["name"]}>
                                                {country.title}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
