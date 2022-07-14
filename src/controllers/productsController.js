module.exports = {
    classic: (req, res) => {
      return res.render("classic", {
        title: "Rubicat - Classic",
      })},
    
      premium: (req, res) => {
        return res.render("premium", {
          title: "Rubicat - Premium",
        })},

        sensitive: (req, res) => {
            return res.render("sensitive", {
              title: "Rubicat - Sensitive",
            })}
      }
    
    
  
     