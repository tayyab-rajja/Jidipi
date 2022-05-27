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
    const result = item.isCompanyAdmin ? "Admin" : "User";
    return (
        <InputContainer
            type="text"
            value={result}
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
