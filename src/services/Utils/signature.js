import Web3 from 'web3'


export const sign = async(text,from,provider) => {
    let web3 = new Web3(provider);
    let signature = localStorage.getItem('signature');
    let message = localStorage.getItem('message');
    if (!signature && !message) {
        message = web3.utils.sha3(text+" "+new Date().getTime())
        let hex = ''
        for(let i=0;i<message.length;i++) {
            hex += ''+message.charCodeAt(i).toString(16)
        }
        const hexMessage  = "0x" + hex
        signature = await web3.eth.personal.sign(hexMessage, from)
        localStorage.setItem('signature', signature)
        localStorage.setItem('message', message)
    }
    return { signature, message }
}
