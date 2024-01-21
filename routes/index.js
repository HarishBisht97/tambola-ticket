const tambola = require('./ticket.routes')

const selectionRoute = (app) => {
	app.use('/', tambola)
}
module.exports = { selectionRoute }
