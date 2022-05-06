import { useState } from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import clsx from "clsx";
import Anchor from "@ui/anchor";
import CountdownTimer from "@ui/countdown/layout-01";
import ClientAvatar from "@ui/client-avatar";
import ShareDropdown from "@components/share-dropdown";
import ProductBid from "@components/product-bid";
import Button from "@ui/button";
import { ImageType } from "@utils/types";
import PlaceBidModal from "@components/modals/placebid-modal";
import { getEllipsisTxt } from "@helpers/formatters";

const unknownImg = "images/unknown.png";

const Product = ({ overlay, tokenId, name, owner, image, nftAddress }) => {
    console.log("prodect---------", tokenId, name, owner, image, nftAddress);
    const [showBidModal, setShowBidModal] = useState(false);
    const handleBidModal = () => {
        setShowBidModal((prev) => !prev);
    };
    return (
        <>
            <div className={clsx("product-style-one")}>
                <div className="card-thumbnail">
                    <Anchor path={`/product/${nftAddress}/${tokenId}`}>
                        <img
                            src={image ? image : unknownImg}
                            alt={name}
                            style={{
                                width: "280px",
                                height: "280px",
                                display: "block",
                            }}
                        />
                    </Anchor>
                    {/* {auction_date && <CountdownTimer date={auction_date} />} */}
                    {/* {placeBid && (
                        <Button onClick={handleBidModal} size="small">
                            Place Bid
                        </Button>
                    )} */}
                </div>
                <div className="product-share-wrapper">
                    <div className="profile-share">
                        {/* {authors?.map((client) => (
                            <ClientAvatar
                                key={client.name}
                                slug={client.slug}
                                name={client.name}
                                image={client.image}
                            />
                        ))} */}
                        <Anchor
                            className="more-author-text"
                            path={`/product/${nftAddress}/${tokenId}`}
                        >
                            Owner: {getEllipsisTxt(owner, 4)}
                        </Anchor>
                    </div>
                    {/* {!false && <ShareDropdown />} */}
                </div>
                <Anchor path={`/product/${nftAddress}/${tokenId}`}>
                    <span className="product-name">{name}</span>
                </Anchor>
            </div>
            <PlaceBidModal show={showBidModal} handleModal={handleBidModal} />
        </>
    );
};

Product.propTypes = {
    overlay: PropTypes.bool,
    tokenId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired,
    nftAddress: PropTypes.string.isRequired,
    image: ImageType.isRequired,
};

Product.defaultProps = {
    overlay: false,
};

export default Product;
