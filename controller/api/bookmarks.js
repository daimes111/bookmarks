const Bookmark = require("../../models/bookmark")
const User = require("../../models/user")

module.exports = {
    jsonBookmark, 
    jsonBookmarks,
    create,
    index,
    update,
    destroy,
    show
 }

function jsonBookmark(req, res) {
    res.json(res.locals.data.bookmark)
  }
function jsonBookmarks(req, res) {
    res.json(res.locals.data.bookmarks)
  }

async function index(req, res, next) {
    try {
         const bookmarks = await Bookmark.find({}) 
         res.locals.data.bookmarks = bookmarks
         next()
    } catch(err) {
        res.status(400).json({msg: err.messae})
    }
}

async function create(req, res, next) {
    try {
         const bookmark = await Bookmark.create(req.body) 
         const user = await User.findOne({email: res.locals.data.email})
         user.bookmarks.addToSet(bookmark)
         await user.save()
         res.locals.data.bookmark = bookmark
         next()
    } catch(err) {
        res.status(400).json({msg: err.message})
    }
}

async function destroy(req, res, next) {
    try {
         const bookmark = await Bookmark.findByIdAndDelete(req.params.id) 
         res.locals.data.bookmark = bookmark
         next()
    } catch(err) {
        res.status(400).json({msg: err.messae})
    }
}

async function update(req, res, next) {
    try {
         const bookmark = await Bookmark.findByIdAndUpdate(req.params.id, req.body, {new: true}) 
         res.locals.data.bookmark = bookmark
         next()
    } catch(err) {
        res.status(400).json({msg: err.messae})
    }
}


//this is all bookmarks
async function show(req, res, next) {
    try {
         const bookmark = await Bookmark.findById(req.params.id) 
         res.locals.data.bookmark = bookmark
         next()
    } catch(err) {
        res.status(400).json({msg: err.messae})
    }
}