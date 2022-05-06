import PropTypes from "prop-types";
import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header";
import Footer from "@layout/footer";
import Breadcrumb from "@components/breadcrumb";
import ProductDetailsArea from "@containers/product-details";

// demo data
import productData from "../../data/products.json";

const ProductDetails = ({ product }) => (
    <Wrapper>
        <SEO pageTitle="Product Details" />
        <Header />
        <main id="main-content">
            <Breadcrumb
                pageTitle="Product Details"
                currentPage="Product Details"
            />
            <ProductDetailsArea product={product} />
        </main>
        <Footer />
    </Wrapper>
);

// export async function getStaticPaths() {
//     return {
//         paths: productData.map(({ slug }) => ({
//             params: {
//                 slug,
//             },
//         })),
//         fallback: false,
//     };
// }

// export async function getStaticProps({ params }) {
//     const product = productData.find(({ slug }) => slug === params.slug);
//     return {
//         props: {
//             className: "template-color-1",
//             product,
//         }, // will be passed to the page component as props
//     };
// }

ProductDetails.propTypes = {
    product: PropTypes.shape({}),
};

export default ProductDetails;
