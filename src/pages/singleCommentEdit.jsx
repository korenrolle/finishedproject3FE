import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'

// const placeholderImage = "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"

const SingleCommentEdit = (props) => {
    // define our state variable - []
    // react state
    const [singleComment, setSingleComment] = useState([])
    const [editForm, setEditForm] = useState({
        name: "",
        comment: ""
    })

    const { id } = useParams()
    const BASE_URL = `http://localhost:4000/Comment/${id}`
    const navigate = useNavigate()

    const getSingleComment = async () => {
        try {
            const response = await fetch(BASE_URL)
            const foundSingleComment = await response.json()
            console.log(foundSingleComment)
            setSingleComment(foundSingleComment)
            setEditForm(foundSingleComment)
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
            const updatedSingleComment = await response.json()
            console.log(updatedSingleComment)
            // update local state with response (json from be)
            navigate(`/comment/${id}`)
        } catch (err) {
            console.log(err)
        }
    }

    const loaded = () => {
        return (<>
            <section>
                <div className="singleComment-card">
                    {/* React optimization / difference */}
                    <h1>{singleComment.name}</h1>
                    <h3>{singleComment.comment}</h3>
                </div>
                <Link to={`/comment/${id}`}>Back to {singleComment.name}</Link>
            </section>

        </>
        )
    }

    const loading = () => (
        <section className="comment-list">
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
        getSingleComment()
    }, )
    // useEffect takes two arguments -> runs function upon component mount
    // react mount -> 
    return (
        <div>
            <section>
                <h2>Create a new singleComment</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='name'>
                            Name
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="enter a singleComment's name"
                                value={editForm.name}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div>
                        <label htmlFor='image'>
                            Comment
                            <input
                                type="text"
                                id="image"
                                name="image"
                                placeholder="enter a single comment"
                                value={editForm.comment}
                                onChange={handleChange}
                            />
                        </label>
                        <br />
                        <input type="submit" value="Edit a single comment" />
                    </div>
                </form>
            </section>
            {singleComment  ? loaded() : loading()}
        </div >
    )

}

export default SingleCommentEdit