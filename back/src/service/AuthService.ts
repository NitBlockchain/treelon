import { createConnection, getConnectionManager, getConnection, getRepository } from "typeorm";
import { users } from "../entity/users";
let USERS = users
import { hash, compare } from 'bcryptjs';
import * as bcrypt from "bcryptjs";

import fetch from 'node-fetch';
import * as moment from "moment";
import 'moment/locale/pt-br';
import { $log } from "ts-log-debug";
const crypto = require('crypto');
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY; // Must be 256 bytes (32 characters)

const IV_LENGTH = 16; // For AES, this is always 16

import { EmailService } from "./EmailService";
let emailservice = new EmailService();

class AuthService {

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
  async auth(token,user_id) {

    return new Promise(async (resolve) => {
      // $log.info('userr is' + user_id)
      await USERS.gUSER(user_id)
        .then(async (user: any) => {
          if (user) {
            
            if(token==user.token){

              let res = { success: true, payload: user }
              resolve(res)

            }else{

              let res = { success: false, message: 'invalid user' }
              resolve(res)

            }

          } else {
            // $log.info(user)

            let res = { success: false, message: 'invalid user id' }
            resolve(res)

          }
        })

    })

  }


}

export { AuthService };
