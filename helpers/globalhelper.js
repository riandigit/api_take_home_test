const path = require('path')

let globalHelper ={}

globalHelper.imagepath = function (req){

    let nama = req.name
    let splitnama = nama.split("-")

    const dateObj = new Date(parseInt(splitnama[0]))
    const year = String(dateObj.getFullYear())
    const month = String(dateObj.getMonth() + 1)
    const day = String(dateObj.getDate())

    const dir = path.join(`/${year}`,month, day,`${nama}${req.ext}`)
    const dirrep = dir.replace(/\\/g, "/");
    return dirrep


}

module.exports = globalHelper
