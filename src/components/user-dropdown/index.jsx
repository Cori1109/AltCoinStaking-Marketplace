import { useState } from "react";
import { useEthers } from "@usedapp/core";
import Blockie from "@components/blockie";
import Anchor from "@ui/anchor";
import Address from "@components/address";
import NativeBalance from "@components/native-balance";
import { getExplorer } from "@helpers/networks";
import { Card, Image, Modal } from "react-bootstrap";
import Button from "@ui/button";

const UserDropdown = (props) => {
    const { activateBrowserWallet, deactivate, account, chainId } = useEthers();
    const [isModalVisible, setIsModalVisible] = useState(false);

    return (
        <div className="icon-box">
            <Blockie currentWallet scale={4} />
            <div className="rn-dropdown">
                <div className="rn-inner-top">
                    <h4 className="title">
                        <Address
                            address={props.address}
                            avatar="left"
                            size={6}
                            copyable
                            style={{ fontSize: "20px" }}
                        />
                    </h4>
                    <span style={{ display: "flex" }}>
                        <Image
                            src="images/icons/coin.png"
                            width={20}
                            height={20}
                            alt="Coin"
                        />
                        <NativeBalance />
                    </span>
                </div>
                <ul className="list-inner">
                    <li>
                        <Anchor path={`/${account}`}>My Collections</Anchor>
                    </li>
                    <li>
                        <Anchor path="#">
                            <div onClick={() => setIsModalVisible(true)}>
                                Disconnect Wallet
                            </div>
                        </Anchor>
                        <Modal
                            show={isModalVisible}
                            onHide={() => setIsModalVisible(false)}
                            centered
                        >
                            <Modal.Header
                                closeButton
                                style={{ background: "#00a3ff", color: "#fff" }}
                            >
                                <Modal.Title>Account</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Card
                                    style={{
                                        padding: "10px",
                                        color: "blue",
                                        borderRadius: "1rem",
                                    }}
                                >
                                    <Address
                                        avatar="left"
                                        size={6}
                                        copyable
                                        style={{ fontSize: "20px" }}
                                    />
                                    <div
                                        style={{
                                            marginTop: "10px",
                                            padding: "0 10px",
                                        }}
                                    >
                                        <a
                                            href={`${getExplorer(
                                                chainId
                                            )}address/${props.account}`}
                                            style={{
                                                color: "#000",
                                            }}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            {/* <SelectOutlined
                                                style={{ marginRight: "5px" }}
                                            /> */}
                                            View on Explorer
                                        </a>
                                    </div>
                                </Card>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button
                                    size="large"
                                    type="primary"
                                    style={{
                                        width: "100%",
                                        marginTop: "10px",
                                        borderRadius: "0.5rem",
                                        fontSize: "16px",
                                        fontWeight: "500",
                                    }}
                                    onClick={() => {
                                        deactivate();
                                        setIsModalVisible(false);
                                    }}
                                >
                                    Disconnect Wallet
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default UserDropdown;
