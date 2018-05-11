'use strict'

const app = require('./app.js')
app.listen(app.get('port'), () =>	
	console.log(`Iniciando Express en el puerto ${app.get('port')}`)
)
