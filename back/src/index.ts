import "reflect-metadata";
import {createConnection} from "typeorm";
import * as config from '../ormconfig';
import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { Routes } from "./routes";
import { $log } from "ts-log-debug";
const axios = require('axios');
const cors = require('cors');

createConnection().then(async connection => {

  const app = express();
  app.use(cors())
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  app.use(bodyParser.json());

  app.all('/*', function(req, res, next) {
    next();
  });

  Routes.forEach((route: any) => {
    (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
      const result = (new (route.controller as any))[route.action](req, res, next);
      if (result instanceof Promise) {
        result.then(result_ => result_ !== null && result_ !== undefined ? res.send(result_) : undefined);

      } else if (result !== null && result !== undefined) {
        // $log.info(route.route)
        res.json(result);
      }


    });
  });

  app.listen(3000);

 console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results");


}).catch(error => console.log(error));
