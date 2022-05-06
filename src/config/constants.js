export const Constants = {
    config: {
        chainId: 80001,
        marketplace_address: "0x524786f39fc11Fd94068F8A86B19a5F772a93530",
        nft_address: "0x83894F1f4b685e6E12D08E046199530776E846dB",
        polygonscan_api_key: "7RUCXP6THP65HNUSVJ1Z1TUR1R1NHA8ZYV",
        polygonscan_api_url: "https://api-testnet.polygonscan.com/api",
        // polygonscan_api_url: "https://api.polygonscan.com/api",
    },
    events: {
        marketItemcreated:
            "0x6c768f237d15b0eedb46b2f49918dc5109839c2d232c382d377c40fabeeec92d",
        marketItemSold:
            "0x458478e87af2f8355f5200460431fb85259efefed716e75b487251ae55fe04e0",
        cancelList:
            "0x479eb65ea79d564e513a3c8f9004fe589401019b74c96a5aff678d10d393eaed",
    },
    rpcURL: {
        1: "wss://mainnet.infura.io/ws/v3/844d522cc20143f9b896c9617e81c2c3",
        3: "wss://ropsten.infura.io/ws/v3/844d522cc20143f9b896c9617e81c2c3",
        4: "wss://rinkeby.infura.io/ws/v3/844d522cc20143f9b896c9617e81c2c3",
        5: "wss://goerli.infura.io/ws/v3/844d522cc20143f9b896c9617e81c2c3",
        42: "wss://kovan.infura.io/ws/v3/844d522cc20143f9b896c9617e81c2c3",
        56: "https://bsc-dataseed1.binance.org:443",
        137: "https://rpc-mainnet.matic.network",
        80001: {
            1: "https://rpc-mumbai.matic.today/",
            2: "https://rpc-mumbai.maticvigil.com/",
            3: "https://matic-mumbai.chainstacklabs.com/",
        },
    },
    address: {
        multicallAddress: "0x5ba1e12693dc8f9c48aad8770482f4739beed696",
        binance: "0x41263cba59eb80dc200f3e2544eda4ed6a90e76c",
        binanceTest: "0xae11C5B5f29A6a25e955F0CB8ddCc416f522AF5C",
        Ropsten: "0x53c43764255c17bd724f74c4ef150724ac50a3ed",
        xDai: "0xb5b692a88bdfc81ca69dcb1d924f59f0413a602a",
        Polygon: "0x11ce4B23bD875D7F5C6a31084f55fDe1e9A87507",
        Mumbai: "0x08411ADd0b5AA8ee47563b146743C13b3556c9Cc",
    },
    token: {
        Polygon: "0x0000000000000000000000000000000000001010",
    },
    invterval: 1000000,
};
