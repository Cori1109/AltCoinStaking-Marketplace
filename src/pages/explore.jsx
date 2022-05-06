import { useState, useEffect } from "react";
import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header";
import Footer from "@layout/footer";
import Breadcrumb from "@components/breadcrumb";
import ExploreProductArea from "@containers/explore-product";
import axios from "axios";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const Explore = () => {
    const [marketItemData, setMarketItemData] = useState([]);

    useEffect(async () => {
        // var result = await axios.get(
        //     `${process.env.BASE_API_URL}/api/marketItem`,
        //     {
        //         headers: {
        //             Accept: "application/json, text/plain, */*",
        //             "User-Agent": "*",
        //         },
        //     }
        // );
        var result = await fetch(`${process.env.BASE_API_URL}/api/marketItem`);
        result = result.json();
        result = JSON.parse(result);
        // const products = result.data;
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
