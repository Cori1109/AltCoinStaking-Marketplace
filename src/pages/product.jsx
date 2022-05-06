import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header";
import Footer from "@layout/footer";
import Breadcrumb from "@components/breadcrumb";
import ProductArea from "@containers/product";

// Demo Data
import productData from "../data/products.json";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const Product = () => (
    <Wrapper>
        <SEO pageTitle="Product" />
        <Header />
        <main id="main-content">
            <Breadcrumb pageTitle="Our Product" currentPage="Our Product" />
            <ProductArea data={{ products: productData }} />
        </main>
        <Footer />
    </Wrapper>
);

export default Product;
