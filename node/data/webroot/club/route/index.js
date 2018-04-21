var status = require('./status');

module.exports = function(app) {
    app.get('/', status.index);
    app.get('/act/', status.active);
}