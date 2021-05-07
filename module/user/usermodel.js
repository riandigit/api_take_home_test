var db = require('../../config/dbconfig');

const save = async (nama, email, hash, jk, status, usertype,nohp) => {
    try {
        let query = db.one(
            `insert into core.t_mtr_user
  (nama,email,password,jenis_kelamin,status,id_usertype) values ($1,$2,$3,$4,$5,$6) returning id_user`, [nama, email, hash, jk, status, usertype,nohp]
        ).then(data => {
            const saldonya = 0
            let saldo = db.none(
                `insert into trx.t_trx_saldo
      (id_user,saldo) values ($1,$2)`, [data.id_user, saldonya]
            )

        })
        return 100
    } catch (err) {
        return err
    }
}


const getData = async (cond, limit, offset) => {
    try {
        let where = `where users.status = 1`
        if (cond) {
            where += `and LOWER (nama) like LOWER('%${cond}%') and LOWER (email) like LOWER('%${cond}%') and LOWER (jk) like LOWER('%${cond}%') and LOWER (type) like LOWER('%${cond}%')`
        }
        let result = db.any(
            `select
            nama,
            email,
            jenis_kelamin,
            type
        from
            core.t_mtr_user users
        join core.t_mtr_usertype type on
            users.id_usertype = type.id_usertype
        ${where} order by nama asc LIMIT ${limit} OFFSET ${offset}`
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

module.exports = { save, getData }