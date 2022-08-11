const { validationResult } = require('express-validator');
const sgMail = require('@sendgrid/mail')

module.exports = {

    index: (req, res) => {
      return res.render("index", {
        title: "Rubicat - Un Llamado de la Naturaleza",
        descripcion: "Nashe",
        keywords: "rubicat, rubicat premium, bentonita, arena aglutinante, piedras sanitarias, gatos"
      })},

       formulario: async (req, res) => {
        let errors= (validationResult(req));

        if(errors.isEmpty()){

          const {nombre, email, telefono, asunto, mensaje} = req.body;

          sgMail.setApiKey(process.env.SENDGRID_API_KEY)
          const msg = {
            to: 'octavio@rubicat.com.ar',
            from: 'webrubicat@gmail.com', 
            subject: asunto,
            text: mensaje,
            html: `<p><strong>Nombre:</strong> ${nombre}</p><p><strong>Correo:</strong> ${email}</p><p><strong>Número de contacto:</strong> ${telefono}</p> <p><strong>Mensaje:</strong> ${mensaje}</p> <br> <p>Correo enviado desde www.rubicat.com.ar</p>`
            ,
          }
          sgMail
            .send(msg)
            .then(() => {
              console.log('Email sent');
              res.redirect('/formulario-enviado');
            })
            .catch((error) => {
              console.error(error)
            })
          
            } else{
              return res.render("index", {
                title: "Rubicat - Un Llamado de la Naturaleza",
                descripcion: "Nashe",
                keywords: "rubicat, rubicat premium, bentonita, arena aglutinante, piedras sanitarias, gatos",
                errores: errors.mapped(),  /* Envío Errors al Frontend.*/
                old: req.body /* guardo esta variable para la persistencia de datos */
              })
            }
          }, 

          formularioenviado: (req, res) => {
            return res.render("formulario-enviado", {
              title: "Rubicat - Un llamado de la Naturaleza",
              descripcion: "Nashe",
              keywords: "rubicat, rubicat premium, bentonita, arena aglutinante, piedras sanitarias, gatos"
            })},

      distribuidores: (req, res) => {
        return res.render("distribuidores", {
          title: "Rubicat - Distribuidores",
          descripcion: "Nashe",
          keywords: "rubicat, rubicat premium, bentonita, arena aglutinante, piedras sanitarias, gatos"
        })},
          
          nosotros: (req, res) => {
            return res.render("nosotros", {
              title: "Rubicat - Nosotros",
              descripcion: "Nashe",
              keywords: "rubicat, rubicat premium, bentonita, arena aglutinante, piedras sanitarias, gatos"
            })}    
      }