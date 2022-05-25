export const reactSelectStyle = ({
    hide,
    width,
    size,
    background,
    color,
    maxHeight = 140,
}: any) => ({
    container: (base: any) => ({
        ...base,
        width: width || "100%",
    }),
    control: () => ({
        display: "flex",
        borderRadius: 0,
        border: "none",
        backgroundColor: background || undefined,
        color: color || undefined,
        minHeight: 50,
        borderLeft: "1px solid #d6d6d6",
    }),
    dropdownIndicator: (base: any) => ({
        ...base,
        paddingTop: size === "large" ? 12 : 10,
        display: hide ? "none" : "flex",
    }),
    indicatorSeparator: () => ({
        display: "none",
    }),
    valueContainer: (base: any) => ({
        ...base,
        height: 50,
        position: "relative",
    }),
    singleValue: (base: any) => ({
        ...base,
        color: color || undefined,
        textTransform: "capitalize",
    }),
    menuList: (base: any) => ({
        ...base,
        textAlign: "left",
        textTransform: "capitalize",
        maxHeight: maxHeight,
    }),
    input: (base: any) => ({
        ...base,
        height: 20,
        padding: 0,
        marginTop: -10,
    }),
    menu: (base: any) => ({ ...base, zIndex: 9999 }),
});
