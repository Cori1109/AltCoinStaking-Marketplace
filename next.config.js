const path = require("path");

module.exports = {
    reactStrictMode: true,
    sassOptions: {
        includePaths: [path.join(__dirname, "./src/assets/scss")],
    },
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        // eslint-disable-next-line no-param-reassign
        config.ignoreWarnings = [
            {
                message:
                    /(magic-sdk|@walletconnect\/web3-provider|@web3auth\/web3auth)/,
            },
        ];
        return config;
    },
    env: {
        // BASE_API_URL: "http://localhost:3000",
        BASE_API_URL: "https://marketplace.zenzebra.art",
        CHAIN_ID: 80001,
        MARKETPLACE_ADDRESS: "0x524786f39fc11Fd94068F8A86B19a5F772a93530",
        NFT_ADDRESS: "0x83894F1f4b685e6E12D08E046199530776E846dB",
        POLYGONSCAN_API_KEY: "7RUCXP6THP65HNUSVJ1Z1TUR1R1NHA8ZYV",
        POLYGONSCAN_API_URL: "https://api-testnet.polygonscan.com/api",
        // POLYGONSCAN_API_URL: "https://api.polygonscan.com/api",
    },
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
    distDir: "build",
};
