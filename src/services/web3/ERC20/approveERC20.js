import ABI from './ABI.json'
import Web3 from 'web3'

const domainType = [
    {name:"name",type:"string"},
    {name:"version",type:"string"},
    {name:"verifyingContract",type:"address"},
    {name:"salt",type:"bytes32"},
];
const metaTransactionType = [
    {name:"nonce",type:"uint256"},
    {name:"from",type:"address"},
    {name:"functionSignature",type:"bytes"}
];

let domainData = {
    name:"Wrapped Ether", //your dapp name as in your contract
    version: "1", //version as per your contract
    verifyingContract: '0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa', //contract address
    salt: '0x'+(137).toString(16).padStart(64,'0') //For mainnet replace 80001 with 137
  }
  

export const approveERC20 = async(amount, web3Biconomy, provider, address, callback, error) => {
    try {
        let walletWeb3 = new Web3(provider);
        const contract = new web3Biconomy.eth.Contract(ABI,process.env.REACT_APP_ERC_20_CONTRACT);
        let nonce = await contract.methods.getNonce(address).call();
        let wei = walletWeb3.utils.toWei(""+amount);
        console.log('Wei to approve :::', wei)
        let functionSignature = contract.methods.approve(process.env.REACT_APP_VERIFY_CONTRACT,wei).encodeABI();
        let message = {};
        message.nonce = parseInt(nonce);
        message.from = address;
        message.functionSignature = functionSignature;
        const dataToSign = JSON.stringify({
            types:{
              EIP712Domain: domainType,
              MetaTransaction: metaTransactionType 
            },
            domain:domainData,
            primaryType: "MetaTransaction",
            message:message
        });
        walletWeb3.currentProvider.sendAsync({
            jsonrpc:"2.0",
            id:999999999999,
            method:"eth_signTypedData_v4",
            params: [address,dataToSign]
          },async function(e,result){
            if(e){
                error(e)
                //return console.error(e);
            }
            console.log("Signature result from wallet :",result)
            if(result && result.result) {
                const signature = result.result.substring(2);
                const r = "0x" + signature.substring(0,64);
                const s = "0x" + signature.substring(64,128);
                const v = parseInt(signature.substring(128,130),16);
                console.log(r,"r")
                console.log(s,"s")
                console.log(v,"v")
                console.log(address,"userAddress")
                const promiseEvent = contract.methods.executeMetaTransaction(address,functionSignature,r,s,v).send({ from: address })
                promiseEvent.on("transactionHash",(hash)=>{
                    console.log("Transaction sent successfully. Check console for Transaction hash")
                    console.log("Transaction Hash is ",hash)
                }).once("confirmation",(confirmationNumber,receipt)=>{
                    if(receipt.status){
                        callback(receipt)
                      console.log("Transaction processed successfully")
                    }else{
                        error(receipt)
                      console.log("Transaction failed");
                    }
                    console.log(receipt)
                }).once('error', (e) => {
                    error(e)
                    console.log('error',e)
                })
            } else {
                console.log("Could not get user signature. Check console for error")
            }
    
        })
    } catch (e) {
        error(e)
    }
}