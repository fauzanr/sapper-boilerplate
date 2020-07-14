const router = require('express').Router()

router.post('/auth/login', (req, res) => {
	req.session.authenticated = true
	res.json('ok')
})

router.post('/auth/logout', (req, res) => {
	delete req.session.authenticated
	res.json('ok')
})

module.exports = router