import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import dotenvFlow from 'dotenv-flow'
const nlp = require('compromise');
import dotenvParseVariables from 'dotenv-parse-variables';

let config = dotenvFlow.config();
config = dotenvParseVariables(config.parsed);

nlp.extend(require('compromise-syllables'));

const environement = () => {
  return process.env.NODE_ENV || 'development';
}

const rootPath = () => {
  return process.env.PWD;
}

const generateUUID = () => {
  return uuidv4();
}

const envConfig = (variable) => {
  return config[variable];
}

const extractSyllables = (word) => {
  return nlp(word).terms().syllables()[0].syllables;
}

export {
  environement,
  rootPath,
  generateUUID,
  envConfig,
  extractSyllables
};


