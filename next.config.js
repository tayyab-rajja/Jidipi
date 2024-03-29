const { i18n } = require("./next-i18next.config");

const nextConfig = {
    reactStrictMode: true,
    i18n,
    images: {
        domains: [
            "upload.jidipi.com",
            "lh3.googleusercontent.com",
            "jidipi.com",
            "via.placeholder.com",
        ],
    },
};

module.exports = nextConfig;
