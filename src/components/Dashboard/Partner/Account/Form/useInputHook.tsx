import { useRef, useState } from "react";

interface IProps {
    handleChange: (prop: string, value: string) => void;
    handleSave: (prop: string, value: string) => void;
    value: string;
    prop: string;
}

export default function useInputHook({
    handleChange,
    handleSave,
    value,
    prop,
}: IProps) {
    const [isActive, setIsActive] = useState(false);
    const valueRef = useRef(value);
    const inputChange = (event: any) => {
        const newValue = event.target.value;
        if (valueRef.current !== newValue) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
        handleChange(prop, newValue);
    };

    const updateClickHandler = () => {
        setIsActive(false);
        valueRef.current = value;
        handleSave(prop, value);
    };


    return {
        updateClickHandler,
        inputChange,
        isActive
        
    }
}
