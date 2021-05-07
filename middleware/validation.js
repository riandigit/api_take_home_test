
const Validator = require('../helpers/validator');
const register = async (req, res, next) => {
    const validationRule = {
        "nama": "required|string|exist:t_mtr_user,nama",
        "email": "required|string|email|exist:t_mtr_user,email",
        "password": "required|string|min:6|strict",
        "jenis_kelamin": "required",
        "user_type": "required",
    }

const custommessage =  {required:':attribute jangan kosong'}

    await Validator(req.body, validationRule, custommessage, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    });
}

const editRegister = async (req, res, next) => {
    const validationRule = {
        "nama": "required|string|exist:t_mtr_user,nama",
        "email": "required|string|email|exist:t_mtr_user,email",
        "jenis_kelamin": "required",
        "user_type": "required",
    }

    await Validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    });
}

module.exports = {
    register,editRegister
};