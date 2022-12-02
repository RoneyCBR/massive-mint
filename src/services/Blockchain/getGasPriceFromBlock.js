export const getGasPriceFromBlock = async(web3) => {
    try {
        let gasPrice = await web3.eth.getGasPrice()
        let block = await web3.eth.getBlock("latest");
        if(block.transactions.length > 0) {
            let max = block.transactions.length - 1;
            let transaction = await web3.eth.getTransaction(block.transactions[max]);
            if(transaction.gasPrice) {
                let gasPriceOld = Number(transaction.gasPrice)
                if(gasPriceOld > gasPrice) {
                    gasPrice = gasPriceOld
                }
            }
            for (let index = 0; index <5; index++) {
                let id =  Math.random() * max
                transaction = await web3.eth.getTransaction(block.transactions[id]);
                let gasPriceOld = Number(transaction.gasPrice)
                if(gasPriceOld > gasPrice) {
                    gasPrice = gasPriceOld
                }
            }
        }
        return gasPrice
    } catch (error) {
        let gasPrice = await web3.eth.getGasPrice()
        return gasPrice
    }
}