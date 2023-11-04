import * as dotenv from 'dotenv';
dotenv.config();

import { google } from 'googleapis';
import { JWT } from 'google-auth-library';
import readline from 'readline';
import { AppConfig, HEADER, productHeaders, stockHeaders } from './constants/Constants';
import { saveFile, extractText, removeSpecialCharacter } from './util/Helper';
const rl = readline.createInterface(process.stdin, process.stdout);

const spreadsheetId = AppConfig.GOOGLESHEET_ID;

const auth = new JWT({
  keyFile: 'credential.json',
  scopes: 'https://www.googleapis.com/auth/spreadsheets',
});

const getStockData = async (sheets: any) => {
  const stockData = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: 'สินค้านำเข้ามาขาย!A8:Z',
  });

  return stockData.data?.values.map((row: any) => {
    const rowData: any = {};
    for (let i = 0; i < stockHeaders.length; i++) {
      rowData[stockHeaders[i]] = row[i] || null;
    }
    return rowData;
  });
};

const getProductInfo = async (sheets: any) => {
  const productInfo = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: 'รายการสินค้า!A2:Z',
  });

  return productInfo.data?.values.map((row: any) => {
    const rowData: any = {};
    for (let i = 0; i < productHeaders.length; i++) {
      rowData[productHeaders[i]] = row[i] || null;
    }
    return rowData;
  });
};

const accessGoogleSheets = async () => {
  await auth.authorize();
  const sheets = google.sheets({ version: 'v4', auth });

  try {
    const productList = await getProductInfo(sheets);
    const stockData = await getStockData(sheets);

    Promise.all([productList, stockData]).then((values) => {
      const [products, stocks] = values;
      console.log('Product:', products[0]);
      console.log('Stock:', stocks[250]);
    });
  } catch (error) {
    console.error('Error accessing Google Sheet:', error);
  }
};

accessGoogleSheets();
