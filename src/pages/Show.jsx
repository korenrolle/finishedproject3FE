import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Comment from './Comment/Comment'

const placeholderImage = "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"

const Show = (props) => {
    // local state (Show)
    const [singlePost, setSinglePost] = useState(null)
    const [loading, setLoading] = useState(true)
    // access information about the current url path for browser

    const { id } = useParams()
    const navigate = useNavigate()
    // define some local variables
    const URL = `http://localhost:4000/post/${id}`

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getSinglePost = async () => {
        try {
            const response = await fetch(URL)
            const result = await response.json()
            console.log(result)
            setSinglePost(result)
            setLoading(false)
        } catch (err) {
            console.log(err)
        }
    }
    // make a fetch 

    const removeSinglePost = async (e) => {
        try {

            // configure our delete request
            const options = {
                method: "DELETE"
            }
            const response = await fetch(URL, options)
            const deletedSinglePost = await response.json()

            // make a fetch (delete)
            console.log(deletedSinglePost)
            // await response / parse response 
            // navigate() -> change the current page the browser is at / client side redirect
            navigate("/")
        } catch (err) {
            console.log(err)
            // stretch - populate an error on your page - when a delete fails
            // populate some state (3 seconds)
            // redirect to a 404 page (client)
        }
    }

    const isLoading = () => (<h2>....Loading</h2>)
    const loaded = () => (
        <>
            <div className="singlePostEdit-card">
                {/* React optimization / difference */}
                <h1>{singlePost.name}</h1>
                <div>
                    <p>Delete Post</p>
                    <button className='button' onClick={removeSinglePost}> X </button>
                </div>
                <img src={singlePost.image || placeholderImage} alt="avatar" />
                <h3>{singlePost.title || "No title given"}</h3>
            </div>
            <Comment/>
            <Link to="/"><h1>Back to Home</h1></Link>
        </>
    )
    useEffect(() => { getSinglePost() }, [getSinglePost, id, loading])
    // confirm + render JSX +++
    // console.log(`current singlePost: ${singlePost?._id || "no singlePost"}`)
    return (
        <section className="ShowContainer">

            {loading ? isLoading() : loaded()}

        </section>)
}

export default Show