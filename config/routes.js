const router = require('express').Router();

const usercontroller = require('../module/user/user');
const authcontroller = require('../module/main/auth');
const saldocontroller = require('../module/trx/saldo');
const promosicontroller = require('../module/master/promosi');
const produkcontroller = require('../module/master/produk');
const validasi = require('../middleware/validation');


router.get('/', function (req, res) {
    res.json({
        code:200,
        status: 'API Its Working',
        message: 'Welcome to API TAKE HOME TEST!'
    });
});

//authentication
router.route('/login')
    .post(authcontroller.login);
router.route('/createtoken')
    .post(authcontroller.createToken);
router.route('/register')
    .post(validasi.register, usercontroller.save);


// .delete(usercontroller.is_deleted);
router.route('/user/index')
    .post(authcontroller.checkToken, usercontroller.index);
router.route('/user/hapus')
    .post(authcontroller.checkToken, usercontroller.hapus);
router.route('/user/view/:id')
    .get(authcontroller.checkToken, usercontroller.view);
router.route('/user/update')
    .post(authcontroller.checkToken, validasi.editRegister, usercontroller.update);


//saldo
router.route('/saldo/get')
    .get(authcontroller.checkToken, saldocontroller.getSaldo);
router.route('/saldo/transfer')
    .post(authcontroller.checkToken, saldocontroller.transfer);
router.route('/saldo/history')
    .post(authcontroller.checkToken, saldocontroller.history);

//produk
router.route('/produk/index')
    .post(authcontroller.checkToken, produkcontroller.index);

//promosi
router.route('/promosi')
    .get(authcontroller.checkToken,promosicontroller.index)



    
module.exports = router;


