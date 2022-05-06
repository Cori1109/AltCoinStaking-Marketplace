import { useState, useEffect } from "react";
import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header";
import Footer from "@layout/footer";
import Breadcrumb from "@components/breadcrumb";
import ExploreProductArea from "@containers/explore-product";
import { GetMetaData } from "@hooks/GetMetaData";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const Explore = () => {
    const [marketItemData, setMarketItemData] = useState([]);

    const handleFetch = async () => {
        await GetMetaData(setMarketItemData);
    };

    useEffect(async () => {
        setMarketItemData([]);
        await handleFetch();
        console.log("handlefetch called");
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
