import { useState, useEffect } from "react";
import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header";
import Footer from "@layout/footer";
import Breadcrumb from "@components/breadcrumb";
import ExploreProductArea from "@containers/explore-product";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const Explore = () => {
    const [marketItemData, setMarketItemData] = useState([]);

    useEffect(async () => {
        const res = await fetch(`http://localhost:3000/api/marketItem`);
        const result = await res.json();
        console.log("==== marketItem:", result.data);
        setMarketItemData(result.data);
    }, []);

    return (
        <Wrapper>
            <SEO pageTitle="Explore" />
            <Header />
            <main id="main-content">
                <Breadcrumb pageTitle="Explore" currentPage="Explore" />
                <ExploreProductArea
                    data={{
                        section_title: {
                            title: "Explore Product",
                        },
                        products: marketItemData,
                    }}
                />
            </main>
            <Footer />
        </Wrapper>
    );
};

export default Explore;
