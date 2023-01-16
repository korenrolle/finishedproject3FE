import './Comment.css'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Comment = (props) => {
    // define our state variable - []
    // react state
    const [comment, setComment] = useState([])
    const [newForm, setNewForm] = useState({
        name: "",
        comment: "",
    })
    // fetch endpoint
    const BASE_URL = "http://localhost:4000/comment"

    // create some local state for tracking post input (user) ++
    // link this state to a controlled form (post) ++
    // handlers (change ++ / submit )
    // submit event will make a post request from our current comp.

    const getPost = async () => {
        try {
            const response = await fetch(BASE_URL)
            // fetch grabs the data from API - (mongo)
            const allComment = await response.json()
            // assuming no errors - translate to JS 
            // console.log(allPost)
            setComment(allComment)
            // store that data (from api) in react state
        } catch (err) {
            console.log(err)
        }
    }

    const handleChange = (e) => {
        // console.log(newForm)
        const userInput = { ...newForm }
        userInput[e.target.name] = e.target.value
        setNewForm(userInput)
    }

    const handleSubmit = async (e) => {
        // 0. prevent default (event object method)
        e.preventDefault()
        // 1. capturing our local state
        const currentState = { ...newForm }
        // check any fields for property data types / truthy value (function call - stretch)
        try {
            const requestOptions = {
                method: "POST",
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
            const createdSingleComment = await response.json()
            console.log(createdSingleComment)
            // update local state with response (json from be)
            setComment([...comment, createdSingleComment])
            // reset newForm state so that our form empties out
            setNewForm({
                name: "",
                comment: "",
            })

        } catch (err) {
            console.log(err)
        }
    }

    const loaded = () => {
        return (<>
        <h1>Comments</h1>
            <section className="post-list">
                {comment?.map((singleComment) => {
                    return (
                        <Link key={singleComment._id} to={`/comment/${singleComment._id}`}>
                            <div className="singlePost-card">
                                {/* React optimization / difference */}
                                <h1>{singleComment.name}</h1>
                                <h2>{singleComment.comment}</h2>
                            </div>
                        </Link>
                    )
                })
                }
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
                    />
                </span>
            </h1>
        </section>
    );

    useEffect(() => {
        getPost()
    }, [])
    // useEffect takes two arguments -> runs function upon component mount
    // react mount -> 
    return (
        <div>
            <section className='postForm'>
                <h2>Create a new Comment</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='name'>
                            Name
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="enter a name"
                                value={newForm.name}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div>
                        <label htmlFor='comment'>
                            Comment
                            <input
                                type="text"
                                id="comment"
                                name="comment"
                                placeholder="enter a comment"
                                value={newForm.comment}
                                onChange={handleChange}
                            />
                        </label>
                        <br />
                        <input className='button' type="submit" value="Create a new comment" />
                    </div>
                </form>
            </section>
            {comment && comment.length ? loaded() : loading()}
        </div >
    )

}
export default Comment;