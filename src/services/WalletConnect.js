import WalletConnectProvider from "@walletconnect/web3-provider";
import web3Provider from 'services/web3'

const WalletConnect = async() => {
    const provider = new WalletConnectProvider({
        infuraId: 'f15b0b1855494d94bdd6c0fdd5a3cb1a',
        rpc: {
            43113: `${process.env.REACT_APP_RPC}`,
            43114: `${process.env.REACT_APP_RPC}`
        }
        //infuraId: "4f3f9725c268439db4aee88df5fe4caf",
        //rpc: {137: "https://matic-mainnet.chainstacklabs.com"}
        //chainId: 137
        //chainId: 56,
        //chainId: 137,
        //chainId: 80001
    });
    await provider.enable();
    return new Promise((resolve, reject) => {
        try {
            web3Provider(provider).then((res) => {
                localStorage.setItem('walletConnect', true);
                localStorage.setItem('wallet', true);
                resolve(res);
            });
            provider.on('accountsChanged', (accounts) => {
                if (accounts.length == 0) {
                    localStorage.removeItem('walletConnect');
                    localStorage.removeItem('wallet');
                    window.location.reload();
                } else {
                    web3Provider(provider).then((res) => {
                        resolve(res);
                    });
                }
            });
            provider.removeListener('accountsChanged', (accounts) => {
                if (accounts.length == 0) {
                    localStorage.removeItem('walletConnect');
                    localStorage.removeItem('wallet');
                    window.location.reload();
                } else {
                    web3Provider(provider).then((res) => {
                        resolve(res);
                    });
                }
            });
            provider.on('chainChanged', (chainId) => {
                console.log(chainId);
                web3Provider(provider).then((res) => {
                    resolve(res);
                });
                window.location.reload();
            });
            provider.removeListener('chainChanged', (chainId) => {
                console.log(chainId);
                web3Provider(provider).then((res) => {
                    resolve(res);
                });
                window.location.reload();
            });
            provider.on('disconnect', (code, reason) => {
                console.log(code, reason);
                localStorage.removeItem('walletConnect');
                window.location.reload();
            });
            provider.removeListener('disconnect', (code, reason) => {
                console.log(code, reason);
                localStorage.removeItem('walletConnect');
                window.location.reload();
            });
        } catch (error) {
            console.error('walletConnect error::', error);
            reject(error);
        }
    });
};

export default WalletConnect