const nodemailer= require("nodemailer")

const sendMailMiddleware= async(options)=>{
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "phonghv006@gmail.com",
      pass: "mvdiiclrjwlwtcoz",
    },
  });

  const message = {
    from: `HỆ THỐNG THƯ TỰ ĐỘNG`,
    to: options.email,
    subject: options.subject,
    html: options.html,
  };

  const info= await transporter.sendMail(message);
  return info;
}

module.exports = sendMailMiddleware