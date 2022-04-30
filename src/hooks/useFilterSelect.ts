import { useRef, useState } from "react";
import useClickOutside from "src/hooks/useClickOutside";

type selectState = "normal" | "opened" | "selected";

export default function<IItem> () {
    const select = useRef(null);
    useClickOutside(select, () => {
        setSelectState((value) => {
            if (value === "opened") {
                setSelectedItem(null);
                return "normal";
            }
            return value;
        });
    });

    const [selectedItem, setSelectedItem] = useState<IItem | null>(null);
    const [selectState, setSelectState] = useState<selectState>("normal");

    const handleChange = (item: IItem) => {
        setSelectedItem(item);
        setSelectState("selected");
    };

    const removeSelectedItem = () => {
        setSelectedItem(null);
        setSelectState("normal");
    };

    return {
        selectedItem,
        selectState,
        setSelectState,
        select,
        handleChange,
        removeSelectedItem
    }
}