import { api } from "./controller/api";
import { user } from "./controller/user";


export const Routes = [
  {
    method: "post",
    route: "/START",
    controller: user,
    action: "START"
  },
  {
    method: "post",
    route: "/ADDCOLLECTION",
    controller: api,
    action: "ADDCOLLECTION"
  },
  {
    method: "post",
    route: "/TRANSFERNFT",
    controller: api,
    action: "TRANSFERNFT"
  },
  {
    method: "post",
    route: "/ADDNFT",
    controller: api,
    action: "ADDNFT"
  },
  {
    method: "post",
    route: "/SIGNUP",
    controller: user,
    action: "SIGNUP"
  },
  {
    method: "post",
    route: "/LOGIN",
    controller: user,
    action: "LOGIN"
  },
  {
    method: "post",
    route: "/RESETPASSWORD",
    controller: user,
    action: "RESETPASSWORD"
  },
  {
    method: "post",
    route: "/CONFIRMEMAIL",
    controller: user,
    action: "CONFIRMEMAIL"
  },
  {
    method: "post",
    route: "/ADDCOLLECTION",
    controller: api,
    action: "ADDCOLLECTIONL"
  },
  {
    method: "post",
    route: "/ADDNFTEA",
    controller: api,
    action: "ADDNFTEA"
  },
  {
    method: "post",
    route: "/SHOW",
    controller: api,
    action: "SHOW"
  },
  {
    method: "post",
    route: "/ADDSTORY",
    controller: api,
    action: "ADDSTORY"
  },
  {
    method: "post",
    route: "/bCOLLECTION",
    controller: api,
    action: "bCOLLECTION"
  },
  {
    method: "post",
    route: "/gCOLLECTION",
    controller: api,
    action: "gCOLLECTION"
  }
];
