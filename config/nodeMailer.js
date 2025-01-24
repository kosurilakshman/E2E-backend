import  nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    host:'smtp.gmail.com',
    port: 587,
    secure:false,
    auth: {
      user:'sumanthsvs05@gmail.com',
      pass:'dvin yvyj ppvc uxmg',
    },
  });
  
export default transporter;