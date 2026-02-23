const { validationResult } = require('express-validator');

const FormData = require('form-data');
const Mailgun = require('mailgun.js');

const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/1ywIdzVIcC43jaL01HGePKyg79aVEb2Xi23DSKWYDn-Q/viewform';

// Cliente Mailgun (crealo una sola vez)
const mailgun = new Mailgun(FormData);
const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY,
  // Si tu cuenta fuera EU:
  // url: 'https://api.eu.mailgun.net'
});

module.exports = {

  index: (req, res) => {
    return res.render("index", {
      title: "Rubicat - Un Llamado de la Naturaleza",
      descripcion: "Fina Bentonita Patagónica de excelente calidad. Rinde más de un mes por bidón. Ofrecemos variedad de calidad y muy buena duración para el higiene de tu gato. Aglutina en el momento. 100% natural. Elimina Olores.",
      keywords: "rubicat, rubicat premium, bentonita, arena aglutinante, piedras sanitarias, gatos"
    })
  },

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
      if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
        throw new Error("Falta MAILGUN_API_KEY o MAILGUN_DOMAIN en el .env");
      }

      // En sandbox, el FROM tiene que ser el postmaster del sandbox domain
      const from = "Rubicat Web <contacto@mg.rubicat.com.ar>";

      // El TO: podés dejar fijo o por env
      const to = 'info@rubicat.com.ar';

      const data = await mg.messages.create(process.env.MAILGUN_DOMAIN, {
        from,
        to: [to],
        subject: asunto || "Nuevo mensaje desde rubicat.com.ar",
        text: `
Nombre: ${nombre}
Correo: ${email}
Teléfono: ${telefono}
Mensaje: ${mensaje}

Enviado desde www.rubicat.com.ar
        `.trim(),
        html: `
          <p><strong>Nombre:</strong> ${nombre}</p>
          <p><strong>Correo:</strong> ${email}</p>
          <p><strong>Número de contacto:</strong> ${telefono}</p>
          <p><strong>Mensaje:</strong> ${mensaje}</p>
          <br>
          <p>Correo enviado desde www.rubicat.com.ar</p>
        `,
        // Para que al responder el mail te responda al cliente:
        'h:Reply-To': email
      });

      console.log('Mailgun OK:', data);

      return res.redirect('/formulario-enviado');

    } catch (err) {
      console.error('Mailgun error:', err);
      if (err?.response?.body) {
        console.error('Mailgun error body:', err.response.body);
      }

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
    })
  },

  distribuidores: (req, res) => {
    return res.render("distribuidores", {
      title: "Rubicat - Distribuidores",
      descripcion: "Mapa de distribuidores de Rubicat en Argentina. ¿Querés ser un distribuidor? Contactate con nosotros",
      keywords: "rubicat, rubicat premium, bentonita, arena aglutinante, piedras sanitarias, gatos, rubicat distribucion, distribucion"
    })
  },

  nosotros: (req, res) => {
    return res.render("nosotros", {
      title: "Rubicat - Nosotros",
      descripcion: "Historia, objetivos, producción, materia prima y comunicación de Rubicat ",
      keywords: "rubicat, rubicat premium, bentonita, arena aglutinante, piedras sanitarias, gatos"
    })
  },

  test: (req, res) => {
    return res.render("test", {
      title: "Rubicat - test",
      descripcion: "Historia, objetivos, producción, materia prima y comunicación de Rubicat ",
      keywords: "rubicat, rubicat premium, bentonita, arena aglutinante, piedras sanitarias, gatos"
    })
  },

  riodejaneiro: (req, res) => {
    const q = new URLSearchParams(req.query).toString();
    const target = q ? `${GOOGLE_FORM_URL}?${q}` : GOOGLE_FORM_URL;
    return res.redirect(302, target);
  }
};