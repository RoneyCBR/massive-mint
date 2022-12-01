export const  nameAndSymbol = (str) => {
    let words = str.split(" ");
    console.log('words ::', words)
    let symbol = "";
    let name = "";
    for (let index = 0; index < words.length; index++) {
        const element = words[index];
        symbol += element['0'];
    }
    name = symbol
    return { name, symbol }
}