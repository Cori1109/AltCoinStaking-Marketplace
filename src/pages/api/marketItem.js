// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createWatcher } from "@makerdao/multicall";
import { config } from "@config/multicall";
import { FetchMetadata } from "@hooks/FetchMetadata";
import { GetTotalSupply, GetBaseURI } from "@hooks/GetBaseData";
import { useIPFS } from "@hooks/useIPFS";
import { GetPriceById } from "@hooks/UseAPI";

export default async function handler(req, res) {
    const nft_address = process.env.NFT_ADDRESS;
    const { resolveLink } = useIPFS();
    const totalSupply = await GetTotalSupply();
    const baseTokenURI = await GetBaseURI();

    const createTokenIDWatcher = (_total, addr) => {
        const watcherJson = [];
        for (let i = 0; i < _total; i++) {
            watcherJson.push({
                target: addr,
                call: ["tokenByIndex(uint256)(uint256)", i],
                returns: [["tokenId" + i, (val) => val]],
            });
        }
        return watcherJson;
    };

    const createTokenURIWatcher = (tokenIDs, addr) => {
        const watcherJson = [];
        for (let i = 0; i < tokenIDs.length; i++) {
            const indexURI = i * 2;
            const indexOwner = i * 2 + 1;
            watcherJson.push(
                {
                    target: addr,
                    call: ["tokenURI(uint256)(string)", tokenIDs[i]],
                    returns: [["tokenURI" + indexURI, (val) => val]],
                },
                {
                    target: addr,
                    call: ["ownerOf(uint256)(address)", tokenIDs[i]],
                    returns: [["owner" + indexOwner, (val) => val]],
                }
            );
        }
        return watcherJson;
    };

    const watcherTokenIDs = createWatcher(
        createTokenIDWatcher(totalSupply, nft_address),
        config
    );

    watcherTokenIDs.batch().subscribe(async (updates) => {
        watcherTokenIDs.stop();
        // Handle batched updates here
        let tokenIds = [];
        for (let i = 0; i < updates.length; i++) {
            const tokenId = updates[i].value.toNumber();
            tokenIds.push(tokenId);
            // console.log(updates[i].type, tokenId);
        }

        // get token uri
        const watcherTokenURIs = createWatcher(
            createTokenURIWatcher(tokenIds, nft_address),
            config
        );

        watcherTokenURIs.batch().subscribe(async (updates1) => {
            watcherTokenURIs.stop();
            let tokenURIs = [];
            let owners = [];
            let _marketItem = [];

            for (let i = 0; i < updates1.length; i++) {
                const tokenStr = "tokenURI" + `${i}`;
                const ownerStr = "owner" + `${i}`;
                if (updates1[i].type === tokenStr) {
                    tokenURIs.push(updates1[i].value);
                }
                if (updates1[i].type === ownerStr) {
                    owners.push(updates1[i].value);
                }
                // console.log(updates1[i].type, updates1[i].value);
            }
            for (let i = 0; i < tokenIds.length; i++) {
                // const metadata = await FetchMetadata(tokenURIs[i]);
                const metadata = await FetchMetadata(
                    `${baseTokenURI}${tokenIds[i]}`
                );
                // console.log("metadata", metadata);
                const name = metadata ? resolveLink(metadata.name) : null;
                const description = metadata
                    ? resolveLink(metadata.description)
                    : null;
                const imageURI = metadata ? resolveLink(metadata.image) : null;
                console.log("imageURI:", imageURI);
                const attributes = metadata
                    ? resolveLink(metadata.attributes)
                    : null;
                await GetPriceById(tokenIds[i], ({ itemId, price }) => {
                    _marketItem.push({
                        id: i,
                        tokenId: tokenIds[i],
                        name: name,
                        owner: owners[i],
                        nftAddress: nft_address,
                        image: imageURI,
                        price: parseFloat(price / Math.pow(10, 18)).toFixed(3),
                        itemId: itemId,
                        // tokenURI: tokenURIs[i],
                        tokenURI: `${baseTokenURI}${tokenIds[i]}`,
                        attributes: attributes,
                    });
                });
            }

            res.status(200).json(
                JSON.stringify({
                    data: _marketItem,
                })
            );
        });
        watcherTokenURIs.start();
    });
    watcherTokenIDs.start();
}
