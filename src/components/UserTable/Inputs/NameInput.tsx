import React from "react";
import NameInputContainer from "src/components/BoxNameInputContainer";

export default React.memo(function NameInput({ item, handleChange }: any) {
    const inputProps = (property: any) => {
        return {
            value: item[property],
            inputClass: "form-control",
            handleChange: (event: any) => handleChange(property, event.target.value),
        };
    };
    return (
        <NameInputContainer
            type="text"
            firstName={inputProps("firstName")}
            lastName={inputProps("lastName")}
            className="dashed custom-input-container"
            placeholder={"NAME"}
        />
    );
});
