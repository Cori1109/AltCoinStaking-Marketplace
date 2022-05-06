import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header";
import Footer from "@layout/footer";
import Breadcrumb from "@components/breadcrumb";
import SignUpArea from "@containers/signup";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const SignUp = () => (
    <Wrapper>
        <SEO pageTitle="Sign Up" />
        <Header />
        <main id="main-content">
            <Breadcrumb pageTitle="Sign Up" currentPage="Sign Up" />
            <SignUpArea />
        </main>
        <Footer />
    </Wrapper>
);

export default SignUp;
