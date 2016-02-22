'use strict';

var index = function *(next) {
    this.body = yield this.render('index');
}

export default {
    index,
}