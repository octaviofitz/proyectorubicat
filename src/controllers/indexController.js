const nodemailer= require('nodemailer')

module.exports = {

    index: (req, res) => {
      return res.render("index", {
        title: "Rubicat - Un Llamado de la Naturaleza",
      })},


       enviarFormulario: async (req, res) => {
        const {nombre, email, telefono, asunto, mensaje} = req.body;

        contentHTML= `
        <h2><b>Nombre:</b> ${nombre}</h2>
        <p><b>Correo de contacto:</b> ${email}</p>
        <p><b>Teléfono de contacto:</b> ${telefono}</p>
        <p><b>Asunto del mensaje:</b> ${asunto}</p>
        <p><b>Mensaje:</b> ${mensaje}</p>
        <br>
        <p>Enviado desde www.rubicat.com.ar</h4>
        `;

      const transporter = nodemailer.createTransport({
        host: 'smtp.hostinger.com',
        port: 465,
        secure: true,
        auth: {
            user: 'octavio@rubicat.com.ar',
            pass: 'Rubicat23@'
        },
        tls:{
          rejectUnauthorized: false
        }
       })

     const info= await transporter.sendMail({
        from: "octavio@rubicat.com.ar",
        to: 'octavio@rubicat.com.ar',
        subject: asunto,
        html: contentHTML
       });

       console.log("Mensaje enviado", info.messageId);
       res.redirect('/')
      }, 



    
      distribuidores: (req, res) => {
        return res.render("distribuidores", {
          title: "Rubicat - Distribuidores",
        })},

        contacto: (req, res) => {
          return res.render("contacto", {
            title: "Rubicat - Contacto",
          })},
          
          nosotros: (req, res) => {
            return res.render("nosotros", {
              title: "Rubicat - Nosotros",
            })}    
      }
    
    
  
     
        