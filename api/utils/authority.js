const _ = require('lodash');
const Q = require('q');
const models = require('../models');
const idt = require('../utils/idt');

module.exports = _s => {
    var deferred = Q.defer();

    var data = _.pick(_s.raw, 'userid', 'token');
    models.Token
        .destroy({ where: {
            created_at: {
                $lt: new Date(new Date() - 24 * 60 * 60 * 1000)
            }
        } })
        .then(() => {
            return models.Token
                .findOne({
                    where: {
                        token: data.token
                    },
                    include: [{
                        model: models.User,
                        where: { id: idt.decode('User', data.userid) }
                    }]
                });
        })
        .then(token => {
            if (token) {
                deferred.resolve(_.extend(_s, { token, user_id: idt.decode('User', data.userid) }));
            } else {
                deferred.reject(['Unauthorized', _s, 401]);
            }
        });

    return deferred.promise;
};
