import { useEffect } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { DAppProvider } from "@usedapp/core";
import sal from "sal.js";
import { ThemeProvider } from "next-themes";
import "../assets/css/bootstrap.min.css";
import "../assets/css/feather.css";
import "../assets/scss/style.scss";
import "react-toastify/dist/ReactToastify.css";
import { Constants } from "../config/constants";

const chainId = process.env.CHAIN_ID;

const config = {
    readOnlyChainId: chainId,
    readOnlyUrls: {
        [chainId]: Constants.rpcURL[chainId][2],
    },
};

const MyApp = ({ Component, pageProps }) => {
    const router = useRouter();
    useEffect(() => {
        sal({ threshold: 0.1, once: true });
    }, [router.asPath]);

    useEffect(() => {
        sal();
    }, []);
    useEffect(() => {
        document.body.className = `${pageProps.className}`;
    });
    return (
        <DAppProvider config={config}>
            <ThemeProvider defaultTheme="dark">
                <Component {...pageProps} />
            </ThemeProvider>
        </DAppProvider>
    );
};

MyApp.propTypes = {
    Component: PropTypes.elementType,
    pageProps: PropTypes.shape({
        className: PropTypes.string,
    }),
};

export default MyApp;
