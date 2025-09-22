const { validationResult } = require('express-validator');
require('dotenv').config();
const sgMail = require('@sendgrid/mail')
sgMail.setTimeout(2000);
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = {

    index: (req, res) => {
      return res.render("index", {
        title: "Rubicat - Un Llamado de la Naturaleza",
        descripcion: "Fina Bentonita Patagónica de excelente calidad. Rinde más de un mes por bidón. Ofrecemos variedad de calidad y muy buena duración para el higiene de tu gato. Aglutina en el momento. 100% natural. Elimina Olores.",
        keywords: "rubicat, rubicat premium, bentonita, arena aglutinante, piedras sanitarias, gatos"
      })},

      formulario: async (req, res) => {
        const errors = validationResult(req);
    
        if (!errors.isEmpty()) {
          return res.status(400).render("index", {
            title: "Rubicat - Un Llamado de la Naturaleza",
            descripcion: "Fina Bentonita Patagónica de excelente calidad. Rinde más de un mes por bidón. Ofrecemos variedad de calidad y muy buena duración para el higiene de tu gato. Aglutina en el momento. 100% natural. Elimina Olores.",
            keywords: "rubicat, rubicat premium, bentonita, arena aglutinante, piedras sanitarias, gatos",
            errores: errors.mapped(),
            old: req.body
          });
        }
    
        const { nombre, email, telefono, asunto, mensaje } = req.body;
    
        try {
          sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    
          const msg = {
            to: 'info@rubicat.com.ar',
            from: 'webrubicat@gmail.com', // <-- sin cambios
            subject: asunto,
            text: mensaje,
            html: `
              <p><strong>Nombre:</strong> ${nombre}</p>
              <p><strong>Correo:</strong> ${email}</p>
              <p><strong>Número de contacto:</strong> ${telefono}</p>
              <p><strong>Mensaje:</strong> ${mensaje}</p>
              <br>
              <p>Correo enviado desde www.rubicat.com.ar</p>
            `,
          };
    
          await sgMail.send(msg);
    
          // Éxito: redirigimos
          return res.redirect('/formulario-enviado');
    
        } catch (err) {
          // Logs claros del error de SendGrid
          console.error('SendGrid error:', err);
          if (err.response && err.response.body) {
            try {
              console.error('SendGrid error body:', JSON.stringify(err.response.body, null, 2));
            } catch (_) {
              console.error('SendGrid error body (raw):', err.response.body);
            }
          }
    
          // Responder SIEMPRE para evitar 504
          return res.status(502).render("index", {
            title: "Rubicat - Un Llamado de la Naturaleza",
            descripcion: "Fina Bentonita Patagónica de excelente calidad. Rinde más de un mes por bidón. Ofrecemos variedad de calidad y muy buena duración para el higiene de tu gato. Aglutina en el momento. 100% natural. Elimina Olores.",
            keywords: "rubicat, rubicat premium, bentonita, arena aglutinante, piedras sanitarias, gatos",
            envioError: "No pudimos enviar tu mensaje. Probá nuevamente.",
            old: req.body
          });
        }
      },

          formularioenviado: (req, res) => {
            return res.render("formulario-enviado", {
              title: "Rubicat - Un llamado de la Naturaleza",
              descripcion: "Rubicat - Distribuidores",
              keywords: "rubicat, rubicat premium, bentonita, arena aglutinante, piedras sanitarias, gatos"
            })},

      distribuidores: (req, res) => {
        return res.render("distribuidores", {
          title: "Rubicat - Distribuidores",
          descripcion: "Mapa de distribuidores de Rubicat en Argentina. ¿Querés ser un distribuidor? Contactate con nosotros",
          keywords: "rubicat, rubicat premium, bentonita, arena aglutinante, piedras sanitarias, gatos, rubicat distribucion, distribucion"
        })},
          
          nosotros: (req, res) => {
            return res.render("nosotros", {
              title: "Rubicat - Nosotros",
              descripcion: "Historia, objetivos, producción, materia prima y comunicación de Rubicat ",
              keywords: "rubicat, rubicat premium, bentonita, arena aglutinante, piedras sanitarias, gatos"
            })}    
      }