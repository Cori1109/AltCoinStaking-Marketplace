import PropTypes from "prop-types";
import clsx from "clsx";
import Collection from "@components/collection";
import { SectionTitleType, LevelType } from "@utils/types";

const CollectionArea = ({ className, id, space, data }) => {
    return (
        <div
            className={clsx(
                "rn-collection-area",
                space === 1 && "rn-section-gapTop",
                space === 2 && "rn-section-gapBottom",
                className
            )}
            id={id}
        >
            <div className="container">
                <div className="row mb--50 align-items-center">
                    <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                        <h3>{data.section_title?.title}</h3>
                    </div>
                </div>
                {data?.collections && (
                    <div className="row g-5">
                        {data.collections.map((collection, _id) => (
                            <div
                                key={collection.id}
                                className="col-lg-6 col-xl-3 col-md-6 col-sm-6 col-12"
                            >
                                <Collection
                                    title={collection.title}
                                    total_item={`${data.mintedCnts[_id]}/${collection.total_item}`}
                                    image={collection.image}
                                    path={collection.path}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

CollectionArea.propTypes = {
    className: PropTypes.string,
    id: PropTypes.string,
    space: PropTypes.oneOf([1, 2]),
    data: PropTypes.shape({
        section_title: SectionTitleType,
        collections: PropTypes.arrayOf(LevelType),
    }),
};
CollectionArea.defaultProps = {
    space: 1,
};

export default CollectionArea;
