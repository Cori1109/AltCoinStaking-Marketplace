import toast, { Toaster } from "react-hot-toast";
import MarketplaceABI from "src/abi/Marketplace-ABI";
import { ethers } from "ethers";

const approveABI = [
    {
        inputs: [
            { internalType: "address", name: "to", type: "address" },
            {
                internalType: "tokenId",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "approve",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];

export const GetApprove = async (address, tokenId) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const zenContract = new ethers.Contract(
        address,
        approveABI,
        provider.getSigner()
    );
    try {
        await zenContract
            .approve(address, tokenId)
            .then((tx) => {
                return tx.wait().then(
                    (receipt) => {
                        // This is entered if the transaction receipt indicates success
                        console.log("receipt", receipt);
                        toast.success("Approve Success!");
                        return true;
                    },
                    (error) => {
                        console.log("error", error);
                        toast.error("Approve Cancelled!");
                    }
                );
            })
            .catch((err) => {
                console.log("error", err);
            });
    } catch (error) {
        console.log("error", error);
    }
};

export const CancelSale = async (tokenId) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const marketplaceContract = new ethers.Contract(
        process.env.MARKETPLACE_ADDRESS,
        MarketplaceABI,
        provider.getSigner()
    );
    try {
        await marketplaceContract
            .cancelSale(tokenId)
            .then((tx) => {
                return tx.wait().then(
                    (receipt) => {
                        // This is entered if the transaction receipt indicates success
                        console.log("receipt", receipt);
                        toast.success("List Cancelled!");
                        return true;
                    },
                    (error) => {
                        console.log("error", error);
                        toast.error("List Cancel Failed!");
                    }
                );
            })
            .catch((err) => {
                console.log("error", err);
            });
    } catch (error) {
        console.log("error", error);
    }
};

export const CreateMarketItem = async (contract, tokenId, price) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const marketplaceContract = new ethers.Contract(
        process.env.MARKETPLACE_ADDRESS,
        MarketplaceABI,
        provider.getSigner()
    );
    try {
        await marketplaceContract
            .createMarketItem(contract, tokenId, price)
            .then((tx) => {
                return tx.wait().then(
                    (receipt) => {
                        // This is entered if the transaction receipt indicates success
                        console.log("receipt", receipt);
                        toast.success("CreateMarketItem Success!");
                        return true;
                    },
                    (error) => {
                        console.log("error", error);
                        toast.error("CreateMarketItem Cancelled!");
                    }
                );
            })
            .catch((err) => {
                console.log("error", err);
            });
    } catch (error) {
        console.log("error", error);
    }
};

export const CreateMarketSale = async (contract, tokenId, price) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const marketplaceContract = new ethers.Contract(
        process.env.MARKETPLACE_ADDRESS,
        MarketplaceABI,
        provider.getSigner()
    );
    try {
        await marketplaceContract
            .createMarketSale(contract, tokenId, {
                value: ethers.utils.parseEther(price.toString()),
            })
            .then((tx) => {
                return tx.wait().then(
                    (receipt) => {
                        // This is entered if the transaction receipt indicates success
                        console.log("receipt", receipt);
                        toast.success("Buy Success!");
                        return true;
                    },
                    (error) => {
                        console.log("error", error);
                        toast.error("Buy Failed!");
                    }
                );
            })
            .catch((err) => {
                console.log("error", err);
            });
    } catch (error) {
        console.log("error", error);
    }
};
