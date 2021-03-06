const path = require('path');
const merge = require('lodash').merge;
let prodConf = require('try-require')(path.join(__dirname, 'prod.conf'));

module.exports = merge(prodConf, {
    'db': process.env.REMOTE_DB ? {
        database: 'iwap-test'
    } : process.env.LOCAL_POSTGRES ? {
        host: 'localhost',
        username: '',
        password: '',
        database: 'iwap',
        logging: false,
    } : {
        dialect: 'sqlite',
        storage: './dev.db',
        host: 'localhost',
        user: '',
        password: '',
        database: 'iwap',
        logging: false,
        define: {
            underscored: false
        }
    },
    'file': {
        path: path.join(__dirname, '../files'),
        mimetype: ['image/gif', 'image/x-png', 'image/pjpeg', 'image/jpg', 'image/jpeg', 'image/png']
    }
});
