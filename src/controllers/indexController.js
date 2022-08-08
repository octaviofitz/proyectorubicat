const { validationResult } = require('express-validator');
const sgMail = require('@sendgrid/mail')


module.exports = {

    index: (req, res) => {
      return res.render("index", {
        title: "Rubicat - Un Llamado de la Naturaleza",
      })},


       formulario: async (req, res) => {
        let errors= (validationResult(req));

        if(errors.isEmpty()){

          const {nombre, email, telefono, asunto, mensaje} = req.body;

          sgMail.setApiKey(process.env.SENDGRID_API_KEY)
          const msg = {
            to: 'octavio@rubicat.com.ar', // Change to your recipient
            from: 'webrubicat@gmail.com', // Change to your verified sender
            subject: asunto,
            text: mensaje,
            html: `<p><strong>Nombre:</strong> ${nombre}</p><p><strong>Correo:</strong>${email}</p><p><strong>Número de contacto:</strong> ${telefono}</p> <p><strong>Mensaje:</strong> ${mensaje}</p> <br> <p>Correo enviado desde www.rubicat.com.ar</p>`
            ,
          }
          sgMail
            .send(msg)
            .then(() => {
              console.log('Email sent');
              res.redirect('/');
            })
            .catch((error) => {
              console.error(error)
            })
          
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
    
    
  
     
        