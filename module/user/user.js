var db = require('../../config/dbconfig')
var auth = require('../main/auth')
var config = require('../../config/config')
var bcrypt = require('bcryptjs')
var validate = require('../../helpers/validator')
var usermodel = require('./usermodel')

const save = async (req, res) => {

    var rawData = req.body
    var email = rawData.email
    var password = rawData.password

    var nama = rawData.nama
    var jk = rawData.jenis_kelamin
    var usertype = rawData.user_type
    var nohp = rawData.nohp

    var status = 1
    var salt = bcrypt.genSaltSync(10);
    var hashpassword = bcrypt.hashSync(password, salt);
    if (hashpassword) {
        const insert = await usermodel.save(nama, email, hashpassword, jk, status, usertype,nohp)
        if (insert == 100) {
            res.status(200).json({
                status:100,
                success: true,
                message: 'Add success'
            })
        } else {
            res.status(500).json({
                status:100,
                success: false,
                message: insert.message
            })
        }
    }
}

const index = async (req, res) => {
    let cond = req.query.search ? req.query.search : null
    let page = req.query.page ? parseInt(req.query.page) : 1
    let limit = req.query.limit ? parseInt(req.query.limit) : 100
    let offset = (page - 1) * limit


    var get = await usermodel.getData(cond, limit, offset)
    if (get) {
        res.status(200).json({
            success: true,
            message: 'Get success',
            count: get.length,
            data: get
        })
    } else {
        res.status(200).json({
            success: false,
            message: error.message,
            data: null
        })
    }

}

const hapus = async (req, res) => {
    auth.checkToken(req, res);
    var rawData = req.body;
    var id = rawData['id'];
    db.none('UPDATE core.t_mtr_user set status = $1 WHERE id_user =$2', ['-5', id])
        .then(data => {
            if (!data) {
                res.status(200).json({
                    success: true,
                    message: 'Delete Data Success',
                    data: data
                })
            }
        });
}

const update = async (req, res) => {
    auth.checkToken(req, res);
    var rawData = req.body;
    var email = rawData.email
    var nama = rawData.nama
    var jk = rawData.jenis_kelamin
    var usertype = rawData.user_type
    var status = 1
    var id = rawData.id

    console.log(rawData)
    const query = db.none(
        `UPDATE core.t_mtr_user set nama = $1 , email = $2 ,jenis_kelamin = $3,status = $4 , id_usertype = $5 WHERE id_user = $6`, [nama, email, jk, status, usertype, id]
    )

    query.then(() => {
        res.status(200).json({
            success: true,
            message: 'update success'
        })
    }).catch((err) => {
        res.status(500).json({
            success: false,
            message: err.message
        })
    })
};
const view = async (req, res) => {
    auth.checkToken(req, res);
    var id = req.params.id;

    db.any(
        `select * from core.t_mtr_user where id_user = $1`, [id])
        .then(data => {
            res.type('json');
            res.status(200).send({ data: data, status: 200, success: true });

        })
        .catch(error => {
            res.type('json');
            res.status(200).send({ message: error, status: 404 + 'not found', success: false });
        });
};

module.exports = {
    save, index, hapus, update, view
}