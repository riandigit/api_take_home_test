var db = require('../../config/dbconfig');


const getData = async (cond, limit, offset) => {
    try {
        let where = `where produk.id_kategori != 1`
        if (cond) {
            where += `and LOWER (produk.nama) like LOWER('%${cond}%') and LOWER (kategori.kategori)like LOWER('%${cond}%')`
        }
        let result = db.any(
            `select produk.nama,kategori,produk.deskripsi,jumlah,harga,users.nama from mtr.t_mtr_produk produk join mtr.t_mtr_kategori kategori on produk.id_kategori = kategori.id_kategori join core.t_mtr_user users on produk.id_user = users.id_user 
        ${where} group by produk.id_kategori,produk.nama,kategori.kategori,produk.deskripsi,jumlah,harga,users.nama order by produk.id_kategori ASC LIMIT ${limit} OFFSET ${offset}`
        )
           
        return result

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            data: null
        })
    }
}


module.exports = {
    getData
}