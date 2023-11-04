import * as dotenv from 'dotenv';
dotenv.config();

import { google } from 'googleapis';
import { JWT } from 'google-auth-library';
import readline from 'readline';
import { AppConfig, HEADER, productHeaders, stockHeaders } from '../constants/Constants';
import { saveFile, extractText, removeSpecialCharacter } from './Helper';
const rl = readline.createInterface(process.stdin, process.stdout);

const spreadsheetId = AppConfig.GOOGLESHEET_ID;

const auth = new JWT({
  keyFile: 'credential.json',
  scopes: 'https://www.googleapis.com/auth/spreadsheets',
});

const sheets = google.sheets({ version: 'v4', auth });

const getStockData = async (range?: string) => {
  const stockData = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: range || 'สินค้านำเข้ามาขาย!A8:Z',
  });

  return stockData.data?.values?.map((row: any) => {
    const rowData: any = {};
    for (let i = 0; i < stockHeaders.length; i++) {
      rowData[stockHeaders[i]] = row[i] || null;
    }
    return rowData;
  });
};

const getProductInfo = async (rang?: string) => {
  const productInfo = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: rang || 'รายการสินค้า!A2:Z',
  });

  return productInfo.data?.values?.map((row: any) => {
    const rowData: any = {};
    for (let i = 0; i < productHeaders.length; i++) {
      rowData[productHeaders[i]] = row[i] || null;
    }
    return rowData;
  });
};

export { getProductInfo, getStockData };
