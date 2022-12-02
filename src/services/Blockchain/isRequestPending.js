import Web3 from 'web3'

export const isPendingByAddress = (provider, account) =>  {
    try {
        console.log("Llama a isPendingByAddress");

        let web3 = new Web3(provider);
        web3.eth.subscribe('pendingTransactions', function(error, result){
            if (!error)
                console.log(result);
        })
        .on("data", function(transaction){
            console.log(transaction);
            console.log(account);
        });
        //for entry in new_entries:             
        //tx = w3.eth.getTransaction(entry)
        //if(tx.from == "yourAddress"):
        //    print("got pending transaction from: ", tx.from)
    } catch (error) {
        console.log(error)
    }

}


export const isPendingAll = (provider) => {
    return new Promise((resolve,reject) => {
        let isPending = { isPending : true, tx : null}
        let pending = JSON.parse(localStorage.getItem('pending'))
        try {
            let tx = null;
            let web3 = new Web3(provider);
            if (pending) {
                if (pending.length > 0) {
                    pending.forEach((request, indexRequest) => {
                        if ( request.transaction) {
                            try {
                                tx = request.transaction;
                                web3.eth.getTransactionReceipt(request.transaction, function (err, receipt) {
                                    if (err) {
                                      console.log(err)
                                    }
                                    console.log("Pending all",receipt)
                                    console.log("Pending err",err)
                                    if (receipt !== null) {
                                        if (indexRequest >= 0) {
                                            pending.splice(indexRequest,1);
                                            localStorage.setItem('pending', JSON.stringify(pending))
                                        } else {
                                            isPending.isPending = true
                                            isPending.tx = tx
                                            //resolve(isPending)
                                        }
                                    } else {
                                        console.log('Entra en el error')
                                        web3.eth.getTransaction(request.transaction).then((success) => {
                                            console.log('success ::',success)
                                            if (success == null) {
                                                console.log('success tx ::',success)
                                                if (indexRequest >= 0) {
                                                    pending.splice(indexRequest,1);
                                                    localStorage.setItem('pending', JSON.stringify(pending))
                                                }
                                            }
                                        }).catch((error) => {
                                            console.log(error)
                                        })
                                    }
                                })
                            } catch (error) {
                                console.log(error)
                            }
                        } else {
                            if (indexRequest >= 0) {
                                pending.splice(indexRequest,1);
                                console.log(pending)
                                localStorage.setItem('pending', JSON.stringify(pending))
                            }
                        }
                    });
                    pending = JSON.parse(localStorage.getItem('pending'))
                    if (pending.length > 0) {
                        isPending.tx = tx
                        isPending.isPending = true
                        resolve(isPending)
                    } else {
                        isPending.isPending = false
                        resolve(isPending)
                    }
                   // isPending.tx = tx
                } else {
                    isPending.isPending = false
                    resolve(isPending)
                }
            } else {
                isPending.isPending = false
                resolve(isPending)
            }
        } catch(err) {
            console.log(err)
            isPending.isPending = false
            reject(isPending)
        }
    })
}

export const isRequestPending = async(provider,tokenID) => {
    console.log('tokenID ::',tokenID)
        return new Promise((resolve,reject) => {
            let isPending = { isPending : true, tx : null}
            try {
                let web3 = new Web3(provider);
                let pending = JSON.parse(localStorage.getItem('pending'))
                if (pending) {
                    if (pending.length > 0) {
                        let tx = null;
                        let requestFound = null;
                        pending.forEach(request => {
                            if (Array.isArray(request)) {
                                if(request.offers.includes(tokenID)) {
                                    tx = request.transaction;
                                    requestFound = request;
                                }
                            }
                        });
                        if (tx) {
                            web3.eth.getTransactionReceipt(tx, function (err, receipt) {
                                if (err) {
                                  reject(err)
                                }
                                if (receipt !== null) {
                                    let index = pending.indexOf(requestFound);
                                    if (index >= 0) {
                                        pending.splice(index,1);
                                        localStorage.setItem('pending', JSON.stringify(pending))
                                    }
                                    isPending.isPending = false
                                    isPending.tx = tx
                                    resolve(isPending)
                                } else {
                                    isPending.isPending = true
                                    isPending.tx = tx
                                    resolve(isPending)
                                }
                            })
                        } else {

                            isPending.isPending = false
                            resolve(isPending)
                        }
                    } else {

                        isPending.isPending = false
                        resolve(isPending)
                    }
                } else {
                    isPending.isPending = false
                    resolve(isPending)
                }
            } catch(err) {
                isPending.isPending = false
                resolve(isPending)
            }
        })
}
