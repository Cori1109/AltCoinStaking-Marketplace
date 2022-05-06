import PropTypes from "prop-types";
import Anchor from "@ui/anchor";

const Collection = ({ title, total_item, image, path }) => {
    return (
        <Anchor path={path} className="rn-collection-inner-one">
            <div className="collection-wrapper">
                {image?.src && (
                    <div className="collection-small-thumbnail">
                        <video
                            src={image.src}
                            autoplay
                            muted
                            loop="true"
                            className="card-img"
                        />
                    </div>
                )}
                <div className="collection-deg">
                    <h6 className="title">{title}</h6>
                    <span className="items">{total_item} items</span>
                </div>
            </div>
        </Anchor>
    );
};

Collection.propTypes = {
    title: PropTypes.string.isRequired,
    total_item: PropTypes.number.isRequired,
    path: PropTypes.string.isRequired,
    image: PropTypes.shape({
        src: PropTypes.oneOfType([PropTypes.shape(), PropTypes.string])
            .isRequired,
        alt: PropTypes.string,
    }).isRequired,
};

export default Collection;
