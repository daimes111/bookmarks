// import { useState, useEffect } from 'react'
// import Auth from './components/Auth/Auth'

// export default function App () {
//   const [credentials, setCredentials] = useState({
//     email: '',
//     password: '',
//     name: ''
//   })
//   const [bookmark, setBookmark] = useState({
//     title: '',
//     url: ''
//   })
//   const [bookmarks, setBookmarks] = useState([])
//   // const [foundBookmarks, setFoundBookmarks] = useState([])

//   const [token, setToken] = useState('')
//   const [showInput, setShowInut] = useState(false)

//   const login = async () => {
//     try {
//       const response = await fetch('/api/users/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ email: credentials.email, password: credentials.password })
//       })
//       const tokenResponse = await response.json()
//       setToken(tokenResponse)
//       localStorage.setItem('token', JSON.stringify(tokenResponse))
//     } catch (err) {
//       console.error(err)
//     }
//   }

//   const signUp = async () => {
//     try {
//       const response = await fetch('/api/users', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ ...credentials })
//       })
//       const tokenResponse = await response.json()
//       setToken(tokenResponse)
//       localStorage.setItem('token', JSON.stringify(tokenResponse))
//     } catch (err) {
//       console.error(err)
//     }
//   }

//   const createBookmark = async () => {
//     try {
//       const response = await fetch('/api/bookmarks', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`
//         },
//         body: JSON.stringify({ ...bookmark })
//       })
//       const data = await response.json()
//       setBookmarks([data, ...bookmarks])
//     } catch (err) {
//       console.error(err)
//     } finally {
//       setBookmark({
//         title: '',
//         url: ''
//       })
//     }
//   }

//   const userBookmarks = async () => {
//     try {
//       const response = await fetch('/api/users/bookmarks', {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         //   Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
//         Authorization: `Bearer ${(localStorage.getItem('token'))}`
//         }
//       })
//       const data = await response.json()
//       setBookmarks(data)
//     } catch (error) {
//       console.error(error)
//     }
//   }

