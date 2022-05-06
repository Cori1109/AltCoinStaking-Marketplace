import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header";
import Footer from "@layout/footer";
import Breadcrumb from "@components/breadcrumb";
import CollectionArea from "@containers/collection/layout-03";

// demo data
import collectionsData from "../data/collections.json";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const Collection = () => (
    <Wrapper>
        <SEO pageTitle="Collection" />
        <Header />
        <main id="main-content">
            <Breadcrumb pageTitle="Our Collection" currentPage="Collection" />
            <CollectionArea data={{ collections: collectionsData }} />
        </main>
        <Footer />
    </Wrapper>
);

export default Collection;
