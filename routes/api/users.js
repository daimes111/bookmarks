const router = require('express').Router()
const { dataController, apiController } = require('../../controller/api/users')
const ensureLoggedIn = require('../../config/ensureLoggedIn')
const checkToken = require('../../config/checkToken')

/* /api/users */
router.post('/', dataController.signUp, apiController.auth)
router.post('/login', dataController.login, apiController.auth)

// would also need user ID
// router.get("/bookmarks", dataController.getUserBookmarks, apiController.bookmarks)

router.get('/bookmarks', checkToken, ensureLoggedIn, dataController.getUserBookmarks, apiController.bookmarks)

// router.get('/check-token', ensureLoggedIn, checkToken)

module.exports = router
