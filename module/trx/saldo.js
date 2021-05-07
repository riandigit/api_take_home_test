const { raw } = require('body-parser');
var db = require('../../config/dbconfig')
var saldomodel = require('./saldomodel')
const config = require('../../config/config')
var jwt = require('jsonwebtoken')

const getSaldo = async (req, res) => {
    var token = req.headers.authorization;
    var tokens = token.split("Bearer ");
    let user = jwt.verify(tokens[1], config.secret)
    console.log(user)
    db.any(
        `select saldo from trx.t_trx_saldo where id_user = $1 order by id_saldo DESC limit 1`, [user.data.user_id])
        .then(data => {
            res.type('json');
            res.status(200).send({ status: 200, success: true,data: data[0].saldo });
        })
        .catch(error => {
            res.type('json');
            res.status(404).send({ status: 404 + 'not found', success: false , message: error});
        });
};

const topUp = async (req, res) => {
    var rawData = req.body
    var id = rawData.id

}

const transfer = async (req, res) => {
    var rawData = req.body
    var nominal = rawData.nominal
    var deskripsi = rawData.deskripsi
    var bank = rawData.bank
    var norek = rawData.norek
    var tipepayment = rawData.tipepayment
    var token = req.headers.authorization

    const transferdata = await saldomodel.transfer(nominal, deskripsi, tipepayment, bank,norek,token)
    if (transferdata.code === 100) {
        res.type('json');
        res.status(200).send({ status: 200, success: true , data: transferdata.data})
    } else {
        res.type('json');
        res.status(500).send({ status: 500, success: false, data: transferdata.data })
    }

}

const history = async (req, res) => {
    var rawData = req.body
    var dari = rawData.tanggalmulai
    var ke = rawData.tanggalselesai
    var token = req.headers.authorization
    const historydata = await saldomodel.history(dari, ke, token)
    if (historydata.code === 100) {
        res.type('json');
        res.status(200).send({  status: 200, success: true  ,data: historydata.data})
    } else {
        res.type('json');
        res.status(500).send({  status: 500, success: false ,data: historydata.data})
    }
}

module.exports = { getSaldo, transfer, history }
