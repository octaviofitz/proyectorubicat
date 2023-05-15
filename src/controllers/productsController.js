module.exports = {
    classic: (req, res) => {
      return res.render("classic", {
        title: "Rubicat - Classic",
        descripcion: "Rubicat Classic es elaborada con Bentonita Sódica, 100% natural. Su capacidad aglutinante permite la formación de cúmulos, faciles de limpiar, resultando más económico que otros productos",
        keywords: "rubicat, rubicat classic, rubicat lavanda bentonita, arena aglutinante, piedras sanitarias, gatos"
      })},
    
      premium: (req, res) => {
        return res.render("premium", {
          title: "Rubicat - Premium",
          descripcion: "Rubicat Premium aglutina de manera instantánea, permitiendo desechar únicamente el material utilizado y otorgando un mayor rendimiento. Rubicat Premium estará seca, limpia y sin olores para un uso continuo",
          keywords: "rubicat, rubicat premium, bentonita, arena aglutinante, piedras sanitarias, gatos"
        })},

        sensitive: (req, res) => {
            return res.render("sensitive", {
              title: "Rubicat - Sensitive",
              descripcion: "Rubicat Sensitive ofrece extremo control de olores y aglutinación instantánea. Para usuarios exigentes",
              keywords: "rubicat, rubicat sensitive, bentonita, arena aglutinante, gatos, piedras sanitarias"
            })},

            original: (req, res) => {
              return res.render("original", {
                title: "Rubicat - Original",
                descripcion: "Rubicat Original fue creado a partir de la fórmula original (primera fórmula) con una molienda actualizada.",
                keywords: "rubicat, rubicat original, bentonita, arena aglutinante, gatos, piedras sanitarias"
              })}
      }
    
    
  
     