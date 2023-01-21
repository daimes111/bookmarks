import Bookmark from '../Bookmark/Bookmark'

export default function BookmarkList({
    deleteBookmark,
    updateBookmark,
    bookmarks
}) {
    return (
        <ul>
            {
                bookmarks.length
                    ? bookmarks.map(bookmark => (
                        <Bookmark
                            key={bookmark._id}
                            bookmark={bookmark}
                            deleteBookmark={deleteBookmark}
                            updateBookmark={updateBookmark}
                        />

                    ))
                    : <>No bookmarks added</>
            }
        </ul>
    )
}
