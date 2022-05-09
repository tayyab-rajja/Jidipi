import moment from "moment-timezone";

export function switchTimeZoneYMD(t: string) {
    return moment.tz(t, "Europe/Berlin").format("YYYY-MM-DD");
}
