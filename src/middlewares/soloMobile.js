/* =========================================================
   SOLO MOBILE
   Si el visitante entra desde una computadora,
   lo redirige a la home.
   ========================================================= */

const esMobile = (userAgent = '') =>
  /Mobi|Android|iPhone|iPod|Windows Phone|BlackBerry|Opera Mini|IEMobile/i.test(userAgent);

module.exports = (req, res, next) => {
  // Le avisa a Google y a los cachés que la respuesta depende del dispositivo
  res.set('Vary', 'User-Agent');

  if (esMobile(req.get('User-Agent'))) {
    return next();
  }

  return res.redirect(302, '/');
};