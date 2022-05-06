/* eslint-disable react/prop-types */
// import { Range } from "react-range";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";
import Button from "@ui/button";
// import SliderTrack from "./slider-track";
// import SliderThumb from "./slider-thumb";

// const STEP = 1;
// const MIN = 0;
// const MAX = 100;

const InputRange = ({ values, onChange }) => {
    // const renderTrack = (props) => (
    //     <SliderTrack {...props} min={MIN} max={MAX} values={values} />
    // );

    // const onFormSubmit = (e) => {
    //     e.preventDefault();
    //     const formData = new FormData(e.target);
    //     console.log("formdata:", formData);
    // };

    return (
        <div className="input-range">
            <Form
                onSubmit={(e) => {
                    onFormSubmit(e);
                }}
            >
                <Form.Control
                    type="text"
                    name="min"
                    onChange={(vals) => onChange(vals)}
                    values={values[0]}
                    placeholder="Min"
                />
                <Form.Control
                    type="text"
                    name="max"
                    values={values[1]}
                    onChange={(vals) => onChange(vals)}
                    placeholder="Max"
                />
                <Button variant="primary" type="submit">
                    Filter
                </Button>
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
