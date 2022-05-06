/* eslint-disable react/prop-types */
// import { Range } from "react-range";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";
import Button from "@ui/button";
// import SliderTrack from "./slider-track";
// import SliderThumb from "./slider-thumb";

// const STEP = 1;
// const MIN = 0;
// const MAX = 100;

const InputRange = ({ onChange }) => {
    // const renderTrack = (props) => (
    //     <SliderTrack {...props} min={MIN} max={MAX} values={values} />
    // );

    // const onFormSubmit = (e) => {
    //     e.preventDefault();
    //     const formData = new FormData(e.target);
    //     console.log("formdata:", formData);
    // };
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    const handleChangeMinPrice = (event) => {
        if (event.target.value[event.target.value.length - 1] === ".") return;
        if (Number.isInteger(Number(event.target.value))) {
            if (event.target.value.length < 6) setMinPrice(event.target.value);
        }
    };

    const handleChangeMaxPrice = (event) => {
        if (event.target.value[event.target.value.length - 1] === ".") return;
        if (Number.isInteger(Number(event.target.value))) {
            if (event.target.value.length < 6) setMaxPrice(event.target.value);
        }
    };

    useEffect(() => {
        onChange(minPrice, maxPrice);
    }, [minPrice, maxPrice]);

    return (
        <div className="input-range">
            <Form>
                <input
                    type="text"
                    name="min"
                    onChange={handleChangeMinPrice}
                    value={minPrice}
                    placeholder="Min"
                />
                <input
                    type="text"
                    name="max"
                    value={maxPrice}
                    onChange={handleChangeMaxPrice}
                    placeholder="Max"
                />
            </Form>
            {/* <Range
                step={STEP}
                min={MIN}
                max={MAX}
                values={values}
                onChange={(vals) => onChange(vals)}
                renderTrack={renderTrack}
                renderThumb={SliderThumb}
            />
            <div className="slider__range--output">
                <div className="price__output--wrap">
                    <div className="price--output">
                        <span>Price :</span>
                        <span className="output-label">
                            ${values[0] || 0 / 100} - ${values[1] || 0 / 100}
                        </span>
                    </div>
                    <div className="price--filter">
                        <Button size="small" path="#!">
                            Filter
                        </Button>
                    </div>
                </div>
            </div> */}
        </div>
    );
};

InputRange.propTypes = {
    values: PropTypes.arrayOf(PropTypes.number),
    onChange: PropTypes.func,
};

export default InputRange;
