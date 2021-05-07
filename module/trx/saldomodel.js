var db = require('../../config/dbconfig');
const config = require('../../config/config')
var jwt = require('jsonwebtoken')

const getSaldo = async (req, res) => {
    var id = req.params.id;

    db.any(
        `select saldo from trx.t_trx_saldo where id_user = $1 order by id_saldo DESC LIMIT 1`, [id])
        .then(data => {
            res.type('json');
            res.status(200).send({ data: data, status: 200, success: true });

        })
        .catch(error => {
            res.type('json');
            res.status(200).send({ message: error, status: 404 + 'not found', success: false });
        });
};
const history = async (dari, ke, token) => {
    try {
        var tokens = token.split("Bearer ");
        let user = jwt.verify(tokens[1], config.secret)

        const data = await db.any(`select saldo,deskripsi,created_at from trx.t_trx_saldo where id_user = $1 and created_at::Date between $2 and $3 order by id_saldo DESC`, [user.data.user_id, dari, ke])
        console.log(data)
        return { code: 100, data: data }

    } catch (error) {
        console.log(error)
        return { code: 101, data: "Ada Kesalahan Cuy." }
    }

};


const transfer = async (nominal, deskripsi, type_payment, bank, norek, token) => {
    try {
        var tokens = token.split("Bearer ");
        let hasil = ""
        let user = jwt.verify(tokens[1], config.secret)
        const saldonya = await db.one(`select saldo from trx.t_trx_saldo where id_user = '$1' order by id_saldo desc limit 1`, [user.data.user_id])
        if (nominal < saldonya.saldo) {

            let query = db.one(
                `insert into trx.t_trx_daily
                (id_user,created_by,id_product,jumlah,nominal,deskripsi,id_tipe_payment,id_jenis_transaksi) 
                values ($1,$2,$3,$4,$5,$6,$7,$8) returning id_user`, [user.data.user_id, user.data.nama, 1, 1, nominal, deskripsi, type_payment, 2]
            ).then(data => {
                hasil = saldonya.saldo - nominal;
                var deskripsis = `Transfer uang ${nominal} ke ${norek}`
                let saldo = db.none(
                    `insert into trx.t_trx_saldo
                    (id_user,saldo,deskripsi) values ($1,$2,$3)`, [user.data.user_id, hasil, deskripsis]
                )
                if (bank === 1) {
                    var saldoterakhir = db.any(`select id_user,saldo from trx.t_trx_saldo where id_user = (select id_user from core.t_mtr_user where nohp = $1) order by id_saldo desc limit 1`, [norek]).then(datas => {
                        var saldoakhir = parseInt(datas[0].saldo) + parseInt(nominal)
                        console.log(datas[0].id_user)
                        var deskripsi = `Terima uang ${nominal} dari ${user.data.nama}`
                        const saldomasuk = db.none(`insert into trx.t_trx_saldo(id_user,saldo,deskripsi) values($1,$2,$3)`, [datas[0].id_user, saldoakhir, deskripsi]).catch(errss => {
                            console.log(errss)
                        })
                    }).catch(err => { console.log(err) })

                }
            }).catch(err => {
                console.log(err)
            })
            return { code: 100, data: "Transfer Berhasil." }
        } else {
            return { code: 101, data: "Saldo Anda Kurang." }
        }

    } catch (err) {
        return { code: 101, data: err }
    }
};


module.exports = {
    getSaldo, transfer, history
}