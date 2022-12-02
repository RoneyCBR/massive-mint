import Web3 from 'web3'
import { validateTx } from 'services/User/getIfHaveTxt';
   
const validateAddressWalletAndContract= (wallet,contract,txHash) => {
    const {from,to} = txHash;
    //wallet address == contract address
    if(String(from+'').toUpperCase() === String(wallet+'').toUpperCase() && String(to+'').toUpperCase(contract) === String(+'').toUpperCase()){
        return true;
    }else{
        return null;
    }
}

const handleListener = async(wallet,txHash) =>{
    try {
        // Instantiate web3 with HttpProvider
        const web3Http = new Web3(process.env.REACT_APP_WS_SERVICE)

        // Get transaction details
        const trx = await web3Http.eth.getTransaction(txHash)
        const valid = validateAddressWalletAndContract(wallet,process.env.REACT_APP_MINT_LIST_ADDRESS,trx)
        // If transaction is not valid, simply return
        if (valid == null) return null;

        //endpoint server
        let validate = await validateTx(wallet,trx.hash)
        console.log("debug  use endpoint",validate);
    }
    catch (error) {
        console.log(error)
    }

}

export const listenTxt = (wallet) => {
    try {
        const web3 = new Web3(new Web3.providers.WebsocketProvider(process.env.REACT_APP_WS_SERVICE))
        const subscription = web3.eth.subscribe('pendingTransactions')
        // Subscribe to pending transactions
        if(subscription){
            subscription.subscribe((error) => {
                if (error){ 
                    console.log(error);
                    subscription.unsubscribe(function(error, success){
                        if(success)
                            console.log('Successfully unsubscribed!');
                    }); 
                }
            }).on('data', (txHash) => {
                handleListener(wallet,txHash);
            })

            subscription.unsubscribe(function(error, success){
                if(success)
                    console.log('Successfully unsubscribed!');
            });
        }
    }
    catch (error) {
        console.log(error)
    }
}
