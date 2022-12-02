export const isMinted = (nft) => {
    if (nft.transaction)
        return (nft.transaction.toUpperCase() != "PRE_MINT" && nft.transaction.toUpperCase() != "0X0")
    return false
}