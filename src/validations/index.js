const { check } = require("express-validator");
const { validateResult } = require ('../helpers/validateHelper')

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
    .withMessage("Debe ingresar un correo valido"),

    /* Número de contacto */

    check("telefono")
    .notEmpty()
    .withMessage("Indique un número de contacto")
    .bail()
    .isLength({ max: 30 })
    .withMessage("El maximo de caracteres permitidos es de 30")
    .bail()
    .isNumeric()
    .withMessage("Solo se permiten números")
    .bail(),

    /* Asunto */

    check("asunto")
    .notEmpty()
    .withMessage("Debe indicar un asunto")
    .bail()
    .isLength({ max: 100 })
    .withMessage("El maximo de caracteres permitidos es de 100")
    .bail(),

    /* Mensaje */

     check("mensaje")
    .isLength({
      max: 1000,
    })
    .withMessage("El numero máximo de caracteres es de 1000"),

    (req, res, next) => {
      validateResult(res, req, next)
    }
];

module.exports = {validateCreate}
