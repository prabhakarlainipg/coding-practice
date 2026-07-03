const stockPrices =[7, 1, 5, 3, 6, 4];

const bestTimeToBuyAndSell = (stockPrices : number[])=>{
    let minStock = stockPrices[0];
    let maxProfit= 0;
    for(let i = 1; i < stockPrices.length; i++){
        let currentPrice = stockPrices[i];
        minStock = Math.min(minStock, currentPrice);
        maxProfit = Math.max(maxProfit, currentPrice-minStock);
    }
    return maxProfit;

}
console.log(bestTimeToBuyAndSell(stockPrices));