import * as dotenv from 'dotenv';
dotenv.config();

import readline from 'readline';
import { getProductInfo, getStockData } from './util/GoogleSheet';
const rl = readline.createInterface(process.stdin, process.stdout);

const accessGoogleSheets = async () => {
  try {
    const productList = await getProductInfo();
    const stockData = await getStockData();

    Promise.all([productList, stockData]).then((values) => {
      const [products, stocks] = values;
      if (products) console.log('Product:', products[0]);

      if (stocks) console.log('Stock:', stocks[250]);
    });
  } catch (error) {
    console.error('Error accessing Google Sheet:', error);
  }
};

accessGoogleSheets();
