const { validationResult } = require('express-validator');
const sgMail = require('@sendgrid/mail')

module.exports = {

    indexEng: (req, res) => {
      return res.render("eng", {
        title: "Rubicat - Un Llamado de la Naturaleza",
        descripcion: "Fine Patagonian Bentonite of excellent quality. Yields more than a month per drum. We offer quality variety and very good duration for the hygiene of your cat. Agglutinate in the moment. 100% natural. Eliminates Odours.",
        keywords: "rubicat, rubicat premium, bentonite, clumping cat litter, cats"
      })},

       formularioEng: async (req, res) => {
        let errors= (validationResult(req));

        if(errors.isEmpty()){

          const {nombre, email, telefono, asunto, mensaje} = req.body;

          sgMail.setApiKey(process.env.SENDGRID_API_KEY)
          const msg = {
            to: 'info@rubicat.com.ar',
            from: 'webrubicat@gmail.com', 
            subject: asunto,
            text: mensaje,
            html: `<p><strong>Nombre:</strong> ${nombre}</p><p><strong>Correo:</strong> ${email}</p><p><strong>Número de contacto:</strong> ${telefono}</p> <p><strong>Mensaje:</strong> ${mensaje}</p> <br> <p>Correo enviado desde www.rubicat.com.ar en su <strong>versión en inglés</strong></p>`
            ,
          }
          sgMail
            .send(msg)
            .then(() => {
              console.log('Email sent');
              res.redirect('/eng/formulario-enviado');
            })
            .catch((error) => {
              console.error(error)
            })
          
            } else{
              return res.render("eng", {
                title: "Rubicat - Un Llamado de la Naturaleza",
                descripcion: "Fine Patagonian Bentonite of excellent quality. Yields more than a month per drum. We offer quality variety and very good duration for the hygiene of your cat. Agglutinate in the moment. 100% natural. Eliminates Odours.",
                keywords: "rubicat, rubicat premium, bentonita, cats, lumping cat litter",
                errores: errors.mapped(),  /* Envío Errors al Frontend.*/
                old: req.body /* guardo esta variable para la persistencia de datos */
              })
            }
          }, 

          FormularioEnviadoEng: (req, res) => {
            return res.render("formularioEng", {
              title: "Rubicat - Un llamado de la Naturaleza",
              descripcion: "Rubicat - Distribuidores",
              keywords: "rubicat, rubicat premium, bentonita, cats, lumping cat litter"
            })}, 

        }