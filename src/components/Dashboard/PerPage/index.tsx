import { MouseEventHandler, useState } from "react";
import styles from "./index.module.scss";

interface IProps {
    options: number[];
}

export default ({ options }: IProps) => {
    const [pageSize, setPageSize] = useState(options[0]);
    const changePageSizeHandler: MouseEventHandler<HTMLDivElement> = (
        event
    ) => {
        setPageSize
    };
    return (
        <div className="per-page-section">
            <div className="per-page">
                <div className="label">Posts per Page</div>
                <div className="custom-select">
                    <div
                        className="form-select"
                        onClick={changePageSizeHandler}
                    >
                        20
                    </div>
                    <ul id="options" className="options">
                        {options.map((o) => (
                            <li className="active">{o}</li>
                        ))}
                        {/* <li className="active">20</li>
                        <li>100</li> */}
                    </ul>
                </div>
            </div>
        </div>
    );
};
