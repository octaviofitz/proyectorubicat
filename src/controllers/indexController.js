const { validationResult } = require('express-validator');

const FormData = require('form-data');
const Mailgun = require('mailgun.js');


/* =========================================================
   MAILGUN
   ========================================================= */

const mailgun = new Mailgun(FormData);

const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY,
});


/* =========================================================
   HELPERS
   ========================================================= */

/*
  Escapa el contenido que viene del formulario antes de
  meterlo en el HTML del mail, para que nadie pueda inyectar
  etiquetas en el correo que recibimos.
*/

const escapar = (valor = '') =>
  String(valor)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');


/* =========================================================
   DATOS COMUNES DE LA HOME
   ========================================================= */

const datosHome = {

  title: "Rubicat - Un Llamado de la Naturaleza",

  descripcion:
    "Fina Bentonita Patagónica de excelente calidad. Rinde más de un mes por bidón. Ofrecemos variedad de calidad y muy buena duración para el higiene de tu gato. Aglutina en el momento. 100% natural. Elimina Olores.",

  keywords:
    "rubicat, rubicat premium, bentonita, arena aglutinante, piedras sanitarias, gatos"

};


/* =========================================================
   CONTROLLERS
   ========================================================= */

module.exports = {


  /* =======================================================
     INDEX
     ======================================================= */

  index: (req, res) => {

    return res.render("newindex", datosHome);

  },


  /* =======================================================
     FORMULARIO
     ======================================================= */

  formulario: async (req, res) => {

    const errors = validationResult(req);


    /* -----------------------------------------------------
       ERRORES DE VALIDACIÓN
       ----------------------------------------------------- */

    if (!errors.isEmpty()) {

      return res.status(400).render("newindex", {

        ...datosHome,

        errores: errors.mapped(),

        old: req.body

      });

    }


    /* -----------------------------------------------------
       DATOS DEL FORMULARIO
       ----------------------------------------------------- */

    const {
      nombre,
      localidad,
      telefono,
      mensaje
    } = req.body;


    try {


      /* ---------------------------------------------------
         VERIFICAR MAILGUN
         --------------------------------------------------- */

      if (
        !process.env.MAILGUN_API_KEY ||
        !process.env.MAILGUN_DOMAIN
      ) {

        throw new Error(
          "Falta MAILGUN_API_KEY o MAILGUN_DOMAIN en el .env"
        );

      }


      /* ---------------------------------------------------
         REMITENTE Y DESTINATARIO
         --------------------------------------------------- */

      const from = "Rubicat Web <contacto@mg.rubicat.com.ar>";

      const to = "info@rubicat.com.ar";


      /* ---------------------------------------------------
         ENVIAR MAIL
         --------------------------------------------------- */

      const data = await mg.messages.create(
        process.env.MAILGUN_DOMAIN,
        {

          from,

          to: [to],

          subject: `Nuevo mensaje de ${nombre} desde rubicat.com.ar`,

          text: `
Nombre: ${nombre}
Localidad: ${localidad}
Teléfono: ${telefono}
Mensaje: ${mensaje}

Enviado desde www.rubicat.com.ar
`.trim(),

          html: `
            <p><strong>Nombre:</strong> ${escapar(nombre)}</p>
            <p><strong>Localidad:</strong> ${escapar(localidad)}</p>
            <p><strong>Número de contacto:</strong> ${escapar(telefono)}</p>
            <p><strong>Mensaje:</strong> ${escapar(mensaje)}</p>
            <br>
            <p>Correo enviado desde www.rubicat.com.ar</p>
          `

        }
      );


      console.log("Mailgun OK:", data);


      /* ---------------------------------------------------
         REDIRECCIÓN
         --------------------------------------------------- */

      return res.redirect("/formulario-enviado");


    } catch (err) {

      console.error("Mailgun error:", err);


      if (err?.response?.body) {

        console.error(
          "Mailgun error body:",
          err.response.body
        );

      }


      /* ---------------------------------------------------
         ERROR DE ENVÍO
         --------------------------------------------------- */

      return res.status(502).render("newindex", {

        ...datosHome,

        envioError:
          "No pudimos enviar tu mensaje. Probá nuevamente.",

        old: req.body

      });

    }

  },


  /* =======================================================
     FORMULARIO ENVIADO
     ======================================================= */

  formularioenviado: (req, res) => {

    return res.render("formulario-enviado", {

      title: "Rubicat - Un llamado de la Naturaleza",

      descripcion: "Rubicat - Distribuidores",

      keywords:
        "rubicat, rubicat premium, bentonita, arena aglutinante, piedras sanitarias, gatos"

    });

  },


  /* =======================================================
     NOSOTROS
     ======================================================= */

  nosotros: (req, res) => {

    return res.render("nosotros", {

      title: "Rubicat - Nosotros",

      descripcion:
        "Historia, objetivos, producción, materia prima y comunicación de Rubicat",

      keywords:
        "rubicat, rubicat premium, bentonita, arena aglutinante, piedras sanitarias, gatos"

    });

  }, 


  /* =======================================================
     ORIGEN
     ======================================================= */

  origen: (req, res) => {

    return res.render("origen", {

      title: "Rubicat - Nosotros",

      descripcion:
        "Historia, objetivos, producción, materia prima y comunicación de Rubicat",

      keywords:
        "rubicat, rubicat premium, bentonita, arena aglutinante, piedras sanitarias, gatos"

    });

  },


  /* =======================================================
     PRODUCTOS
     ======================================================= */

  productos: (req, res) => {

    return res.render("productos", {

      title: "Rubicat - Productos",

      descripcion:
        "Historia, objetivos, producción, materia prima y comunicación de Rubicat",

      keywords:
        "rubicat, rubicat premium, bentonita, arena aglutinante, piedras sanitarias, gatos"

    });

  },


  /* =======================================================
     PREGUNTAS FRECUENTES
     ======================================================= */

  preguntasfrecuentes: (req, res) => {

    return res.render("preguntas-frecuentes", {

      title: "Rubicat - Preguntas Frecuentes",

      descripcion:
        "Historia, objetivos, producción, materia prima y comunicación de Rubicat",

      keywords:
        "rubicat, rubicat premium, bentonita, arena aglutinante, piedras sanitarias, gatos"

    });

  }


};