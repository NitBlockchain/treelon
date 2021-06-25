import { createConnection, getConnectionManager, getConnection, getRepository } from "typeorm";
import * as mjml2html from 'mjml'
import { $log } from "ts-log-debug";

const sgMail = require('@sendgrid/mail')
const mailjet = require ('node-mailjet')
.connect(process.env.MAILJET_1, process.env.MAILJET_2)


class EmailService {

  async basic(email: any, subject: any, recipient: any, message: any) {
    return new Promise(async (resolve) => {

      let options = {
        beautify: false
      }

      let html = mjml2html('<mjml>' +
        '<mj-body>' +
        '<mj-section>' +
        '<mj-column>' +
        '<mj-image src="https://scontent-iad3-2.xx.fbcdn.net/v/t1.6435-9/s960x960/161966409_102798548568779_2585500113974470863_n.png?_nc_cat=105&ccb=1-3&_nc_sid=e3f864&_nc_ohc=gmw_OIgH93AAX8moH6w&_nc_ht=scontent-iad3-2.xx&tp=30&oh=ae5cde65e9178f2b2f387cb1487f3aaf&oe=60B4B7C3"></mj-image>' +
        '</mj-column>' +
        '</mj-section>' +
        '<mj-section background-color="#f3f3f3">' +
        '<mj-column>' +
        '<mj-text font-weight="bold" align="justify" font-size="14px" color="#000" font-family="helvetica">' + subject + '</mj-text>' +
        '<mj-text align="justify" font-size="15px" color="#000" font-family="helvetica">hello ' + recipient + '<br><br>' + message + '</mj-text>' +
        '</mj-column>' +
        '</mj-section>' +
        '<mj-section>' +
        '<mj-column>' +

        '<mj-text font-weight="bold" align="center" font-size="16px" color="#000" font-family="helvetica">Buy NFTEA, Get A Gift</mj-text>' +
        '<mj-text align="justify" font-size="13px" color="#000" font-family="helvetica">Cannabis meets NFT\'s</mj-text>' +

        '</mj-column>' +
        '<mj-column>' +

        '<mj-text font-weight="bold" align="center" font-size="16px" color="#000" font-family="helvetica">Faster Sales</mj-text>' +
        '<mj-text align="justify" font-size="13px" color="#000" font-family="helvetica">Gift Shops Act As Market Makers</mj-text>' +

        '</mj-column>' +
        '<mj-column>' +

        '<mj-text font-weight="bold" align="center" font-size="16px" color="#000" font-family="helvetica">Music, Videos, Stories </mj-text>' +
        '<mj-text align="justify" font-size="13px" color="#000" font-family="helvetica">Sell NFT For Your Story</mj-text>' +

        '</mj-column>' +
        '</mj-section>' +
        '</mj-body>' +
        '</mjml>')

      // console.log(html)

      const request = mailjet
      .post("send", {'version': 'v3.1'})
      .request({
        "Messages":[
          {
            "From": {
              "Email": "cs@nftea.app",
              "Name": "NFTea.app"
            },
            "To": [
              {
                "Email": email,
                "Name": recipient
              }
            ],
            "Subject": subject,
            "HTMLPart": html.html,
            "CustomID": "myEmail"
          }
        ]
      })
      request
        .then((result) => {
          resolve(true)
          // console.log('' +JSON.stringify(result.body))
        })
        .catch((err) => {
          resolve(false)

          // console.log('error' +JSON.stringify(err.statusCode))
        })
})
  }

}

export { EmailService };
