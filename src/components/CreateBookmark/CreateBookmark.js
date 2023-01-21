import styles from "./CreateBookmark.module.scss"

export default function CreateBookmark ({
  createBookmark,
  handleChangeBook,
  bookmark
}) {
  return (
    <>
      <h2>Create Bookmark</h2>
        <div className={styles.container}>
        <form 
      className={styles.form}
      onSubmit={(evt) => {
        evt.preventDefault()
        createBookmark()
      }}
      >
       <div>
       <label>Title<input type='text' value={bookmark.title} name='title' onChange={handleChangeBook} placeholder='Add title here' /></label>
        <label>URL<input type='text' value={bookmark.url} name='url' onChange={handleChangeBook} placeholder='Add url here' /></label>
       </div>
        <input className={styles.button} type='submit' value='Create Bookmark' />
      </form>
        </div>
    
    </>
  )
}
