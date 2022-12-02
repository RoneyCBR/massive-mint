import Web3 from 'web3'

export const sign = async(from,provider,message,action) => {
    return new Promise((resolve,reject) => {
        try {
            let web3 = new Web3(provider);
            let hex = ''
            for(let i=0;i<message.length;i++) {
                hex += ''+message.charCodeAt(i).toString(16)
            }
            const hexMessage  = "0x" + hex
            web3.eth.personal.sign(hexMessage, from).then((signature) => {
                const domain = "www.persea.com"
                const data = {
                  'domain': domain,
                  'blockchain_name': 'MATIC MUMBAI',
                  'signature': signature,
                  'message': message,
                  'action': action
                }
                resolve(data)
            }).catch((err) => {
                reject(err)
            })
        } catch (err) {
            reject(err)
        }
    })
}
