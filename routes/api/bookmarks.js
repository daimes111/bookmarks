const express = require('express')
const router = express.Router()
const controller = require('../../controller/api/bookmarks')
const ensureLoggedIn = require('../../config/ensureLoggedIn')
const checkToken = require('../../config/checkToken')

// router.get("/", controller.index, controller.jsonBookmarks)
router.post('/', checkToken, ensureLoggedIn, controller.create, controller.jsonBookmark)
router.delete('/:id', checkToken, ensureLoggedIn, controller.destroy, controller.jsonBookmark)
router.put('/:id', checkToken, ensureLoggedIn, controller.update, controller.jsonBookmark)
router.get('/:id', controller.show, controller.jsonBookmark)

module.exports = router
