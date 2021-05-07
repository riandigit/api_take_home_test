var db = require('../../config/dbconfig');


const getData = async (cond, limit, offset,idkategori) => {
    try {
        let where = `where promosi.id_kategori = ${idkategori} and promosi.startdate <  CURRENT_TIMESTAMP and promosi.enddate >  CURRENT_TIMESTAMP and promosi.status = 1 `
        if (cond) {
            where += `and LOWER (promosi) like LOWER('%${cond}%') and LOWER (promosi.id_kategori)like LOWER('%${cond}%')`
        }
        let result = db.any(
            `select
            promosi,promosi.deskripsi,image,kategori.kategori
        from
            mtr.t_mtr_promosi promosi
        join mtr.t_mtr_kategori kategori on
            promosi.id_kategori = kategori.id_kategori
        ${where} group by promosi.id_kategori,promosi,promosi.deskripsi,image,kategori,startdate order by promosi.startdate ASC LIMIT ${limit} OFFSET ${offset}`
        )

        return result

    } catch (error) {
      console.log(error)
    }
}


module.exports = {
    getData
}