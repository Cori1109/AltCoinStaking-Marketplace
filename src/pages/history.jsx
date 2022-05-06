import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header";
import Footer from "@layout/footer";
import Breadcrumb from "@components/breadcrumb";
import TransactionArea from "@containers/transactions";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const History = () => (
    <Wrapper>
        <SEO pageTitle="History" />
        <Header />
        <main id="main-content">
            <Breadcrumb pageTitle="Transaction History" currentPage="History" />
            <TransactionArea
                data={{
                    section_title: {
                        title: "Transaction",
                    },
                    fetchAll: true,
                }}
            />
        </main>
        <Footer />
    </Wrapper>
);

export default History;
