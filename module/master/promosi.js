var promosimodel = require('./promosimodel')
const { UPLOAD_URL } = require('../../constants')

const index = async (req, res) => {
    let cond = req.query.search ? req.query.search : null
    let page = req.query.page ? parseInt(req.query.page) : 1
    let limit = req.query.limit ? parseInt(req.query.limit) : 100
    let offset = (page - 1) * limit
    let idkategori = req.query.idkategori

    var get = await promosimodel.getData(cond, limit, offset, idkategori)
    if (get) {
        var redata = await repromo(get)
        console.log(redata)
        res.status(200).json({
            status:200,
            success: true,
            message: 'Get success',
            count: get.length,
            data: redata
        })
    } else {
        res.status(500).json({
            status:500,
            success: false,
            message: error.message,
            data: null
        })
    }

}

const repromo = async (data) => {
    var i = 0;
    var jumlah = data.length;
    var da = {}
    var l = 0

    for (; i < jumlah; i++) {

        data[i].image = UPLOAD_URL + data[i].image
    }
    return data;

}


module.exports = { index }