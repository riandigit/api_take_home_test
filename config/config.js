var config ={}

// //local rian
const cn = {
    host: 'localhost', // 'localhost' is the default;
    port: 5433, // 5432 is the default;
    database: 'DB_TAKE_HOME_TEST',
    user: 'postgres',
    password: 'postgre'
}
//dev baru
// const cn = {
//     host: '36.66.3.92', // 'localhost' is the default;
//     port: 5432, // 5432 is the default;
//     database: 'DB_TAKE_HOME_TEST',
//     user: 'riandi',
//     password: '+M%y7k%7-rWK&5H4'
// }

//dev
// const cn = {
//     host: '103.93.160.124', // 'localhost' is the default;
//     port: 5432, // 5432 is the default;
//     database: 'DB_TAKE_HOME_TEST',
//     user: 'riandi',
//     password: 'CHYEMWC4'
// }
// Database connection

config.db_string = cn


// Application
config.domain = 'localhost:7027/'
config.port = 7020
// config.port = 7027 //dev
config.secret = '28733a06fe0978de7ff4bfb3c4c52ba0'

module.exports=config