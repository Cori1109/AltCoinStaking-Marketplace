import { useReducer, useRef, useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import SectionTitle from "@components/section-title/layout-02";
import Product from "@components/product";
import ProductFilter from "@components/product-filter";
import Pagination from "@components/pagination-02";
import FilterButton from "@ui/filter-button";
import { slideToggle } from "@utils/methods";
import { SectionTitleType, MarketItemType } from "@utils/types";

const POSTS_PER_PAGE = 8;

function reducer(state, action) {
    switch (action.type) {
        case "FILTER_TOGGLE":
            return { ...state, filterToggle: !state.filterToggle };
        case "SET_INPUTS":
            return { ...state, inputs: { ...state.inputs, ...action.payload } };
        case "SET_PRODUCTS":
            return { ...state, products: action.payload };
        default:
            return state;
    }
}

const ExploreProductArea = ({ className, space, data }) => {
    const itemsToFilter = [...data.products];
    const [state, dispatch] = useReducer(reducer, {
        filterToggle: false,
        products: data.products || [],
        inputs: {
            price: [0, 100],
        },
    });

    let checkPriceRange = true;

    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const numberOfPages = Math.ceil(data.products.length / POSTS_PER_PAGE);
    const paginationHandler = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const filterRef = useRef(null);
    const filterHandler = () => {
        dispatch({ type: "FILTER_TOGGLE" });
        if (!filterRef.current) return;
        slideToggle(filterRef.current);
    };

    const slectHandler = ({ value }, name) => {
        dispatch({ type: "SET_INPUTS", payload: { [name]: value } });
    };

    const priceHandler = (minVal, maxVal) => {
        dispatch({
            type: "SET_INPUTS",
            payload: { price: [minVal, maxVal] },
        });
    };

    const filterMethods = (item, filterKey, value) => {
        console.log("===== value:", value);
        if (value === "all") return false;
        let itemKey = filterKey;
        if (filterKey === "level") {
            itemKey = "attributes";
            if (Array.isArray(item[itemKey])) {
                return !item[itemKey][0]["value"].includes(value);
            }
        }

        if (filterKey === "sale_type") {
            itemKey = "price";
            if (value == "not-for-sale") {
                checkPriceRange = false;
                return item[itemKey] == "0.000" ? false : true;
            } else if (value == "open-for-offers") {
                checkPriceRange = true;
                return parseFloat(item[itemKey]) > 0 ? false : true;
            }
        }

        if (filterKey === "price") {
            itemKey = "price";
            if (checkPriceRange)
                return (
                    parseFloat(item[itemKey]) <= value[0] ||
                    parseFloat(item[itemKey]) >= value[1]
                );
            else return false;
        }
    };

    const creatorHandler = useCallback(() => {
        const start = (currentPage - 1) * POSTS_PER_PAGE;
        setProducts(data.products.slice(start, start + POSTS_PER_PAGE));
    }, [currentPage, data.products]);

    useEffect(() => {
        creatorHandler();
    }, [currentPage, creatorHandler]);

    const startFilter = () => {
        let filteredItems = [];

        filteredItems = itemsToFilter.filter((item) => {
            checkPriceRange = true;
            // eslint-disable-next-line no-restricted-syntax
            for (let key in state.inputs) {
                if (filterMethods(item, key, state.inputs[key])) return false;
            }
            return true;
        });
        dispatch({ type: "SET_PRODUCTS", payload: filteredItems });
    };

    useEffect(() => {
        setProducts(state.products);
    }, [state.products]);
    return (
        <div
            className={clsx(
                "rn-product-area",
                space === 1 && "rn-section-gapTop",
                className
            )}
        >
            <div className="container">
                <div className="row mb--50 align-items-center">
                    <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                        {data?.section_title && (
                            <SectionTitle
                                className="mb--0"
                                {...data.section_title}
                            />
                        )}
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-12 mt_mobile--15">
                        <FilterButton
                            open={state.filterToggle}
                            onClick={filterHandler}
                        />
                    </div>
                </div>

                <ProductFilter
                    ref={filterRef}
                    startFilter={startFilter}
                    slectHandler={slectHandler}
                    priceHandler={priceHandler}
                />
                <div className="row g-5">
                    {products.length > 0 ? (
                        <>
                            {products.map((prod) => (
                                <div
                                    key={prod.id}
                                    className="col-5 col-lg-4 col-md-6 col-sm-6 col-12"
                                >
                                    <Product
                                        overlay
                                        tokenId={prod.tokenId}
                                        name={prod.name}
                                        owner={prod.owner}
                                        image={prod.image}
                                        price={prod.price}
                                        nftAddress={prod.nftAddress}
                                    />
                                </div>
                            ))}
                        </>
                    ) : (
                        <p>No item to show</p>
                    )}
                </div>
                <div className="row">
                    <div
                        className="col-lg-12"
                        data-sal="slide-up"
                        data-sal-delay="950"
                        data-sal-duration="800"
                    >
                        <Pagination
                            currentPage={currentPage}
                            numberOfPages={numberOfPages}
                            onClick={paginationHandler}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

ExploreProductArea.propTypes = {
    className: PropTypes.string,
    space: PropTypes.oneOf([1, 2]),
    data: PropTypes.shape({
        section_title: SectionTitleType,
        products: PropTypes.arrayOf(MarketItemType),
        placeBid: PropTypes.bool,
    }),
};

ExploreProductArea.defaultProps = {
    space: 1,
};

export default ExploreProductArea;
