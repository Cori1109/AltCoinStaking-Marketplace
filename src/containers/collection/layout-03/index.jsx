import PropTypes from "prop-types";
import clsx from "clsx";
import Collection from "@components/collection";
import { CollectionType } from "@utils/types";

const CollectionArea = ({ className, space, id, data }) => {
    console.log("collection data:", data);
    return (
        <div
            className={clsx(
                "rn-collection-area",
                space === 1 && "rn-section-gapTop",
                className
            )}
            id={id}
        >
            <div className="container">
                <div className="row g-5">
                    {data?.collections.map((collection) => (
                        <div
                            key={collection.id}
                            className="col-lg-6 col-xl-3 col-md-6 col-sm-6 col-12"
                        >
                            <Collection
                                title={collection.title}
                                total_item={27}
                                image={collection.image}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

CollectionArea.propTypes = {
    className: PropTypes.string,
    id: PropTypes.string,
    space: PropTypes.oneOf([1]),
    data: PropTypes.shape({
        collections: PropTypes.arrayOf(CollectionType),
    }),
};
CollectionArea.defaultProps = {
    space: 1,
};

export default CollectionArea;
