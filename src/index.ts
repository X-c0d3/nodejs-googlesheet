import * as dotenv from 'dotenv';
dotenv.config();

import readline from 'readline';
import { AppConfig, HEADER } from './constants/Constants';
import { saveFile, extractText, removeSpecialCharacter } from './util/Helper';
const rl = readline.createInterface(process.stdin, process.stdout);

import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

const accessGoogleSheets = async () => {
  // Load the credentials JSON file you downloaded when creating the service account
  const auth = new JWT({
    keyFile: 'credential.json',
    scopes: 'https://www.googleapis.com/auth/spreadsheets',
  });

  await auth.authorize();
  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = AppConfig.GOOGLESHEET_ID;

  try {
    const headerResponse = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'สินค้านำเข้ามาขาย!A6:Z',
    });
    const columnHeaders = headerResponse.data.values ? headerResponse.data.values[0] : [];

    const dataResponse = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'สินค้านำเข้ามาขาย!A8:Z',
    });

    const data = dataResponse.data.values || [];

    const formattedData = data.map((row) => {
      const rowData: any = {};
      for (let i = 0; i < columnHeaders.length; i++) {
        rowData[columnHeaders[i]] = row[i] || null;
      }
      return rowData;
    });

    console.log('Formatted Data:');
    console.log(formattedData);
  } catch (error) {
    console.error('Error accessing Google Sheet:', error);
  }
};

accessGoogleSheets();
