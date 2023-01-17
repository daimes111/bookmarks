import { useState, useEffect }  from "react"

export default function App() {
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
        name: ""
    })
    const [bookmark, setBookmark] = useState({
        title: "",
        url: ""
    })
    const [bookmarks, setBookmarks] = useState([])
    // const [foundBookmarks, setFoundBookmarks] = useState([])

    const [token, setToken] = useState("")

    const login = async () => {
        try {
            const response = await fetch("/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email: credentials.email, password: credentials.password })
            })
            const tokenResponse = await response.json()
            setToken(tokenResponse)
            localStorage.setItem("token", JSON.stringify(tokenResponse))
        } catch (err) {
            console.error(err)
        }
    }

    const signUp = async () => {
        try {
            const response = await fetch("/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ ...credentials })
            })
            const tokenResponse = await response.json()
            setToken(tokenResponse)
            localStorage.setItem("token", JSON.stringify(tokenResponse))
        } catch (err) {
            console.error(err)
        }
    }

    const createBookmark = async () => {
        try {
            const response = await fetch("/api/bookmarks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ ...bookmark })
            })
            const data = await response.JSON
            setBookmarks([data, ...bookmarks])
            setBookmark({
                title: "",
                url: ""
            })
        } catch (err) {
            console.error(err)
        }
    }

    const userBookmarks = async () => {
        try {
            const response = await fetch("/api/users/bookmarks", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`
                }
            })
            const data = await response.json()
            setBookmarks([data])
        } catch (err) {
            console.error(err)
        }
    }

    const deleteBookmark = async (id) => {
        try {
            const response = await fetch(`/api/bookmarks/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            })
            const data = await response.JSON
            const bookmarksCopy = [...bookmarks]
            const index = bookmarksCopy.findIndex(bookmark => bookmark._id === id)
            bookmarksCopy.splice(index, 1)
            setBookmarks(bookmarksCopy)
        } catch (err) {
            console.error(err)
        }
    }

    const updateBookmark = async (id, updatedBookmark) => {
        try {
            const response = await fetch(`/api/bookmarks/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ ...bookmark, updatedBookmark })
            })
            const data = await response.JSON
            const bookmarksCopy = [...bookmarks]
            const index = bookmarksCopy.findIndex(bookmark => bookmark._id === id)
            bookmarksCopy[index] = { ...bookmarksCopy[0], ...updatedBookmark }

            setBookmarks(bookmarksCopy)
        } catch (err) {
            console.error(err)
        }
    }
    const handleChangeAuth = (evt) => {
        setCredentials({ ...credentials, [evt.target.name]: evt.target.value })
    }
    const handleChangeBook = (evt) => {
        setBookmark({ ...bookmark, [evt.target.name]: evt.target.value })
    }
    
    // useEffect(() => {
    //     userBookmarks()
    // },[])
    useEffect(() => {
        const tokenData = localStorage.getItem('token')
        if(tokenData && tokenData !== 'null' && tokenData !== 'undefined'){
          userBookmarks()
        }
    }, [])

    useEffect(() => {
        const tokenData = localStorage.getItem('token')
        if(tokenData && tokenData !== 'null' && tokenData !== 'undefined'){
            setToken(JSON.parse(tokenData))
        }
    }, [])

    return (
        <>
            <h2>Login</h2>
            <form onSubmit={(evt) => {
                evt.preventDefault()
                login()
            }}>
                Email: <input type="text" value={credentials.email} name="email" onChange={handleChangeAuth}></input>
                Password: <input type="text" value={credentials.password} name="password" onChange={handleChangeAuth}></input>
                <input type="submit" value="Login User"></input>
            </form>
            <h2>Sign Up</h2>
            <form onSubmit={(evt) => {
                evt.preventDefault()
                signUp()
            }}>
                Email: <input type="text" value={credentials.email} name="email" onChange={handleChangeAuth}></input>
                Password: <input type="text" value={credentials.password} name="password" onChange={handleChangeAuth}></input>
                Name: <input type="text" value={credentials.name} name="name" onChange={handleChangeAuth}></input>
                <input type="submit" value="Sign Up a New User"></input>
            </form>
            <h2>Create Bookmark</h2>
            <form onSubmit={(evt) => {
                evt.preventDefault()
                createBookmark()
            }}>
                <input type="type" value={bookmark.title} name="title" onChange={handleChangeBook} placeholder="Add title here" ></input>
                <input type="type" value={bookmark.url} name="url" onChange={handleChangeBook} placeholder="Add url here"></input>
                <input type="submit" value="Create Bookmark" ></input>
            </form>
            <ul>
                { bookmarks.length ? bookmarks.map(book => (
                    <li key={book._id}>
                        <h3>{book.title}</h3>
                        <a href={book.url} target="_blank">{book.url}</a>
                    </li>
                ))
                    : <>No bookmarks added</>}
            </ul>
        </>
    )
}