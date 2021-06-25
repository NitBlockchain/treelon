import { createConnection, getConnectionManager, getConnection, getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { users } from "../entity/users";
let USERS = users
import { art } from "../entity/art";
let ART = art
import { hash, compare } from 'bcryptjs';
import * as bcrypt from "bcryptjs";
const math = require('mathjs')
var sb = require('satoshi-bitcoin');
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY; // Must be 256 bytes (32 characters)

const IV_LENGTH = 16; // For AES, this is always 16
import * as moment from "moment";

const randtoken = require('rand-token');
const saltRounds = 10;

const salt = bcrypt.genSaltSync(saltRounds);
const querystring = require('querystring');
const nonce = require('nonce')();
let convertBTC = require('bitcoin-units');
var sb = require('satoshi-bitcoin');
import { $log } from "ts-log-debug";
const crypto = require('crypto');
import { AuthService } from "../service/AuthService"
let authservice = new AuthService();
import { EmailService } from "../service/EmailService";
let emailservice = new EmailService();

export class user {

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

  functiontofindIndexByKeyValue(arraytosearch, key, valuetosearch) {

    for (var i = 0; i < arraytosearch.length; i++) {

      if (arraytosearch[i][key] == valuetosearch) {
        return i;
      }
    }
    return null;
  }
  randomString = function(length) {

    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;

  }
  randomNumber = function(length) {

  var text = "";
  var possible = "0123456789";
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;

}

  async START(request: Request, response: Response, next: NextFunction) {

    try {

      const token = request.body.token;
      const user = request.body.user;

      let auth: any = await authservice.auth(token, user)
      if (auth.success) {

        let USER: any = await USERS.gUSER(user)
        // $log.info(USER)
        let payload = await Promise.all([USER])

        const json = { success: true, payload: payload }
        response.statusCode = 200;
        response.send(json)

      } else {
        /// no auth
        $log.info("no auth")
        const json = { success: false }
        response.statusCode = 200;
        response.send(json)
      }

    } catch (error) {

      $log.info('start error ' + error)
    }
  }

  async LOGIN(request: Request, response: Response, next: NextFunction) {

    try {

      const email = request.body.email;
      const password = request.body.password;
      let pass;
      // $log.info("working")
      let USER: any = await USERS.gEMAIL(email)
      if (USER) {
        pass = bcrypt.compareSync(password, USER.password);
        if (pass) {
          // $log.info(USER)
          let emailVerify = USER.profile.verifyEmail
          if (emailVerify > 0) {

            let loginCode = this.randomNumber(5)
            USER.profile.loginCode = loginCode
            const token = randtoken.generate(32);
            USER.token = token
            USERS.save(USER)
              .then(() => {

                emailservice.basic(email, 'NFTea.app verification', 'NFTea member,', '<br><br>Use code ' + loginCode + ' to confirm your email')
                  .then(() => {

                    const json = { success: false, message: 'please verify your email address', verifyEmail: 1,token:token }
                    response.statusCode = 200;
                    response.send(json)
                  })
              })
          } else {
            ///already verified email
            const token = randtoken.generate(32);
            USER.token = token
            // $log.info(token, USER.tokens)
            USERS.save(USER)
              .then(() => {
                emailservice.basic(email, 'NFTea.app Login', USER.profile.name, '<br><br>You are logged in. If you didn\'t authorize this login, please contact us on discord.')
                  .then(() => {

                const json = { success: true, message: 'go get em!', user: USER.user, name: USER.profile.name, avatar: USER.profile.avatar, active: USER.active, token: token }
                response.statusCode = 200;
                response.send(json)

              })

              })
          }

        } else {
          ///wrong password
          const json = { success: false, message: 'invalid password', verifyEmail: 0 }
          response.statusCode = 200;
          response.send(json)

        }

      }else{

        const json = { success: false, message: 'invalid user, sign up', verifyEmail: 0 }
        response.statusCode = 200;
        response.send(json)

      }

    } catch (error) {
      $log.info('login error ' + error)
    }
  }

  async SIGNUP(request: Request, response: Response, next: NextFunction) {

    try {

      let name = request.body.name;
      let email = request.body.email;
      let password = request.body.password;

      // $log.info(name,email,password)
      let DisplayName = request.body.name;
      password = bcrypt.hashSync(password, salt);

      let token = randtoken.generate(32);
      let loginCode = this.randomNumber(5)
      email = email.toLowerCase()

      //check email
      let emailCheck = await USERS.gEMAIL(email)
      if (emailCheck) {

        const json = { success: false, message: 'email in use, try resetting your password' }
        response.statusCode = 200;
        response.send(json)

      } else {

        let nameCheck = await USERS.gNAME(name)
        if (nameCheck) {

          const json = { success: false, message: 'user name in use, be original' }
          response.statusCode = 200;
          response.send(json)

        } else {

          let USER:any = new USERS()
          USER.profile = {
            name: name,
            displayName: DisplayName,
            email: email,
            avatar: '/assets/img/avatars/avatar2.jpg',
            firstName: null,
            lastName: null,
            fullName:null,
            address: null,
            city: null,
            state: null,
            zip: null,
            country: null,
            phone: null,
            loginCode: loginCode,
            countryCode: null,
            verifyEmail:1,
            age:'n/a',
            gender:'n/a',
            twitter:'n,a',
            instagram:'n/a',
            facebook:'n/a',
            website:'n/a',
            category:'n/a'//musician,artists,painter etc

          }
          USER.token = token
          USER.email = email
          USER.admin = 0
          USER.password = password
          USER.active = 1
          USERS.save(USER)
            .then((res: any) => {
              // console.log(res)
              emailservice.basic(email, 'NFTea verification', 'NFTea member,', '<br><br>Use code ' + loginCode +' to confirm your email')
                .then(() => {

              const json = { success: true, message: 'login code sent', user: res.user, name: res.profile.name, avatar: res.profile.avatar, active: 1, token: token }
              response.statusCode = 200;
              response.send(json)

              })

            })
        }
      }


    } catch (error) {

    }
  }
  async RESETPASSWORD(request: Request, response: Response, next: NextFunction) {

    try {

      const email = request.body.email;
      const token = request.body.token;

    } catch (error) {

    }
  }

  async CONFIRMEMAIL(request: Request, response: Response, next: NextFunction) {

    try {

      const token = request.body.token;
      const code = request.body.code;
      let USER:any = await USERS.gTOKEN(token)

      if(USER){
        let c:any = USER.profile.loginCode

        if(code==c){

          USER.profile.verifyEmail = 0
          USER.profile.loginCode = 0
          USERS.save(USER)
          .then(()=>{

            const json = { success: true, message: 'email verified' }
            response.statusCode = 200;
            response.send(json)

          })

        }else{

          const json = { success: false, message: 'invalid code' }
          response.statusCode = 200;
          response.send(json)

        }
      }else{
        $log.info(token)
        const json = { success: false, message: 'invalid user' }
        response.statusCode = 200;
        response.send(json)

      }

    } catch (error) {

      $log.info('confirme email error ' + error)
    }
  }

}
