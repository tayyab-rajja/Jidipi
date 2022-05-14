import styles from "./Form.module.scss";
import clsx from "clsx";
import { CompanyAdd } from "types/companyInfoTypes";
import LogoContainerDesktop from "./LogoContainerDesktop";
import LogoContainerTablet from "./LogoContainerTablet";
import InputContainer from "./InputContainer";
import CountrySelect from "./CountrySelect";
import GroupsSelect from "./GroupsSelect";
import SocialMediaForm from "./SocialMediaForm";
import { ICountry } from "types/country";
interface IProps {
    handleChange: (prop: string, value: string) => void;
    company: CompanyAdd;
    countries: ICountry[];
}

const inputContainer: any = {
    Component: InputContainer,
    classes: [styles["mr-8"]],
    prop: "companyName",
    placeholder: "Semi",
    type: "input",
};

export default function Form({ handleChange, company, countries }: IProps) {
    const handleComponent = () => {
        const { Component, classes, prop, placeholder } = inputContainer;
        return (
            <Component
                classes={classes}
                prop={prop}
                handleChange={handleChange}
                value={company[prop]}
                placeholder={placeholder}
            />
        );
    };

    return (
        <div
            className={clsx(styles["tab-content"], clsx("tab-content"))}
            id="myTabContent"
        >
            <div
                className={clsx(
                    "fade",
                    "show",
                    "active",
                    "tab-pane",
                    styles["profile-tab"]
                )}
                role="tabpanel"
                aria-labelledby="profile-tab"
            >
                <div className={styles["profile-form-expanded"]}>
                    <div
                        className={clsx(
                            styles["form-title"],
                            "d-flex",
                            "justify-content-center"
                        )}
                    >
                        BASIC PROFILE
                    </div>
                    <div className={styles["profile-container"]}>
                        <div
                            className={clsx("d-flex", styles["basic-profile"])}
                        >
                            <LogoContainerTablet
                                company={company}
                                handleChange={handleChange}
                            />

                            <LogoContainerDesktop
                                company={company}
                                handleChange={handleChange}
                            />

                            {handleComponent()}
                            <div
                                className={clsx(
                                    styles["input-container"],
                                    "mb-3",
                                    styles["ml-8"]
                                )}
                            >
                                <input
                                    type="text"
                                    className={styles["custom-input"]}
                                    placeholder="Fax"
                                />
                            </div>
                            <div
                                className={clsx(
                                    styles["input-container"],
                                    "mb-3",
                                    styles["mr-8"]
                                )}
                            >
                                <input
                                    type="text"
                                    className={styles["custom-input"]}
                                    placeholder="Company"
                                />
                            </div>
                            <CountrySelect countries={countries} />
                            <div
                                className={clsx(
                                    styles["input-container"],
                                    "mb-3",
                                    styles["mr-8"]
                                )}
                            >
                                <input
                                    type="text"
                                    className={styles["custom-input"]}
                                    placeholder="Address"
                                />
                            </div>
                            <div
                                className={clsx(
                                    styles["input-container"],
                                    "mb-3",
                                    styles["ml-8"]
                                )}
                            >
                                <input
                                    type="text"
                                    className={styles["custom-input"]}
                                    placeholder="Google Map"
                                />
                            </div>
                        </div>
                        <GroupsSelect />
                    </div>
                    <SocialMediaForm
                        handleChange={handleChange}
                        company={company}
                    />
                </div>
            </div>
        </div>
    );
}
