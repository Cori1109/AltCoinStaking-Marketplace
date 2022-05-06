import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import TabContainer from "react-bootstrap/TabContainer";
import TabContent from "react-bootstrap/TabContent";
import TabPane from "react-bootstrap/TabPane";
import { Table } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import DetailsTabContent from "./details-tab-content";
import { getEllipsisTxt } from "@helpers/formatters";
import { Constants } from "@config/constants";

const BidTab = ({ className, tokenId, owner, properties, tags }) => {
    const [dataList, setDataList] = useState([]);

    useEffect(async () => {
        await getTransHistory();
    });

    const getTopicTwo = () => {
        const _toId = String(tokenId);
        const _topic =
            "0x0000000000000000000000000000000000000000000000000000000000000000";
        const _topicTwo = _topic
            .slice(0, _topic.length - _toId.length)
            .concat(_toId);
        return _topicTwo;
    };

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

    const getTransHistory = async () => {
        const _topic2 = getTopicTwo();
        const URL = `${process.env.POLYGONSCAN_API_URL}?module=logs&action=getLogs&fromBlock=0&toBlock=99999999&address=${process.env.MARKETPLACE_ADDRESS}&topic2=${_topic2}&apikey=${process.env.POLYGONSCAN_API_KEY}`;
        axios.get(URL).then(
            (response) => {
                if (response.data.status != 1) {
                    toast.error(response.data.message);
                } else {
                    if (response.data.message == "OK") {
                        const result = response.data.result;
                        let _dataList = [];

                        for (let i = result.length - 1; i >= 0; i--) {
                            let _event;
                            let _from;
                            let _to;
                            let _price;
                            switch (result[i].topics[0]) {
                                case Constants.events.marketItemcreated: // MarketItemCreated
                                    _event = "List";
                                    _from = getAddress(result[i].topics[3]);
                                    _price = getPrice(result[i].data);
                                    break;
                                case Constants.events.marketItemSold: // MarketItemSold
                                    _event = "Sale";
                                    _from = getAddress(
                                        result[i].data.slice(0, 66)
                                    );
                                    _to = getAddress(result[i].topics[3]);
                                    _price = getPrice(result[i].data);
                                    break;
                                case Constants.events.cancelList: // CancelList
                                    _event = "Cancel";
                                    _from = getAddress(result[i].topics[1]);
                                    break;

                                default:
                                    break;
                            }
                            const data = {
                                event: _event,
                                price: _price ? _price + "MATIC" : "",
                                from: _from,
                                to: _to ? _to : "",
                                date: new Date(
                                    parseInt(result[i].timeStamp) * 1000
                                ).toLocaleDateString("en-US"),
                                transaction: getEllipsisTxt(
                                    result[i].transactionHash,
                                    4
                                ),
                                txUrl: `https://mumbai.polygonscan.com/tx/${result[i].transactionHash}`,
                            };

                            _dataList.push(data);
                        }

                        setDataList(_dataList);
                    }
                }
            },
            (error) => {
                toast.error("Can't connect to the Server!");
            }
        );
    };

    return (
        <TabContainer defaultActiveKey="nav-profile">
            <div className={clsx("tab-wrapper-one", className)}>
                <nav className="tab-button-one">
                    <Nav as="div" className="nav-tabs">
                        <Nav.Link as="button" eventKey="nav-profile">
                            Details
                        </Nav.Link>
                        <Nav.Link as="button" eventKey="nav-contact">
                            History
                        </Nav.Link>
                    </Nav>
                </nav>
                <TabContent className="rn-bid-content">
                    <TabPane eventKey="nav-profile">
                        <DetailsTabContent
                            owner={owner}
                            properties={properties}
                            // tags={tags}
                        />
                    </TabPane>
                    <TabPane eventKey="nav-contact">
                        <div className="pd-table-box">
                            <Table responsive className="pdTable">
                                <thead>
                                    <tr
                                        style={{
                                            fontWeight: "bold",
                                            color: "#fff",
                                        }}
                                    >
                                        <th>Event</th>
                                        <th>Price</th>
                                        <th>From</th>
                                        <th>To</th>
                                        <th>Transaction</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataList?.map((data) => (
                                        <tr>
                                            <td style={{ color: "#fff" }}>
                                                {data.event}
                                            </td>
                                            <td>{data.price}</td>
                                            <td>
                                                <a
                                                    href={`https://mumbai.polygonscan.com/address/${data.from}`}
                                                    target="_blank"
                                                >
                                                    {getEllipsisTxt(
                                                        data.from,
                                                        4
                                                    )}
                                                </a>
                                            </td>
                                            <td>
                                                <a
                                                    href={`https://mumbai.polygonscan.com/address/${data.to}`}
                                                    target="_blank"
                                                >
                                                    {getEllipsisTxt(data.to, 4)}
                                                </a>
                                            </td>
                                            <td>
                                                <a
                                                    href={`https://mumbai.polygonscan.com/tx/${data.transaction}`}
                                                    target="_blank"
                                                >
                                                    {getEllipsisTxt(
                                                        data.transaction,
                                                        4
                                                    )}
                                                </a>
                                            </td>
                                            <td>{data.date}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </TabPane>
                </TabContent>
            </div>
        </TabContainer>
    );
};

BidTab.propTypes = {
    className: PropTypes.string,
    bids: PropTypes.arrayOf(PropTypes.shape({})),
    owner: PropTypes.shape({}),
    properties: PropTypes.arrayOf(PropTypes.shape({})),
    tags: PropTypes.arrayOf(PropTypes.shape({})),
    history: PropTypes.arrayOf(PropTypes.shape({})),
};

export default BidTab;
