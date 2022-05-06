import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header";
import Footer from "@layout/footer";
import Breadcrumb from "@components/breadcrumb";
import UpcomingProjectsArea from "@containers/upcoming-projects";

// Demo Data
import upcomingData from "../data/upcoming-projects.json";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const UpcomingProjects = () => (
    <Wrapper>
        <SEO pageTitle="Upcoming Projects" />
        <Header />
        <main id="main-content">
            <Breadcrumb
                pageTitle="Upcoming NFT Projects"
                currentPage="Upcoming Projects"
            />
            <UpcomingProjectsArea data={{ upcomingProjects: upcomingData }} />
        </main>
        <Footer space={2} />
    </Wrapper>
);

export default UpcomingProjects;
