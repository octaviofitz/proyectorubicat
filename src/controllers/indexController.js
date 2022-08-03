const { validationResult } = require('express-validator');
const nodemailer= require('nodemailer')

module.exports = {

    index: (req, res) => {
      return res.render("index", {
        title: "Rubicat - Un Llamado de la Naturaleza",
      })},


       formulario: async (req, res) => {
        let errors= (validationResult(req));

        if(errors.isEmpty()){

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
            pass: 'Amenedo4480.'
        },
        tls:{
          rejectUnauthorized: false
        }
       })
      

     const info= await transporter.sendMail({
        from: "octavio@rubicat.com.ar",
        to: 'octavio.sist@gmail.com',
        subject: asunto,
        html: contentHTML
       })

       console.log("Mensaje enviado", info.messageId);
       res.redirect('/');
      
        } else{
          return res.render("index", {
            title: "Rubicat - Un Llamado de la Naturaleza",
            errores: errors.mapped(),  /* Envío Errors al Frontend.*/
            old: req.body /* guardo esta variable para la persistencia de datos */
          })
        }
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
    
    
  
     
        