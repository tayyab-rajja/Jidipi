import SocialMediaInput from "./SocialMediaInput";
import FacebookIcon from "public/images/icons/social/facebook.svg";
import InstagramIcon from "public/images/icons/social/instagram.svg";
import LinkedInIcon from "public/images/icons/social/linkedin.svg";
import PinterestIcon from "public/images/icons/social/pinterest.svg";
import BehanceIcon from "public/images/icons/social/behance.svg";
import TwitterIcon from "public/images/icons/social/twitter.svg";
import VimeoIcon from "public/images/icons/social/vimeo.svg";
import YoutubeIcon from "public/images/icons/social/youtube.svg";

export default {
    SocialMediaInputs: [
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
};