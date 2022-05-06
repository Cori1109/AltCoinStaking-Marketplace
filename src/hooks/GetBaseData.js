import Web3 from "web3";
import NFTABI from "src/abi/NFTABI";
import MaticTokenABI from "src/abi/MaticTokenABI";
import { Constants } from "src/config/constants";

const web3 = new Web3(Constants.rpcURL[process.env.CHAIN_ID][2]);

export const GetBalAccount = async (account) => {
    const tokenInst = new web3.eth.Contract(
        MaticTokenABI,
        Constants.token.Polygon
    );
    const _balMatic = await tokenInst.methods
        .balanceOf(account)
        .call()
        .then((res) => {
            return res;
        })
        .catch((err) => {
            console.log("error", err);
        });
    return _balMatic;
};

export const GetMintedCnt = async (_stage) => {
    const nftInst = new web3.eth.Contract(NFTABI, process.env.NFT_ADDRESS);
    const _mintedCnt = await nftInst.methods
        .mintedCnt(_stage)
        .call()
        .then((res) => {
            return res;
        })
        .catch((err) => {
            console.log("err", err);
            return null;
        });
    return _mintedCnt;
};

export const GetTotalSupply = async () => {
    const nftInst = new web3.eth.Contract(NFTABI, process.env.NFT_ADDRESS);
    const totalSup = await nftInst.methods
        .totalSupply()
        .call()
        .then((res) => {
            return res;
        })
        .catch((err) => {
            console.log("err", err);
            return null;
        });
    return totalSup;
};

export const GetBalanceOf = async (_address) => {
    const nftInst = new web3.eth.Contract(NFTABI, process.env.NFT_ADDRESS);
    const balanceOf = await nftInst.methods
        .balanceOf(_address)
        .call()
        .then((res) => {
            return res;
        })
        .catch((err) => {
            console.log("err", err);
            return null;
        });
    return balanceOf;
};

export const GetBaseURI = async () => {
    const nftInst = new web3.eth.Contract(NFTABI, process.env.NFT_ADDRESS);
    const _baseURI = await nftInst.methods
        .baseTokenURI()
        .call()
        .then((res) => {
            return res;
        })
        .catch((err) => {
            console.log("err", err);
            return null;
        });
    return _baseURI;
};
