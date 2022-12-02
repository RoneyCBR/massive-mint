export const addRequestPending = async(tokensId,transaction) => {
    let pending = JSON.parse(localStorage.getItem('pending'))
    if(pending) {
        if(pending.length >= 0) {
            let tx = null;
            let requestFound = null;
            pending.forEach(request => {
                if(request.offers.includes(tokensId)) {
                    tx = request.transaction;
                    requestFound = request;
                }
            });
            if (tx) {
                let index = pending.indexOf(requestFound);
                if (index >= 0) {
                    pending.splice(index,1);
                }
            }
            pending.push({ transaction : transaction, offers : tokensId})
            localStorage.setItem('pending', JSON.stringify(pending))
        }
    } else {
        pending = [];
        pending.push({ transaction : transaction, offers : tokensId})
        localStorage.setItem('pending', JSON.stringify(pending))
    }
}