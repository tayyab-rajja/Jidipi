import SocialMediaInput from "./SocialMediaInput";
import InputContainer from "./InputContainer";
import FacebookIcon from "public/images/icons/social/facebook.svg";
import InstagramIcon from "public/images/icons/social/instagram.svg";
import LinkedInIcon from "public/images/icons/social/linkedin.svg";
import PinterestIcon from "public/images/icons/social/pinterest.svg";
import BehanceIcon from "public/images/icons/social/behance.svg";
import TwitterIcon from "public/images/icons/social/twitter.svg";
import VimeoIcon from "public/images/icons/social/vimeo.svg";
import YoutubeIcon from "public/images/icons/social/youtube.svg";
import CountrySelect from "./CountrySelect";
import styles from "./Form.module.scss";
import GroupSelect from "./GroupsSelect";

export default {
    socialMediaInputs: [
        {
            id: 1,
            Component: SocialMediaInput,
            prop: "facebookLink",
            placeholder: "Facebook",
            type: "input",
            icon: FacebookIcon,
        },
        {
            id: 2,
            Component: SocialMediaInput,
            prop: "twitterLink",
            placeholder: "Twitter",
            type: "input",
            icon: TwitterIcon,
        },
        {
            id: 3,
            Component: SocialMediaInput,
            prop: "instagramLink",
            placeholder: "Instagram",
            type: "input",
            icon: InstagramIcon,
        },
        {
            id: 4,
            Component: SocialMediaInput,
            prop: "pininterestLink",
            placeholder: "Pininterest",
            type: "input",
            icon: PinterestIcon,
        },
        {
            id: 5,
            Component: SocialMediaInput,
            prop: "youtubeLink",
            placeholder: "Youtube",
            type: "input",
            icon: YoutubeIcon,
        },
        {
            id: 6,
            Component: SocialMediaInput,
            prop: "vimeoLink",
            placeholder: "Vimeo",
            type: "input",
            icon: VimeoIcon,
        },
        {
            id: 7,
            Component: SocialMediaInput,
            prop: "linkedLink",
            placeholder: "LinkedIn",
            type: "input",
            icon: LinkedInIcon,
        },
        {
            id: 8,
            Component: SocialMediaInput,
            prop: "behancLink",
            placeholder: "Behance",
            type: "input",
            icon: BehanceIcon,
        },
    ],
    basicProfile: [
        {
            id: 1,
            Component: InputContainer,
            prop: "telephone",
            placeholder: "Telephone",
            type: "input",
            classes: [styles["mr-8"], "mb-3"],
        },
        {
            id: 2,
            Component: InputContainer,
            prop: "fax",
            placeholder: "Fax",
            type: "input",
            classes: [styles["ml-8"], "mb-3"],
        },
        {
            id: 3,
            Component: InputContainer,
            prop: "companyName",
            placeholder: "Company",
            type: "input",
            classes: [styles["mr-8"], "mb-3"],
        },
        {
            id: 4,
            Component: CountrySelect,
            prop: "country",
            placeholder: "Country",
            type: "select",
            classes: [styles["ml-8"], "mb-3"],
        },
        {
            id: 5,
            Component: InputContainer,
            prop: "address",
            placeholder: "Address",
            type: "input",
            classes: [styles["mr-8"], "mb-3"],
        },
        {
            id: 6,
            Component: InputContainer,
            prop: "googleMapLink",
            placeholder: "Google Map",
            type: "input",
            classes: [styles["ml-8"], "mb-3"],
        },
        {
            id: 7,
            Component: GroupSelect,
            prop: "groups",
            placeholder: "Groups",
            type: "select",
            classes: [],
        },
    ],
};
