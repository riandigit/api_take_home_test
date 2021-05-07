var db = require('../../config/dbconfig');

const bcrypt = require('bcryptjs');
const { result } = require('../../config/dbconfig');
const checkuser = async (email, password, usertype) => {
    try {
        let sql = `select
        users.id_user,
        users.email,
        users.nama,
        users.status,
        users.password,
        users.id_usertype,
        tipe.type,
        users.nohp,
        saldo.saldo
    from
        core.t_mtr_user users
        join core.t_mtr_usertype tipe on
        users.id_usertype = tipe.id_usertype
        join trx.t_trx_saldo saldo on users.id_user = saldo.id_user
    where
        users.email = '${email}'
        and users.id_usertype = ${usertype}
        and users.status = 1
    order by
    	saldo.id_saldo
    desc
     limit 1`
        let results = '';
        let data = await db.any(sql)
        if (data.length > 0) {
            user_data = {
                user: data
            }
           const resul = {
                status:bcrypt.compareSync(password, data[0].password),
                data:{
                    user_id:data[0].id_user,
                    nama:data[0].nama,
                    nohp:data[0].nohp,
                    saldo:data[0].saldo
                }
            }
            return resul

        } else {
            return 'no-data'
        }

    } catch (error) {
        console.log(error)
    }

}

module.exports = {
    checkuser
}
