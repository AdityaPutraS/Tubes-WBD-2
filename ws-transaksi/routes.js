'use strict';

module.exports = function(app) {
    var todoList = require('./controller');

    app.route('/')
        .get(todoList.index);

    app.route('/transactions')
        .post(todoList.trans);

    app.route('/cancelTrans')
        .post(todoList.cancelTrans);

    app.route('/successTrans')
        .post(todoList.successTrans);
    
    app.route('/createTrans')
        .post(todoList.createTrans);
    
};