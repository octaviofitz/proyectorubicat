const { validationResult } = require ('express-validator');

const validateResult = (req, res, next) => {
    try {
        
    } catch (err) {
        res.status(403)
        res.send( {errors: err.array()})
    }
}

module.exports= { validateResult }