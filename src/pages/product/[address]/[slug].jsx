import PropTypes from "prop-types";
import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header";
import Footer from "@layout/footer";
import Breadcrumb from "@components/breadcrumb";
import ProductDetailsArea from "@containers/product-details";

const ProductDetails = ({ products }) => {
    return (
        <Wrapper>
            <SEO pageTitle="Product Details" />
            <Header />
            <main id="main-content">
                <Breadcrumb
                    pageTitle="Product Details"
                    currentPage="Product Details"
                />
                <ProductDetailsArea product={products} />
            </main>
            <Footer />
        </Wrapper>
    );
};

export async function getServerSideProps() {
    // Fetch data from external API
    const res = await fetch(`${process.env.BASE_API_URL}/api/marketItem`);
    const result = await res.json();
    const products = result.data;

    return { props: { products } };
}

ProductDetails.propTypes = {
    products: PropTypes.shape({}),
};

export default ProductDetails;
