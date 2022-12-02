import ABI from './ABI.json'
import Web3 from 'web3'
const waitForReceipt = (web3,tx, cb,error) => {
    web3.eth.getTransactionReceipt(tx, function (err, receipt) {
      if (err) {
        error(err);
      }
      if (receipt !== null) {
        if (cb) {
          cb(receipt);
        }
      } else {
        window.setTimeout(function () {
          waitForReceipt(web3,tx, cb);
        }, 1000);
      }
    })
  }

export const mintOneNFT = async(from,uri,idStr,provider,callback,error) => {
    try {
        let web3 = new Web3(provider);
        const contract = new web3.eth.Contract(ABI,process.env.REACT_APP_COLLECTION_ADDRESS_TX);
        await contract.methods.mint(uri,idStr).send(
         { from: from},
         (err,tx)=> {
            if(err) {
                error(err)
            }
            if(tx) {
                waitForReceipt(web3,tx,(receipt)=>{
                    const typesArray = [
                        {type: 'address', name: '_from'}, 
                        {type: 'string', name: 'uri'},
                        {type: 'uint256', name: 'tokenId'},
                        {type: 'uint256', name: 'amount'}
                    ];
                    let decodedParameters = web3.eth.abi.decodeParameters(typesArray, receipt.logs[1].data);
                    if(decodedParameters._from == from && decodedParameters.uri == uri) {
                        const data = {
                            token_id : parseInt(decodedParameters.tokenId),
                            transaction : receipt.transactionHash,
                        }
                        callback(data)
                    }
                },(err) => {
                    error(err)
                })
            }
         }
        )
    } catch (err) {
        error(err)
    }
}