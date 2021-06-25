import { createConnection, getConnectionManager, getConnection, getRepository } from "typeorm";
import { users } from "../entity/users";
let USER = users
import { art } from "../entity/art";
let ART = art
import { hash, compare } from 'bcryptjs';
import * as bcrypt from "bcryptjs";
const math = require('mathjs')
var sb = require('satoshi-bitcoin');
const QRCode = require('qrcode')

// import { Grabbit } from "../entity/Grabbit";
// import { GrabbitUsers } from "../entity/GrabbitUsers";
// import { GrabbitPlayers } from "../entity/GrabbitPlayers";
// import { GrabbitBuyTools } from "../entity/GrabbitBuyTools";
import fetch from 'node-fetch';
import * as moment from "moment";
import 'moment/locale/pt-br';
import { $log } from "ts-log-debug";
const crypto = require('crypto');

const sendgrid = require('@sendgrid/mail');
sendgrid.setApiKey(process.env.SENDGRID_KEY);
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY; // Must be 256 bytes (32 characters)

const IV_LENGTH = 16; // For AES, this is always 16
const axios = require('axios');
const poster = axios.create();
poster.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

var WALLETBTC = require('blockchain.info/MyWallet')
let options = { apiCode: process.env.BTC_API, apiHost: 'https://wallet.myin.app', secondPassword: process.env.BTC_PASS_2 }
let BTCWALLET = new WALLETBTC(process.env.BTC_GUID, process.env.BTC_PASS, options)

// import Binance from 'binance-api-node';
// const Bittrex = require('nodejs-request-bittrex-rest-api');
// const BinanceSuper = require('node-binance-api');

import { EmailService } from "../service/EmailService";
let emailservice = new EmailService();

class NFTService {

  private encrypt(text: string) {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv('aes-256-cbc', new Buffer(ENCRYPTION_KEY), iv);
    let encrypted = cipher.update(text);

    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return iv.toString('hex') + ':' + encrypted.toString('hex');
  }

  private decrypt(text: string) {
    const textParts = text.split(':');
    const iv = new Buffer(textParts.shift(), 'hex');
    const encryptedText = new Buffer(textParts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', new Buffer(ENCRYPTION_KEY), iv);
    let decrypted = decipher.update(encryptedText);

    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString();
  }
  randomNumber = function(length) {

    var text = "";
    var possible = "0123456789";
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;

  }
  randomString = function(length) {

    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;

  }

  decimalPlaces = function(num) {
    var match = ('' + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
    if (!match) { return 0; }
    return Math.max(
      0,
      // Number of digits right of decimal point.
      (match[1] ? match[1].length : 0)
      // Adjust for scientific notation.
      - (match[2] ? +match[2] : 0));
  }

  functiontofindIndexByKeyValue(arraytosearch, key, valuetosearch) {

    for (var i = 0; i < arraytosearch.length; i++) {

      if (arraytosearch[i][key] == valuetosearch) {
        return i;
      }
    }
    return null;
  }
  async CREATEPRACTICE() {

    return new Promise(async (resolve) => {
      const geo = {
        type: "Point",
        coordinates: [
          null,
          null
        ]
      };


  })
}
}

export { NFTService };
