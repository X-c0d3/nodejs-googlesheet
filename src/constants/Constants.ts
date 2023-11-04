import os from 'os';
import path from 'path';

const desktopDir = path.join(os.homedir(), 'Desktop');
const AppConfig = {
  API_URL: process.env.API_URL,
  GOOGLESHEET_ID: process.env.GOOGLESHEET_ID,
  ENABLE_LINE_NOTIFY: process.env.ENABLE_LINE_NOTIFY,
  LINE_TOKEN: process.env.LINE_TOKEN,
  COOKIE: process.env.COOKIE,
  DOWNLOAD_PATH: `${desktopDir}/download`,
  DEFAULT_FILE_EXTENSTION: '.jpg',
};

const HEADER = {
  timeout: 50000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    Accept: '*',
    Cache: 'no-cache',
    'Accept-Encoding': 'gzip, deflate, br',
    'accept-language': 'en-US,en;q=0.9,th-TH;q=0.8,th;q=0.7,zh-CN;q=0.6,zh;q=0.5',
    Connection: 'keep-alive',
    accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36',
    Cookie: AppConfig.COOKIE,
    withCredentials: true,
    rejectUnauthorized: false,
  },
};

export { AppConfig, HEADER };
