import nodemailer from 'nodemailer';
import { APP_PASSWORD } from '../../config/config.js';

const transPorter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"jaamacciidh@gmail.com",
        pass:APP_PASSWORD
    }
});

const sendVerificationEmail = (to,verificationLink) =>{
   const  mailOptions ={
    from:"cabdirisaqyy@gmail.com",
    to,
    subject:"verification Email",
    html:`click the link below to verify your email ${verificationLink}`
    }

    transPorter.sendMail(mailOptions,(error, info) =>{
        if(error){
            return "failed to send verification"
        }else{
            return "successfully sent verification"
        }
    })
}

export default sendVerificationEmail;