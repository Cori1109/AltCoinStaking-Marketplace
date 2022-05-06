import PropTypes from "prop-types";
import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header";
import Footer from "@layout/footer";
import Breadcrumb from "@components/breadcrumb";
import ProductDetailsArea from "@containers/product-details";
import axios from "axios";

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

async function safeParseJSON(response) {
    const body = await response.text();
    try {
        return JSON.parse(body);
    } catch (err) {
        console.error("Error:", err);
        console.error("Response body:", body);
        throw err;
        // return ReE(response, err.message, 500);
    }
}

export async function getStaticPaths() {
    // var result = await axios.get(`${process.env.BASE_API_URL}/api/marketItem`, {
    //     headers: {
    //         Accept: "application/json, text/plain, */*",
    //         "User-Agent": "*",
    //     },
    // });
    const result = await fetch(
        `${process.env.BASE_API_URL}/api/marketItem`
    ).then(safeParseJSON);
    result = JSON.parse(result);
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

    // var result = await axios.get(`${process.env.BASE_API_URL}/api/marketItem`, {
    //     headers: {
    //         Accept: "application/json, text/plain, */*",
    //         "User-Agent": "*",
    //     },
    // });
    const result = await fetch(
        `${process.env.BASE_API_URL}/api/marketItem`
    ).then(safeParseJSON);
    result = JSON.parse(result);
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
