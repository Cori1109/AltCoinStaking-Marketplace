import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import PropTypes from "prop-types";
import clsx from "clsx";
import { useEthers } from "@usedapp/core";
import Logo from "@components/logo";
import MainMenu from "@components/menu/main-menu";
import MobileMenu from "@components/menu/mobile-menu";
import SearchForm from "@components/search-form/layout-01";
import FlyoutSearchForm from "@components/search-form/layout-02";
import UserDropdown from "@components/user-dropdown";
import ColorSwitcher from "@components/color-switcher";
import BurgerButton from "@ui/burger-button";
import Button from "@ui/button";
import { Modal, Col, Row, Spinner } from "react-bootstrap";
import { useOffcanvas, useSticky, useFlyoutSearch } from "@hooks/css";
import { Constants } from "@config/constants";
import headerData from "../../data/general/header-01.json";
import menuData from "../../data/general/menu-01.json";
import Web3 from "web3";

const web3 = new Web3(Constants.rpcURL[Constants.config.chainId][2]);

const steps = [
    {
        title: "Switch Network",
        content: "Switch Polygon Network!",
    },
    {
        title: "Connect Wallet",
        content: "Connect your wallet!",
    },
];

const Header = ({ className }) => {
    const sticky = useSticky();
    const { activateBrowserWallet, deactivate, activate, account, chainId } =
        useEthers();
    const [chainning, setChainning] = useState(true);
    const [current, setCurrent] = useState(0);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { offcanvas, offcanvasHandler } = useOffcanvas();
    const { search, searchHandler } = useFlyoutSearch();

    const connectWallet = async () => {
        const _chained = chainId != Constants.config.chainId;
        const _cur = _chained ? 0 : 1;
        setCurrent(_cur);
        setChainning(_chained);
        setIsModalVisible(true);
    };

    const next = () => {
        setCurrent(current + 1);
    };

    async function switchNetwork(chain) {
        console.log("window.ethereum", window.ethereum);
        if (window.ethereum) {
            await window.ethereum
                .request({
                    method: "wallet_switchEthereumChain",
                    params: [{ chainId: web3.utils.toHex(chain) }],
                })
                .then((res) => {
                    console.log("switch network success!");
                    toast.success("switch network success!");
                    setChainning(false);
                })
                .catch((err) => {
                    console.log("switch network error: ", err.message);
                    toast.error("switch network error!");
                    setChainning(true);
                });
        }
    }

    return (
        <>
            <header
                className={clsx(
                    "rn-header haeder-default black-logo-version header--fixed header--sticky",
                    sticky && "sticky",
                    className
                )}
            >
                <div className="container">
                    <div className="header-inner">
                        <div className="header-left">
                            <Logo logo={headerData.logo} />
                            <div className="mainmenu-wrapper">
                                <nav
                                    id="sideNav"
                                    className="mainmenu-nav d-none d-xl-block"
                                >
                                    <MainMenu menu={menuData} />
                                </nav>
                            </div>
                        </div>
                        <div className="header-right">
                            <div className="setting-option d-none d-lg-block">
                                <SearchForm />
                            </div>
                            <div className="setting-option rn-icon-list d-block d-lg-none">
                                <div className="icon-box search-mobile-icon">
                                    <button
                                        type="button"
                                        aria-label="Click here to open search form"
                                        onClick={searchHandler}
                                    >
                                        <i className="feather-search" />
                                    </button>
                                </div>
                                <FlyoutSearchForm isOpen={search} />
                            </div>
                            {!account ||
                            chainId !== Constants.config.chainId ? (
                                <div className="setting-option header-btn">
                                    <div className="icon-box">
                                        <Button
                                            color="primary-alta"
                                            className="connectBtn"
                                            size="small"
                                            onClick={() => {
                                                connectWallet();
                                            }}
                                        >
                                            Wallet connect
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <div className="setting-option rn-icon-list user-account">
                                    <UserDropdown account={account} />
                                </div>
                            )}
                            <Modal
                                show={isModalVisible}
                                onHide={() => setIsModalVisible(false)}
                                bodyStyle={{
                                    padding: "15px",
                                    fontSize: "17px",
                                    fontWeight: "500",
                                }}
                                style={{
                                    fontSize: "16px",
                                    fontWeight: "500",
                                }}
                                width="400px"
                            >
                                <Modal.Header
                                    style={{ background: "#00a3ff" }}
                                    closeButton
                                >
                                    <Modal.Title>
                                        <span>{steps[current].title}</span>
                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <span>{steps[current].content}</span>
                                </Modal.Body>
                                <Modal.Footer>
                                    <div className="steps-action">
                                        {current < steps.length - 1 && (
                                            <Button
                                                type="primary"
                                                onClick={() => {
                                                    switchNetwork(
                                                        Constants.config.chainId
                                                    );
                                                    next();
                                                }}
                                            >
                                                Switch Network
                                            </Button>
                                        )}
                                        {current === steps.length - 1 && (
                                            <>
                                                {chainning ? (
                                                    <Button
                                                        disabled
                                                        type="primary"
                                                    >
                                                        <Spinner
                                                            as="span"
                                                            animation="grow"
                                                            size="sm"
                                                            role="status"
                                                            aria-hidden="true"
                                                        />
                                                        Switching Network
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        type="primary"
                                                        onClick={() => {
                                                            activateBrowserWallet();
                                                            setIsModalVisible(
                                                                false
                                                            );
                                                            toast.success(
                                                                "Success Connection!"
                                                            );
                                                            setCurrent(0);
                                                        }}
                                                    >
                                                        Connect Wallet
                                                    </Button>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </Modal.Footer>
                            </Modal>
                            <div className="setting-option mobile-menu-bar d-block d-xl-none">
                                <div className="hamberger">
                                    <BurgerButton onClick={offcanvasHandler} />
                                </div>
                            </div>
                            <div
                                id="my_switcher"
                                className="setting-option my_switcher"
                            >
                                <ColorSwitcher />
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <MobileMenu
                isOpen={offcanvas}
                onClick={offcanvasHandler}
                menu={menuData}
                logo={headerData.logo}
            />
            <Toaster
                position="top-right"
                toastOptions={{
                    success: {
                        style: {
                            background: "white",
                            paddingLeft: 40,
                            paddingRight: 40,
                            fontWeight: 500,
                        },
                    },
                    error: {
                        style: {
                            background: "white",
                            color: "black",
                            paddingLeft: 40,
                            paddingRight: 40,
                            fontWeight: 500,
                        },
                    },
                }}
            />
        </>
    );
};

Header.propTypes = {
    className: PropTypes.string,
};

export default Header;
