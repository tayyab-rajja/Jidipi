import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import CreatableSelect from "react-select/creatable";
import { reactSelectStyle } from "src/utils/styles";
import styles from "../Table.module.scss";
import clsx from "clsx";

const style = { height: 44 };
export default React.memo(
    ({
        item,
        prop,
        handleChange,
        setSelectOpen: setSelectOpenMainFunc,
    }: any) => {
        // @ts-ignore
        let teams = useSelector((state) => state.team.teams);

        const teamOptions = useMemo(() => {
            return teams.map((team: any) => ({
                label: team.name,
                value: { teamName: team.name, teamId: team._id },
            }));
        }, [teams]);

        const name = "teams";
        const setSelectOpen = setSelectOpenMainFunc(name);

        return (
            <div className={styles["input-container"]} style={style}>
                <div className="d-flex align-items-center h-100">
                    <div
                        className={clsx(
                            "d-flex",
                            "justify-content-center",
                            "align-items-center",
                            "h-100",
                            styles["select-team-text-container"]
                        )}
                    >
                        <div className="title">TEAM</div>
                    </div>
                    <div
                        className={clsx(
                            styles["input-container"],
                            "flex-grow-1"
                        )}
                    >
                        <CreatableSelect
                            isClearable
                            menuPlacement="auto"
                            styles={reactSelectStyle({ hide: !!item[prop] })}
                            value={teamOptions.find(
                                (t: any) => t.value.teamName === item[prop]
                            )}
                            onChange={(newValue) => {
                                if (newValue) {
                                    handleChange(
                                        "teamName",
                                        newValue.value.teamName
                                    );
                                    handleChange(
                                        "teamId",
                                        newValue.value.teamId
                                    );
                                } else {
                                    handleChange("teamName", "");
                                    handleChange("teamId", "");
                                }
                            }}
                            placeholder=""
                            getOptionLabel={(option) => option.label}
                            getOptionValue={(option) => option.value}
                            options={teamOptions}
                            onMenuClose={() => {
                                setSelectOpen(false);
                            }}
                            onMenuOpen={() => {
                                setSelectOpen(true);
                            }}
                        />
                    </div>
                </div>
            </div>
        );
    }
);
