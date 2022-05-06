import PropTypes from "prop-types";

export const IDType = PropTypes.oneOfType([PropTypes.string, PropTypes.number]);

export const HeadingType = PropTypes.shape({
    id: IDType,
    content: PropTypes.string.isRequired,
});

export const TextType = PropTypes.shape({
    id: IDType,
    content: PropTypes.string.isRequired,
});

export const ImageType = PropTypes.shape({
    src: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})])
        .isRequired,
    alt: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
});

export const ButtonComponentType = {
    children: PropTypes.node.isRequired,
    type: PropTypes.oneOf(["button", "submit", "reset"]),
    label: PropTypes.string,
    onClick: PropTypes.func,
    className: PropTypes.string,
    path: PropTypes.string,
    size: PropTypes.oneOf(["large", "small", "medium"]),
    color: PropTypes.oneOf(["primary", "primary-alta"]),
    fullwidth: PropTypes.bool,
};

// eslint-disable-next-line no-unused-vars
const { children, ...restButtonTypes } = ButtonComponentType;

export const ButtonType = PropTypes.shape({
    content: PropTypes.string.isRequired,
    ...restButtonTypes,
});

export const SectionTitleType = PropTypes.shape({
    title: PropTypes.string,
    subtitle: PropTypes.string,
});

export const ItemType = PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    path: PropTypes.string,
    description: PropTypes.string,
    images: PropTypes.arrayOf(ImageType),
});

export const MarketItemType = PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    tokenId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired,
    nftAddress: PropTypes.string.isRequired,
    image: ImageType,
    price: PropTypes.number.isRequired,
    tokenURI: PropTypes.string.isRequired,
    attributes: PropTypes.arrayOf(
        PropTypes.shape({
            trait_type: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
        })
    ),
});

export const ProductType = PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    latestBid: PropTypes.string.isRequired,
    price: PropTypes.shape({
        amount: PropTypes.number.isRequired,
        currency: PropTypes.string.isRequired,
    }).isRequired,
    likeCount: PropTypes.number,
    image: ImageType,
    auction_date: PropTypes.string,
    bitCount: PropTypes.number,
});

export const LevelType = PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    image: ImageType.isRequired,
});

export const CollectionType = PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    total_item: PropTypes.number.isRequired,
    image: ImageType.isRequired,
    thumbnails: PropTypes.arrayOf(ImageType).isRequired,
    profile_image: ImageType.isRequired,
});

export const FeatureProductsType = PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    image: ImageType.isRequired,
});

export const NotifactionType = PropTypes.shape({
    id: IDType,
    title: PropTypes.string,
    description: PropTypes.string,
    path: PropTypes.string,
    date: PropTypes.string,
    time: PropTypes.string,
    image: ImageType,
});
