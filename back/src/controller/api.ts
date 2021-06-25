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
import * as moment from "moment";

const IV_LENGTH = 16; // For AES, this is always 16

const randtoken = require('rand-token');
const saltRounds = 10;

const salt = bcrypt.genSaltSync(saltRounds);
const querystring = require('querystring');
const nonce = require('nonce')();
let convertBTC = require('bitcoin-units');
var sb = require('satoshi-bitcoin');
const crypto = require('crypto');
import { AuthService } from "../service/AuthService"
let authservice = new AuthService();
import { $log } from "ts-log-debug";

export class api {

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

  async START(request: Request, response: Response, next: NextFunction) {


        try {

          const token = request.body.token;
          const user = request.body.user;

          let auth: any = await authservice.auth(token, user)
          if (auth.success) {

          } else {
            /// no auth
          }

        } catch (error) {

          $log.info('start error ' + error)
        }
  }

  async bCOLLECTION(request: Request, response: Response, next: NextFunction) {

        try {

          const token = request.body.token;
          const user = request.body.user;
          let collection = request.body.collectionName;
          let owner:any;
          let payload:any;
          let auth: any = await authservice.auth(token, user)
          if (auth.success) {
            let userName:any = auth.payload.profile.name
            // $log.info(userName)
            if(collection=='profile'){
              collection = auth.payload.profile.name
            }
            if(userName==collection){
              owner = 1
            }else{
              owner = 0
            }
            let COLLECTION:any = await ART.bCOLLECTION(auth.payload.user)
            let payload = await Promise.all([COLLECTION,auth.payload])

            const json = { success: true, payload: payload,owner:owner }
            response.statusCode = 200;
            response.send(json)


          } else {
            /// no auth
            let user:any = await USERS.gNAME(collection)
            let COLLECTION:any = await ART.bCOLLECTION(user.user)

            let payload = await Promise.all([COLLECTION,null])

            const json = { success: true, payload: payload,owner:0 }
            response.statusCode = 200;
            response.send(json)

          }

        } catch (error) {

          $log.info('bCOLLECTION error ' + error)
        }
  }

  async gCOLLECTION(request: Request, response: Response, next: NextFunction) {

        try {

          let collection = request.body.collection;

          let COLLECTION:any = await ART.gID(collection)
          let payload = await Promise.all([COLLECTION])

          const json = { success: true, payload: payload }
          response.statusCode = 200;
          response.send(json)


        } catch (error) {

          $log.info('gCOLLECTION error ' + error)
        }
  }

  async gART(request: Request, response: Response, next: NextFunction) {

        try {

          const token = request.body.token;
          const user = request.body.user;

          let auth: any = await authservice.auth(token, user)
          if (auth.success) {

          } else {
            /// no auth
          }

        } catch (error) {

          $log.info('start error ' + error)
        }
  }
  async bART(request: Request, response: Response, next: NextFunction) {

        try {

          const token = request.body.token;
          const user = request.body.user;

          let auth: any = await authservice.auth(token, user)
          if (auth.success) {

          } else {
            /// no auth
          }

        } catch (error) {

          $log.info('start error ' + error)
        }
  }

  async ADDCOLLECTION(request: Request, response: Response, next: NextFunction) {

        try {

          const token = request.body.token;
          const user = request.body.user;
          const title = request.body.title;
          const description = request.body.description;
          const image = request.body.image;
          const category = request.body.category;
          const imageHash = request.body.imageHash;
          const youtube = request.body.youtube;
          const soundcloud = request.body.soundcloud;
          const bandlab = request.body.bandlab;
          const sellCollection = request.body.sellCollection;
          const allowCollab = request.body.allowCollab;
          const localize = request.body.localize;
          const story = request.body.story;
          const royalties = request.body.royalties;
          // $log.info(token,user)
          let auth: any = await authservice.auth(token, user)
          if (auth.success) {

            let USER:any = auth.payload
            let COLLECTION:any = await ART.gCOLLECTION(user,title)
              if(COLLECTION){

                const json = { success: false, message: 'you already have a collection with this title' }
                response.statusCode = 200;
                response.send(json)

              }else{

                  let o:any = new Object()
                  o.title = title
                  o.description = description
                  o.image = image
                  o.imageHash = imageHash
                  o.sellCollection = sellCollection
                  o.allowCollab = allowCollab
                  o.localize = localize
                  o.category= category
                  o.youtube = youtube
                  o.soundcloud = soundcloud
                  o.bandlab=bandlab
                  o.story = story
                  o.royalties = royalties

                  let u:any = new Object()
                  u.name = USER.profile.name
                  u.avatar = USER.profile.avatar
                  u.displayName = USER.profile.displayName

                  let N:any = new ART()
                  N.user = user
                  N.collection = o
                  N.userData = u
                  N.category = category
                  N.active = 1
                  N.nft = []
                  ART.save(N)
                  .then(()=>{

                    const json = { success: true, message: 'collection created' }
                    response.statusCode = 200;
                    response.send(json)

                  })

                }


          } else {
            /// no auth
            const json = { success: false, message: 'log in to add collection' }
            response.statusCode = 200;
            response.send(json)

          }

        } catch (error) {

          $log.info('add collection error ' + error)
        }
  }

