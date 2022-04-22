import { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { useEthers, useEtherBalance } from "@usedapp/core";
import Logo from "@components/logo";
import MainMenu from "@components/menu/main-menu";
import MobileMenu from "@components/menu/mobile-menu";
import SearchForm from "@components/search-form/layout-01";
import FlyoutSearchForm from "@components/search-form/layout-02";
import UserDropdown from "@components/user-dropdown";
import ColorSwitcher from "@components/color-switcher";
import BurgerButton from "@ui/burger-button";
import Button from "@ui/button";
import { useOffcanvas, useSticky, useFlyoutSearch } from "@hooks";
import { Constants } from "../../../config/constants";
import headerData from "../../../data/general/header-01.json";
import menuData from "../../../data/general/menu-01.json";
import Web3 from "web3";

const Header = ({ className }) => {
    const sticky = useSticky();
    const { activateBrowserWallet, deactivate, activate, account, chainId } =
        useEthers();
    const userBalance = useEtherBalance(account);
    const { offcanvas, offcanvasHandler } = useOffcanvas();
    const { search, searchHandler } = useFlyoutSearch();

    const connectWallet = async () => {
        if (chainId !== Constants.config.chainId) {
            await switchNetwork(Constants.config.chainId);
        }
        activateBrowserWallet();
        console.log("account: ", account, "chainId: ", chainId);
    };

    const switchNetwork = async (chain) => {
        if (window.ethereum) {
            await window.ethereum
                .request({
                    method: "wallet_switchEthereumChain",
                    params: [
                        {
                            chainId: Web3.utils.toHex(chain),
                        },
                    ],
                })
                .then((res) => {
                    console.log("switch network success!", res);
                })
                .catch((err) => {
                    console.log("switch network error: ", err.message);
                });
        }
    };

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
                            {console.log(
                                "account && chainId:",
                                account,
                                chainId,
                                userBalance
                            )}
                            {(!account ||
                                chainId !== Constants.config.chainId) && (
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
                            )}
                            {account && chainId === Constants.config.chainId && (
                                <div className="setting-option rn-icon-list user-account">
                                    <UserDropdown
                                        account={account}
                                        balance={userBalance}
                                    />
                                </div>
                            )}
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
        </>
    );
};

Header.propTypes = {
    className: PropTypes.string,
};

export default Header;
