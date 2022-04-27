export default () => {
    return (
        <div className="scroll-tabs">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button
                        className="nav-link active tab-button"
                        id="architectures-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#architectures"
                        type="button"
                        role="tab"
                        aria-controls="architectures"
                        aria-selected="true"
                    >
                        ARCHITECTURES
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button
                        className="nav-link tab-button"
                        id="interiors-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#interiors"
                        type="button"
                        role="tab"
                        aria-controls="interiors"
                        aria-selected="true"
                    >
                        INTERIORS
                    </button>
                </li>

                <li className="nav-item" role="presentation">
                    <button
                        className="nav-link tab-button"
                        id="construction-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#construction"
                        type="button"
                        role="tab"
                        aria-controls="construction"
                        aria-selected="true"
                    >
                        CONSTRUCTIONS
                    </button>
                </li>

                <li className="nav-item" role="presentation">
                    <button
                        className="nav-link tab-button"
                        id="electronics-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#electronics"
                        type="button"
                        role="tab"
                        aria-controls="electronics"
                        aria-selected="true"
                    >
                        ELECTRONICS
                    </button>
                </li>

                <li className="nav-item" role="presentation">
                    <button
                        className="nav-link tab-button"
                        id="furnitures-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#furnitures"
                        type="button"
                        role="tab"
                        aria-controls="furnitures"
                        aria-selected="true"
                    >
                        FURNITURE
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button
                        className="nav-link tab-button"
                        id="goods-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#goods"
                        type="button"
                        role="tab"
                        aria-controls="goods"
                        aria-selected="true"
                    >
                        GOODS
                    </button>
                </li>
            </ul>
        </div>
    );
};