//   const deleteBookmark = async (id) => {
//     try {
//       const response = await fetch(`/api/bookmarks/${id}`, {
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`
//         }
//       })
//       const bookmarksCopy = [...bookmarks]
//       const index = bookmarksCopy.findIndex(bookmark => bookmark._id === id)
//       bookmarksCopy.splice(index, 1)
//       setBookmarks(bookmarksCopy)
//     } catch (err) {
//       console.error(err)
//     }
//   }

//   const updateBookmark = async (id, updatedBookmark) => {
//     try {
//       const response = await fetch(`/api/bookmarks/${id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`
//         },
//         body: JSON.stringify({ ...bookmark, updatedBookmark })
//       })
//       const data = await response.JSON
//       const bookmarksCopy = [...bookmarks]
//       const index = bookmarksCopy.findIndex(bookmark => bookmark._id === id)
//       bookmarksCopy[index] = { ...bookmarksCopy[0], ...updatedBookmark }

//       setBookmarks(bookmarksCopy)
//     } catch (err) {
//       console.error(err)
//     }
//   }
//   const handleChangeAuth = (evt) => {
//     setCredentials({ ...credentials, [evt.target.name]: evt.target.value })
//   }
//   const handleChangeBook = (evt) => {
//     setBookmark({ ...bookmark, [evt.target.name]: evt.target.value })
//   }

//   // useEffect(() => {
//   //     userBookmarks()
//   // },[])
//   useEffect(() => {
//     const tokenData = localStorage.getItem('token')
//     if(tokenData && tokenData !== 'null' && tokenData !== 'undefined'){
//       userBookmarks()
//     }
// }, [])

// useEffect(() => {
//     const tokenData = localStorage.getItem('token')
//     if(tokenData && tokenData !== 'null' && tokenData !== 'undefined'){
//         setToken(JSON.parse(tokenData))
//     }
// }, [])

//   return (
//     <>
//       <Auth
//         login={login}
//         signUp={signUp}
//         token={token}
//         setToken={setToken}
//         credentials={credentials}
//         handleChangeAuth={handleChangeAuth}
//       />

//       <h2>Create Bookmark</h2>
//       <form onSubmit={(evt) => {
//         evt.preventDefault()
//         createBookmark()
//       }}
//       >
//         <input type='text' value={bookmark.title} name='title' onChange={handleChangeBook} placeholder='Add title here' />
//         <input type='text' value={bookmark.url} name='url' onChange={handleChangeBook} placeholder='Add url here' />
//         <input type='submit' value='Create Bookmark' />
//       </form>
//       <ul>
//         {bookmarks.length ? bookmarks.map(book => (
//             <li key={book._id}>
//               <h3>{book.title}</h3>
//               <a href={book.url} target='_blank' rel='noreferrer'>{book.url}</a>
//               <button onClick={(() => deleteBookmark(book._id))}> Delete</button>

//             </li>
//           ))
//           : <>No bookmarks added</>}
//       </ul>
//     </>
//   )
// }

import { useState, useEffect } from 'react'
import Auth from './components/Auth/Auth'
import CreateBookmark from './components/CreateBookmark/CreateBookmark'
import BookmarkList from './components/BookmarkList/BookmarkList'

export default function App () {
  /*
    Login, SignUp, CreateBookmark, ListBookmarksByUser, DeleteBookmark, UpdateBookmark
    */

  const handleChangeAuth = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value })
  }
  const handleChangeBook = (event) => {
    setBookmark({ ...bookmark, [event.target.name]: event.target.value })
  }
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    name: ''
  })
  const [bookmark, setBookmark] = useState({
    title: '',
    url: ''
  })
  const [bookmarks, setBookmarks] = useState([])

  const [token, setToken] = useState('')
  const login = async () => {
    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: credentials.email, password: credentials.password })
      })
      const tokenResponse = await response.json()
      setToken(tokenResponse)
      localStorage.setItem('token', JSON.stringify(tokenResponse))
    } catch (error) {
      console.error(error)
    } finally {
        window.location.reload()
    }
  }
  const signUp = async () => {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...credentials })
      })
      const tokenResponse = await response.json()
      setToken(tokenResponse)
      localStorage.setItem('token', JSON.stringify(tokenResponse))
    } catch (error) {
      console.error(error)
    } finally {
        window.location.reload()
    }
  }
  const createBookmark = async () => {
    try {
      const response = await fetch('/api/bookmarks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ ...bookmark })
      })
      const data = await response.json()
      setBookmarks([data, ...bookmarks])
    } catch (error) {
      console.error(error)
    } finally {
      setBookmark({
        title: '',
        url: ''
      })
    }
  }
  const listBookmarksByUser = async () => {
    try {
      const response = await fetch('/api/users/bookmarks', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      })
      const data = await response.json()
      setBookmarks(data)
    } catch (error) {
      console.error(error)
    }
  }
  const deleteBookmark = async (id) => {
    try {
      const response = await fetch(`/api/bookmarks/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
      const data = await response.json()
      const bookmarksCopy = [...bookmarks]
      const index = bookmarksCopy.findIndex(bookmark => id === bookmark._id)
      bookmarksCopy.splice(index, 1)
      setBookmarks(bookmarksCopy)
    } catch (error) {
      console.error(error)
    }
  }
  const updateBookmark = async (id, updatedData) => {
    try {
      const response = await fetch(`/api/bookmarks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(updatedData)
      })
      const data = await response.json()
      const bookmarksCopy = [...bookmarks]
      const index = bookmarksCopy.findIndex(bookmark => id === bookmark._id)
      bookmarksCopy[index] = { ...bookmarksCopy[index], ...updatedData }
      setBookmarks(bookmarksCopy)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const tokenData = localStorage.getItem('token')
    if (tokenData && tokenData !== 'null' && tokenData !== 'undefined') {
      listBookmarksByUser()
    }
  }, [token])

  useEffect(() => {
    const tokenData = localStorage.getItem('token')
    if (tokenData && tokenData !== 'null' && tokenData !== 'undefined') {
      setToken(JSON.parse(tokenData))
    }
  }, [])
  return (
    <>
    {token ? 
    <button onClick={() => {
        localStorage.removeItem("token")
        window.location.reload()
    }}>
        Logout
    </button> : ""}
      <Auth
        login={login}
        credentials={credentials}
        handleChangeAuth={handleChangeAuth}
        signUp={signUp}
        token={token}
        setToken={setToken}
      />
      <CreateBookmark
        createBookmark={createBookmark}
        bookmark={bookmark}
        handleChangeBook={handleChangeBook}
      />
      <BookmarkList
        bookmarks={bookmarks}
        deleteBookmark={deleteBookmark}
        updateBookmark={updateBookmark}
      />
    </>
  )
}
