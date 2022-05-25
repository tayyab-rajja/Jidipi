import { useEffect } from "react";

let isDown = false;
let startX: number;
let scrollLeft: number;

const useScrollable = (sliderRef: any) => {
    const mousedown = (e: any) => {
        if (
            e.target.className &&
            typeof e.target.className.indexOf === "function" &&
            e.target.className.indexOf("prevent") > -1
        )
            return;

        isDown = true;
        sliderRef.current.classList.add("active");
        startX = e.pageX - sliderRef.current.offsetLeft;
        scrollLeft = sliderRef.current.scrollLeft;
    };

    const mouseLeave = () => {
        isDown = false;
        sliderRef.current.classList.remove("active");
    };

    const mouseUp = () => {
        isDown = false;
        sliderRef.current.classList.remove("active");
    };

    const mouseMove = (e: any) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - sliderRef.current.offsetLeft;
        const walk = (x - startX) * 3;
        sliderRef.current.scrollLeft = scrollLeft - walk;
    };

    const enableDrag = () => {
        sliderRef.current.addEventListener("mousedown", mousedown);
        sliderRef.current.addEventListener("mouseleave", mouseLeave);
        sliderRef.current.addEventListener("mouseup", mouseUp);
        sliderRef.current.addEventListener("mousemove", mouseMove);
        scrollEnd();
    };

    const scrollEnd = () => {
        if (!sliderRef.current || sliderRef.current.querySelector("#cat-table"))
            return;

        sliderRef.current.scrollLeft = sliderRef.current.scrollWidth;
    };

    useEffect(() => {
        window.addEventListener("resize", scrollEnd);
        return () => {
            window.removeEventListener("resize", scrollEnd);
            if (sliderRef.current) {
                sliderRef.current.removeEventListener("mousedown", mousedown);
                sliderRef.current.removeEventListener("mouseleave", mouseLeave);
                sliderRef.current.removeEventListener("mouseup", mouseUp);
                sliderRef.current.removeEventListener("mousemove", mouseMove);
            }
        };
    }, []);

    useEffect(() => {
        if (sliderRef.current) {
            enableDrag();
        }
    }, [sliderRef.current]);
};

export default useScrollable;
