import { useState, useEffect } from "react";
import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header";
import Footer from "@layout/footer";
import HeroArea from "@containers/hero";
import ServiceArea from "@containers/services/layout-01";
// import TopSellerArea from "@containers/top-seller/layout-01";
import TransactionArea from "@containers/transactions";
import CollectionArea from "@containers/collection/layout-02";
import { normalizedData } from "@utils/methods";
import { GetMintedCnt } from "@hooks/GetBaseData";

// Demo Data
import homepageData from "../data/homepages/home.json";
import collectionsData from "../data/collections.json";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const Home = () => {
    const [mintedCnt, setMintedCnt] = useState([]);
    const content = normalizedData(homepageData?.content || []);

    useEffect(async () => {
        let _mCnts = [0, 0, 0, 0, 0];
        for (let i = 0; i < 3; i++) {
            const _cnts = await GetMintedCnt(i);
            for (let j = 0; j < 5; j++) {
                _mCnts[j] += parseInt(_cnts[j]);
            }
        }
        setMintedCnt(_mCnts);
    }, []);

    return (
        <Wrapper>
            <SEO pageTitle="Home" />
            <Header />
            <main id="main-content">
                <HeroArea data={content["hero-section"]} />
                <CollectionArea
                    data={{
                        ...content["collection-section"],
                        collections: collectionsData,
                        mintedCnts: mintedCnt,
                    }}
                />
                <TransactionArea
                    data={{
                        ...content["transaction-section"],
                        fetchAll: false,
                    }}
                />
                <ServiceArea data={content["service-section"]} />
            </main>
            <Footer />
        </Wrapper>
    );
};

export default Home;
