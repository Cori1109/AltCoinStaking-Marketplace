import { useState, useEffect } from "react";
import { useEthers } from "@usedapp/core";
import { tokenValueTxt } from "@helpers/formatters";
import { networkConfigs } from "@helpers/networks";
import { GetBalAccount } from "@hooks/GetBaseData";

function NativeBalance() {
    const { account, chainId } = useEthers();
    const [nativeName, setNativeName] = useState();
    const [balance, setBalance] = useState(0);

    useEffect(async () => {
        if (account && chainId) {
            console.log("nativebalance", account, chainId);
            setNativeName(networkConfigs[chainId]?.currencySymbol);
            const tmp_bal = await GetBalAccount(account);
            setBalance(tmp_bal);
        }
    }, [account, chainId]);

    console.log("balance", balance);

    return (
        balance > 0 && (
            <div
                style={{ whiteSpace: "nowrap", marginLeft: "5px" }}
            >{`${tokenValueTxt(balance, 18, nativeName)}`}</div>
        )
    );
}

export default NativeBalance;
