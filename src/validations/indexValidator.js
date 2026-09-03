const { check } = require("express-validator");

const validateCreate = [

  check("nombre")
    .notEmpty()
    .withMessage("Debe ingresar su nombre")
    .bail()
    .isLength({ min: 3, max: 30 })
    .withMessage("El nombre debe tener un mínimo de 3 caracteres"),

  check("localidad")
    .notEmpty()
    .withMessage("Debe ingresar su localidad")
    .bail()
    .isLength({ max: 60 })
    .withMessage("El máximo de caracteres permitidos es de 60"),

  check("telefono")
    .notEmpty()
    .withMessage("Indique un número de contacto")
    .bail()
    .isLength({ max: 30 })
    .withMessage("El máximo de caracteres permitidos es de 30")
    .bail()
    .isNumeric()
    .withMessage("Solo se permiten números"),

  check("mensaje")
    .notEmpty()
    .withMessage("Debe ingresar su mensaje")

];

module.exports = { validateCreate };