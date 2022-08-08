const { check } = require("express-validator");

const validateCreate = [

    /* Nombre */
    check("nombre")
    .notEmpty()
    .withMessage("Debe ingresar su nombre")
    .bail()
    .isLength({
      min: 3,
      max: 30,
    })
    .withMessage("El nombre debe tener un mínimo de 3 caracteres"),

    /* Correo */

  check("email")
    .notEmpty()
    .withMessage("Debe ingresar un correo")
    .isEmail()
    .withMessage("Debe ingresar un correo válido"),

    /* Número de contacto */

    check("telefono")
    .notEmpty()
    .withMessage("Indique un número de contacto")
    .bail()
    .isLength({ max: 30 })
    .withMessage("El máximo de caracteres permitidos es de 30")
    .bail()
    .isNumeric()
    .withMessage("Solo se permiten números")
    .bail(),

    /* Asunto */

    check("asunto")
    .notEmpty()
    .withMessage("Debe ingresar un asunto")
    .bail()
    .isLength({ max: 100 })
    .withMessage("El maximo de caracteres permitidos es de 100")
    .bail(),

    /* Mensaje */

     check("mensaje")
     .notEmpty()
     .bail()
    .withMessage("Debe ingresar su mensaje")
];

module.exports = {validateCreate}
