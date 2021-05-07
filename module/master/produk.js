var produkmodel = require('./produkmodel')

const index = async (req, res) => {
    let cond = req.query.search ? req.query.search : null
    let page = req.query.page ? parseInt(req.query.page) : 1
    let limit = req.query.limit ? parseInt(req.query.limit) : 100
    let offset = (page - 1) * limit


    var get = await produkmodel.getData(cond, limit, offset)
    if (get) {

        var datas = await reproduk(get);

        let result = {
            success: true,
            status: 200,
            message: 'Get success',
            count: get.length,
            data: datas
        }
        console.log(result)
        res.status(200).json(result)
    } else {
        res.status(500).json({
            status: 500,
            success: false,
            message: error.message,
            data: null
        })
    }

}

const reproduk = async (data) => {
    var i = 0;
    var jumlah = data.length;
    var da = {}
    var l = 0
    var kategori = "";
    for (; i < jumlah; i++) {
        if (kategori == "") {
            kategori = data[i].kategori
            da[kategori] = [data[i]];
        } else if (kategori != data[i].kategori) {
            kategori = data[i].kategori
            da[kategori] = [data[i]];

        } else {
            l++
            da[kategori].push(data[i]);
        }
    }
    return da;

}

module.exports = { index }