  async ADDNFT(request: Request, response: Response, next: NextFunction) {

    try {

      const token = request.body.token;
      const user = request.body.user;
      const name = request.body.name;
      const description = request.body.description;
      const image = request.body.image;
      const imageHash = request.body.imageHash;
      const price = request.body.price;
      const quantity = request.body.quantity;
      const collection = request.body.collection;
      const brewTrue = request.body.brewTrue;
      const brewFalse = request.body.brewFalse;
      const unlockableTrue = request.body.unlockableTrue;
      const unlockableFalse = request.body.unlockableFalse;

      let auth: any = await authservice.auth(token, user)
      if (auth.success) {

        let USER:any = auth.payload

        let now = moment().toDate();
        let id:any = randtoken.generate(9);
            let o:any = new Object()
            o.name = name
            o.description = description
            o.image = image
            o.imageHash = imageHash
            o.quantity= quantity
            o.price= price
            o.user = user
            o.owner = USER.profile.name
            o.ownerAvatar = USER.profile.avatar
            o.created = now
            o.brewTrue=brewTrue || 0
            o.brewFalse = brewFalse || 0
            o.unlockableTrue = unlockableTrue || 0
            o.unlockableFalse = unlockableFalse || 0
            o.collection = collection
            o.id = id

            let collectionValue = price*quantity

            let COLLECTION:any = await ART.gID(collection)
            // let NFT:any = COLLECTION.nftea
            // $log.info(COLLECTION, collectionName)
            COLLECTION.nft.push(o)
            COLLECTION.collectionValue= collectionValue
            ART.save(COLLECTION)
            .then(()=>{

              const json = { success: true, message: 'NFTea created' }
              response.statusCode = 200;
              response.send(json)

            })

      }else {
        /// no auth
        const json = { success: false, message: 'log in to add collection' }
        response.statusCode = 200;
        response.send(json)

      }

    } catch (error) {

      $log.info('add nft error ' + error)
    }
  }

  async SHOW(request: Request, response: Response, next: NextFunction) {

        try {

          const token = request.body.token;
          const user = request.body.user;
          const owner = request.body.owner;
          const collectionName = request.body.collectionName;
          // $log.info(owner,collectionName)
          let OWNER:any = await USERS.gUSER(owner)
          let COLLECTION:any = OWNER.collection
          let ownername = OWNER.profile.name
          let ownerAvatar = OWNER.profile.avatar
          let ownerID = owner
          // $log.info(COLLECTION)
          COLLECTION = COLLECTION.find((x: any) => x.name == collectionName)

          let payload = await Promise.all([COLLECTION])

          const json = { success: true, payload: payload,ownername:ownername,ownerAvatar:ownerAvatar }
          response.statusCode = 200;
          response.send(json)

        } catch (error) {

          $log.info('show error ' + error)
        }
  }

  async ADDSTORY(request: Request, response: Response, next: NextFunction) {

        try {

          const token = request.body.token;
          const user = request.body.user;
          const collectionName = request.body.collectionName;
          const story = request.body.story;

          let auth: any = await authservice.auth(token, user)
          if (auth.success) {

            let OWNER:any = await USERS.gUSER(user)
            let COLLECTION:any = OWNER.collection
            COLLECTION = COLLECTION.find((x: any) => x.name == collectionName)
            if(COLLECTION){

              COLLECTION.story = story
              USERS.save(OWNER)
              .then(()=>{
                const json = { success: true, message:'story added' }
                response.statusCode = 200;
                response.send(json)

              })

            }else{

              const json = { success: false, message:'no collection found' }
              response.statusCode = 200;
              response.send(json)

            }

          } else {
            /// no auth
          }

        } catch (error) {

          $log.info('start error ' + error)
        }
  }

  async TRANSFERNFT(request: Request, response: Response, next: NextFunction) {

        try {

          const token = request.body.token;
          const user = request.body.user;

          let auth: any = await authservice.auth(token, user)
          if (auth.success) {

          } else {
            /// no auth
          }

        } catch (error) {

          $log.info('start error ' + error)
        }
  }

}
