var nodemailer = require('nodemailer');

exports.sendEmail = async (req, res) => {
  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'predde2015@gmail.com',
      pass: 'predde123'
    }
  });

  if(req.body.message){
    console.log("VACIO");
  }

  var mailOptions = {
    from: 'predde2015@gmail.com',
    to: `predde2015@gmail.com, ${req.body.email}`,
    subject: `Orden Creada Exitosamente`,
    text: `great ${req.body.message} Contacto:+(${req.body.prefix}${req.body.phone})`
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      res.send(200);
    }
  });
};
