import { forwardRef } from "react";
import PropTypes from "prop-types";
import NiceSelect from "@ui/nice-select";
import InputRange from "@ui/input-range";
import Button from "@ui/button";

const ProductFilter = forwardRef(
    ({ slectHandler, priceHandler, startFilter }, ref) => (
        <div className="default-exp-wrapper default-exp-expand" ref={ref}>
            <div className="inner">
                <div className="filter-select-option">
                    <h6 className="filter-leble">Level</h6>
                    <NiceSelect
                        options={[
                            { value: "all", text: "All" },
                            { value: "Starter", text: "Starter" },
                            { value: "Bronze", text: "Bronze" },
                            { value: "Silver", text: "Silver" },
                            { value: "Gold", text: "Gold" },
                            { value: "Platinum", text: "Platinum" },
                        ]}
                        placeholder="Select Level"
                        onChange={slectHandler}
                        name="level"
                    />
                </div>

                <div className="filter-select-option">
                    <h6 className="filter-leble">Sale type</h6>
                    <NiceSelect
                        options={[
                            { value: "all", text: "All Type" },
                            { value: "not-for-sale", text: "Not for sale" },
                            {
                                value: "open-for-offers",
                                text: "Open for offers",
                            },
                        ]}
                        placeholder="Sale type"
                        onChange={slectHandler}
                        name="sale_type"
                    />
                </div>
                <div className="filter-select-option">
                    <h6 className="filter-leble">Price Range</h6>
                    <div className="price_filter s-filter clear">
                        <form action="#" method="GET">
                            <InputRange onChange={priceHandler} />
                        </form>
                    </div>
                </div>
                <div className="filter-select-option">
                    <Button variant="primary" onClick={startFilter}>
                        Filter
                    </Button>
                </div>
            </div>
        </div>
    )
);

ProductFilter.displayName = "ProductFilter";

ProductFilter.propTypes = {
    slectHandler: PropTypes.func,
    sortHandler: PropTypes.func,
    priceHandler: PropTypes.func,
    inputs: PropTypes.shape({
        price: PropTypes.arrayOf(PropTypes.number),
    }),
};

export default ProductFilter;
