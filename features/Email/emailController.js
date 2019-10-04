var nodemailer = require('nodemailer');

exports.sendEmail = async (req,res ) => {

  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'predde2015@gmail.com',
      pass: 'predde123'
    }
  });
  
  
  var mailOptions = {
    from: 'predde2015@gmail.com',
    to: `predde,2015@gmail.com,${req.body.email}`,
    subject: `Orden Creada Exitosamente`,
    text: `great`,
  };
  
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

}
