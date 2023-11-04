import path from 'path';
import fs from 'fs';
import axios from 'axios';
import https from 'https';

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

const ensureDirectoryExistence = (filePath: string) => {
  var dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
};

const saveFile = async (indexFile: number, fileUrl: string, pathDir: string, fileExtension: string = '') => {
  // Get the file name
  const fileName = truncateString(`${indexFile}.${path.basename(fileUrl)}`, 30);
  const localFilePath = path.resolve(__dirname, `${pathDir}`, fileName + fileExtension);

  ensureDirectoryExistence(localFilePath);
  try {
    const response = await axios({
      method: 'GET',
      url: fileUrl,
      responseType: 'stream',
      timeout: 50000,
      httpsAgent: httpsAgent,
    });

    const w = response.data.pipe(fs.createWriteStream(localFilePath));
    w.on('finish', () => {
      //console.log('Successfully downloaded file!');
    });
  } catch (err: any) {
    console.log(err);
    //throw new Error(err);
  }
};

const extractText = (strToParse: string, strStart: string, strFinish: string) => {
  if (strToParse == null || strStart == null || strFinish == null) return;

  var res = strToParse.match(strStart + '(.*?)' + strFinish);
  if (res != null) return res[1];
};

const removeSpecialCharacter = (content: string) => {
  var res = content.replace('/', '-');
  return res;
};

const truncateString = (name: string, num: number) => {
  const ext: string = name.substring(name.lastIndexOf('.') + 1, name.length).toLowerCase();
  let newName: string = name.replace('.' + ext, '');
  if (name.length <= 8) {
    // if file name length is less than 8 do not format
    // return same name
    return name;
  }
  newName = newName.substring(0, num);
  return newName + '.' + ext;
};

export { saveFile, ensureDirectoryExistence, extractText, removeSpecialCharacter, truncateString };
