import Web3 from 'web3'
import Contract from './PerseaSimpleCollection.json'

export const deploy = async(folder,price,from,provider) => {
    let web3 = new Web3(provider);
    let contract = new web3.eth.Contract(Contract.abi)
    console.log(Contract)
    price = web3.utils.toWei(""+price);
    console.log(price)
    return  contract.deploy({
        data :Contract.bytecode,
        arguments : [
          folder,price
        ]
     }).send({
       from : from
     })
}