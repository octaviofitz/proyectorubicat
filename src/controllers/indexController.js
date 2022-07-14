module.exports = {
    index: (req, res) => {
      return res.render("index", {
        title: "Rubicat - Un Llamado de la Naturaleza",
      })},
    
      distribuidores: (req, res) => {
        return res.render("distribuidores", {
          title: "Rubicat - Distribuidores",
        })},

        contacto: (req, res) => {
          return res.render("contacto", {
            title: "Rubicat - Contacto",
          })},
          
          nosotros: (req, res) => {
            return res.render("nosotros", {
              title: "Rubicat - Nosotros",
            })}    
      }
    
    
  
     
        