import React from "react";
import InputContainer from "src/components/BoxInputContainer";

export default React.memo(function Input({
    item,
    prop,
    placeholder,
    custom,
    disabled,
    handleChange,
    defaultText,
}: any) {
    return (
        <InputContainer
            type="text"
            value={defaultText || item[prop] || ""}
            placeholder={placeholder}
            inputClass="form-control"
            disabled={disabled}
            className="dashed"
            custom={custom}
            handleChange={(event: any) => {
                if (disabled) {
                    return;
                }
                handleChange(prop, event.target.value);
            }}
        />
    );
});
