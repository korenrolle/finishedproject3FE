import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'

const placeholderImage = "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"

const Post = (props) => {
    // define our state variable - []
    // react state
    const [singlePost, setSinglePost] = useState([])
    const [editForm, setEditForm] = useState({
        name: "",
        image: "",
        title: "",
    })

    const { id } = useParams()
    const BASE_URL = `http://localhost:4000/post/${id}`
    const navigate = useNavigate()

    const getSinglePost = async () => {
        try {
            const response = await fetch(BASE_URL)
            const foundSinglePost = await response.json()
            console.log(foundSinglePost)
            setSinglePost(foundSinglePost)
            setEditForm(foundSinglePost)
        } catch (err) {
            console.log(err)
        }
    }

    const handleChange = (e) => {
        // console.log(editForm)
        const userInput = { ...editForm }
        userInput[e.target.name] = e.target.value
        console.log(userInput)
        setEditForm(userInput)
    }

    const handleSubmit = async (e) => {
        // 0. prevent default (event object method)
        e.preventDefault()
        // 1. capturing our local state
        const currentState = { ...editForm }
        // check any fields for property data types / truthy value (function call - stretch)
        try {
            const requestOptions = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(currentState)
            }
            // 2. specify request method , headers, Content-Type
            // 3. make fetch to BE - sending data (requestOptions)

            // 3a fetch sends the data to API - (mongo)
            const response = await fetch(BASE_URL, requestOptions)
            // 4. check our response - 
            // 5. parse the data from the response into JS (from JSON) 
            const updatedSinglePost = await response.json()
            console.log(updatedSinglePost)
            // update local state with response (json from be)
            navigate(`/post/${id}`)
        } catch (err) {
            console.log(err)
        }
    }

    const loaded = () => {
        return (<>
            <section>
                <div className="singlePost-card">
                    {/* React optimization / difference */}
                    <h1>{singlePost.name}</h1>
                    <img src={singlePost.image || placeholderImage} alt="profile"/>
                    <h3>{singlePost.title || "Not title given"}</h3>
                </div>
                <Link to={`/post/${id}`}>Back to {singlePost.name}</Link>
            </section>

        </>
        )
    }

    const loading = () => (
        <section className="post-list">
            <h1>
                Loading...
                <span>
                    <img
                        className="spinner"
                        src="https://freesvg.org/img/1544764567.png"
                        alt="profile"
                    />
                </span>
            </h1>
        </section>
    );

    useEffect(() => {
        getSinglePost()
    }, )
    // useEffect takes two arguments -> runs function upon component mount
    // react mount -> 
    return (
        <div>
            <section>
                <h2>Create a new singlePost</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='name'>
                            Name
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="enter a singlePost's name"
                                value={editForm.name}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div>
                        <label htmlFor='image'>
                            Image
                            <input
                                type="text"
                                id="image"
                                name="image"
                                placeholder="enter a singlePost's image"
                                value={editForm.image}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div>
                        <label htmlFor='title'>
                            Title
                            <input
                                type="text"
                                id="title"
                                name="title"
                                placeholder="enter a singlePost's title"
                                value={editForm.title}
                                onChange={handleChange}
                            />
                        </label>
                        <br />
                        <input type="submit" value="Edit a singlePost" />
                    </div>
                </form>
            </section>
            {singlePost  ? loaded() : loading()}
        </div >
    )

}

export default Post