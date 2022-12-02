import Web3 from 'web3'
import Contract from './PerseaSimpleCollection.json'

export const updatePrice = async(price,from,to,provider) => {
    let web3 = new Web3(provider);
    let contract = new web3.eth.Contract(Contract.abi, web3.utils.toChecksumAddress(to))
    console.log(Contract)
    price = web3.utils.toWei(""+price);
    console.log(price)
    return  contract.methods.setPrice(price).send({
       from : from
    })
}