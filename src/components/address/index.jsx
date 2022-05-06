import { useEffect, useState } from "react";
import { useEthers } from "@usedapp/core";
import { getEllipsisTxt } from "@helpers/formatters";

const styles = {
    address: {
        height: "36px",
        display: "flex",
        gap: "8px",
        borderRadius: "9px",
        paddingTop: "3px",
    },
};

const Check = () => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        strokeWidth="3"
        stroke="#21BF96"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M5 12l5 5l10 -10" />
        <title id="copied-address">Copied!</title>
    </svg>
);

function Address(props) {
    const { account } = useEthers();
    const [address, setAddress] = useState();
    const [isClicked, setIsClicked] = useState(false);

    const Copy = () => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="#1780FF"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ cursor: "pointer" }}
            onClick={() => {
                navigator.clipboard.writeText(address);
                localStorage.setItem("address", address);
                setIsClicked(true);
            }}
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M15 3v4a1 1 0 0 0 1 1h4" />
            <path d="M18 17h-7a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h4l5 5v7a2 2 0 0 1 -2 2z" />
            <path d="M16 17v2a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h2" />
            <title id="copy-address">Copy Address</title>
        </svg>
    );

    useEffect(() => {
        setAddress(props?.address || account);
    }, [account, props]);

    if (!address) return null;

    return (
        <div style={{ ...styles.address, ...props.style }}>
            <p>{props.size ? getEllipsisTxt(address, props.size) : address}</p>
            {props.copyable && (isClicked ? <Check /> : <Copy />)}
        </div>
    );
}

export default Address;
