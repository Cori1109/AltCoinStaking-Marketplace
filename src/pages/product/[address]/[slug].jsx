import PropTypes from "prop-types";
import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header";
import Footer from "@layout/footer";
import Breadcrumb from "@components/breadcrumb";
import ProductDetailsArea from "@containers/product-details";

const ProductDetails = ({ product }) => {
    return (
        <Wrapper>
            <SEO pageTitle="Product Details" />
            <Header />
            <main id="main-content">
                <Breadcrumb
                    pageTitle="Product Details"
                    currentPage="Product Details"
                />
                <ProductDetailsArea product={product[0]} />
            </main>
            <Footer />
        </Wrapper>
    );
};

// export async function getServerSideProps() {
//     // Fetch data from external API
//     const res = await fetch(`${process.env.BASE_API_URL}/api/marketItem`);
//     const result = await res.json();
//     const products = result.data;

//     return { props: { products } };
// }

export async function getStaticPaths() {
    const res = await fetch(`${process.env.BASE_API_URL}/api/marketItem`);
    const result = await res.json();
    const products = result.data;

    // map through to return post paths
    const paths = products.map((prod) => ({
        params: {
            address: prod.nftAddress,
            slug: prod.tokenId.toString(),
        },
    }));

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    const { address, slug } = params;

    const res = await fetch(`${process.env.BASE_API_URL}/api/marketItem`);
    const result = await res.json();
    const products = result.data;

    const product = products.filter((prod) => {
        return prod.tokenId == slug;
    });

    return {
        props: {
            className: "template-color-1",
            product,
        },
    };
}

ProductDetails.propTypes = {
    products: PropTypes.shape({}),
};

export default ProductDetails;
