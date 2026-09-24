const { check } = require("express-validator");

const validateCreate = [

  check("nombre")
    .trim()
    .notEmpty().withMessage("Debe ingresar su nombre").bail()
    .isLength({ min: 3, max: 30 }).withMessage("El nombre debe tener entre 3 y 30 caracteres"),

  check("email")
    .trim()
    .notEmpty().withMessage("Debe ingresar su email").bail()
    .isEmail().withMessage("Ingrese un email válido")
    .normalizeEmail(),

  check("localidad")
    .trim()
    .notEmpty().withMessage("Debe ingresar su localidad").bail()
    .isLength({ max: 60 }).withMessage("El máximo de caracteres permitidos es de 60"),

  check("telefono")
    .trim()
    .notEmpty().withMessage("Indique un número de contacto").bail()
    .matches(/^[0-9+\s-]+$/).withMessage("Solo se permiten números, espacios, + y -").bail()
    .isLength({ min: 6, max: 30 }).withMessage("El teléfono debe tener entre 6 y 30 caracteres"),

  check("mensaje")
    .trim()
    .notEmpty().withMessage("Debe ingresar su mensaje").bail()
    .isLength({ max: 2000 }).withMessage("El mensaje no puede superar los 2000 caracteres")

];

module.exports = { validateCreate };