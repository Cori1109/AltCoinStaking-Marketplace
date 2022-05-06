import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Constants } from "@config/constants";
import web3 from "web3";

const URL = `${process.env.POLYGONSCAN_API_URL}?module=logs&action=getLogs&fromBlock=0&toBlock=99999999&address=${process.env.MARKETPLACE_ADDRESS}&apikey=${process.env.POLYGONSCAN_API_KEY}`;

export const GetPriceById = async (_tokenId, setPrice) => {
    const getTopicTwo = (tokenId) => {
        let _toId = String(web3.utils.numberToHex(tokenId));
        _toId = _toId.slice(2, _toId.length);
        const _topic =
            "0x0000000000000000000000000000000000000000000000000000000000000000";
        const _topicTwo = _topic
            .slice(0, _topic.length - _toId.length)
            .concat(_toId);
        return _topicTwo;
    };

    const _topic2 = getTopicTwo(_tokenId);
    const _URL = `${URL}&topic2=${_topic2}`;
    console.log("apiurl------", _URL);
    await axios.get(_URL).then(
        (response) => {
            if (response.data.status != 1) {
                return setPrice({ itemId: null, price: 0 });
            } else {
                if (response.data.message == "OK") {
                    const result = response.data.result;
                    for (let i = result.length - 1; i >= 0; i--) {
                        let _event;
                        let _priceWei;
                        let _itemId;
                        switch (result[i].topics[0]) {
                            case Constants.events.marketItemcreated: // MarketItemCreated
                                _event = "List";
                                const _pString =
                                    "0x" +
                                    result[i].data.slice(
                                        result[i].data.length - 64,
                                        result[i].data.length
                                    );
                                _priceWei = parseInt(_pString);
                                _itemId = parseInt(result[i].topics[1]);
                                return setPrice({
                                    itemId: _itemId,
                                    price: _priceWei,
                                });
                            case Constants.events.marketItemSold: // MarketItemSold
                                _event = "Sale";
                                _itemId = parseInt(result[i].topics[1]);
                                return setPrice({ itemId: _itemId, price: 0 });
                            case Constants.events.cancelList: // CancelList
                                _event = "Cancel";
                                _itemId = parseInt(result[i].topics[1]);
                                return setPrice({ itemId: _itemId, price: 0 });

                            default:
                                break;
                        }
                    }
                    return setPrice({ itemId: null, price: 0 });
                }
            }
            return setPrice({ itemId: null, price: 0 });
        },
        (error) => {
            toast.error("Can't connect to the Server!");
        }
    );
};

export const GetTransHistory = async (
    cntPerPage,
    setDataList,
    setNumberOfPages
) => {
    const getAddress = (_aStr) => {
        const _address = "0x" + _aStr.slice(_aStr.length - 40, _aStr.length);
        return _address;
    };

    const getPrice = (_pStr) => {
        const _pString = "0x" + _pStr.slice(_pStr.length - 64, _pStr.length);
        const _priceWei = parseInt(_pString);
        const _priceMatic = parseFloat(_priceWei / Math.pow(10, 18)).toFixed(2);
        return String(_priceMatic);
    };

    axios.get(URL).then(
        (response) => {
            if (response.data.status != 1) {
                toast.error(response.data.message);
            } else {
                if (response.data.message == "OK") {
                    const result = response.data.result;
                    let _dataList = [];
                    let _cnt = 0;

                    for (let i = result.length - 1; i >= 0; i--) {
                        let _event;
                        let _from;
                        let _to;
                        let _tokenId;
                        let _price;
                        switch (result[i].topics[0]) {
                            case Constants.events.marketItemcreated: // MarketItemCreated
                                _event = "List";
                                _from = getAddress(result[i].topics[3]);
                                _tokenId = parseInt(result[i].topics[2]);
                                _price = getPrice(result[i].data);
                                break;
                            case Constants.events.marketItemSold: // MarketItemSold
                                _event = "Sale";
                                _from = getAddress(result[i].data.slice(0, 66));
                                _to = getAddress(result[i].topics[3]);
                                _tokenId = parseInt(result[i].topics[2]);
                                _price = getPrice(result[i].data);
                                break;
                            case Constants.events.cancelList: // CancelList
                                _event = "Cancel";
                                _from = getAddress(result[i].topics[1]);
                                _tokenId = parseInt(result[i].topics[2]);
                                break;

                            default:
                                break;
                        }
                        if (_event) {
                            _cnt++;
                            const historyData = {
                                event: _event,
                                price: _price ? _price + "MATIC" : "",
                                from: _from,
                                to: _to ? _to : "",
                                tokenId: _tokenId,
                                date: new Date(
                                    parseInt(result[i].timeStamp) * 1000
                                ).toLocaleDateString("en-US"),
                                transaction: result[i].transactionHash,
                                txUrl: `https://mumbai.polygonscan.com/tx/${result[i].transactionHash}`,
                            };

                            _dataList.push(historyData);
                        }
                    }
                    setNumberOfPages(Math.ceil(_cnt / cntPerPage));
                    setDataList(_dataList);
                }
            }
        },
        (error) => {
            toast.error("Can't connect to the Server!");
        }
    );
};
