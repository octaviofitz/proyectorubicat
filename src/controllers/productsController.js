module.exports = {
    classic: (req, res) => {
      return res.render("classic", {
        title: "Rubicat - Classic",
        descripcion: "Nashe"
      })},
    
      premium: (req, res) => {
        return res.render("premium", {
          title: "Rubicat - Premium",
          descripcion: "Nashe"
        })},

        sensitive: (req, res) => {
            return res.render("sensitive", {
              title: "Rubicat - Sensitive",
              descripcion: "Nashe"
            })}
      }
    
    
  
     