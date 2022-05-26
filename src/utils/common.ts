export const formatFileSize = (bytes: any, decimalPoint?: any) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1000,
        dm = decimalPoint || 2,
        sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
        i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

export const generatePassword = () => {
    const length = 10;
    const charset =
        "abcdefghijklmnopqrstuvwxyz#@ABC*!KLMNOPQRSTUVWXYZ0123456789";
    let retVal = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
};
