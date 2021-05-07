const config = require('../../config/config')
const model = require('./authmodel')
var jwt = require('jsonwebtoken')

const login = async (req, res) => {
    var rawData = req.body;
    var email = rawData['email']
    var password = rawData['password']
    let token = ""
    const data ={}
    var usertype = rawData['usertype']
    let user_data = {}
    var get = await model.checkuser(email, password, usertype)
    if (get.status === true) {
        token = jwt.sign({data:get.data}, config.secret, { expiresIn: '3d' });
        res.status(200).json(
            {
                token: token, status: 200, success: true,data:get.data
            }
        )
    } else if (get === 'no-data') {
        res.status(200).json(
            {
                data: 0, status: 404, message: 'email di type ini tidak ditemukan'
            }
        )
    } else {
        res.status(200).json(
            {
                data: 0, status: 404, message: 'Password yang anda masukan salah.'
            }
        )
    }

}

const createToken = async (req, res) => {
    try {
        var user_data = { uid: 3 };
        token = await jwt.sign(user_data, config.secret, { expiresIn: "3d" });
        res.status(200).json(
            {
                token: token, status: 200, success: true
            }
        )
    } catch (error) {
        console.log(error)
    }

}
const checkToken = async (req, res, next) => {
    var userAgent = req.body.token || req.query.token || req.headers.authorization; // mengambil token di antara request

    if (userAgent == undefined) {
        res.type('json');
        res.status(401).send({ status: 401, message: 'Kamu tidak memiliki akses kesini.' });
    } else {
        var token = userAgent.split("Bearer ");
        if (token[1]) {
            try {
                jwt.verify(token[1], config.secret, function (err, decoded) {
                    if (err) {
                        console.log(err)
                        res.type('json');
                        res.status(401).send({ status: 401, message: 'Gagal memverifikasi Kemungkinan token anda expired' });
                    } else {
                        req.decoded = decoded; // menyimpan decoded ke req.decoded
                        console.log(req.decoded)
                        next(); //melajutkan proses
                    }
                });
            } catch (err) {
                console.log(err)
            }
        } else { // apa bila tidak ada token
            return res.status(401).send({ status: 401, message: 'Token kamu tidak ada.' });
        }
    }
}


module.exports = {
    login,
    checkToken,
    createToken
}
