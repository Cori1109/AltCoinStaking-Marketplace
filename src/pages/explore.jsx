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
        let result = await fetch(
            `${process.env.BASE_API_URL}/api/marketItem`
        ).then(safeParseJSON);
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
