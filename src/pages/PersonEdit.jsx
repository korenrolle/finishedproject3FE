import { useState, useEffect } from 'react'
import { Link, useParams, navigate, useNavigate } from 'react-router-dom'

const placeholderImage = "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"

const People = (props) => {
    // define our state variable - []
    // react state
    const [person, setPerson] = useState([])
    const [editForm, setEditForm] = useState({
        name: "",
        image: "",
        title: "",
    })

    const { id } = useParams()
    const BASE_URL = `http://localhost:4000/people/${id}`
    const navigate = useNavigate()

    const getPerson = async () => {
        try {
            const response = await fetch(BASE_URL)
            const foundPerson = await response.json()
            setPerson(foundPerson)
            setEditForm(foundPerson)
        } catch (err) {
            console.log(err)
        }
    }

    const handleChange = (e) => {
        // console.log(editForm)
        const userInput = { ...editForm }
        userInput[e.target.name] = e.target.value
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
            const updatedPerson = await response.json()
            console.log(updatedPerson)
            // update local state with response (json from be)
            navigate(`/people/${id}`)
        } catch (err) {
            console.log(err)
        }
    }

    const loaded = () => {
        return (<>
            <section>
                <div className="person-card">
                    {/* React optimization / difference */}
                    <h1>{person.name}</h1>
                    <img src={person.image || placeholderImage} />
                    <h3>{person.title || "Not title given"}</h3>
                </div>
                <Link to={`/people/${id}`}>Back to {person.name}</Link>
            </section>

        </>
        )
    }

    const loading = () => (
        <section className="people-list">
            <h1>
                Loading...
                <span>
                    {" "}
                    <img
                        className="spinner"
                        src="https://freesvg.org/img/1544764567.png"
                    />
                </span>
            </h1>
        </section>
    );

    useEffect(() => {
        getPerson()
    }, [])
    // useEffect takes two arguments -> runs function upon component mount
    // react mount -> 
    return (
        <div>
            <section>
                <h2>Create a new person</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='name'>
                            Name
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="enter a person's name"
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
                                placeholder="enter a person's image"
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
                                placeholder="enter a person's title"
                                value={editForm.title}
                                onChange={handleChange}
                            />
                        </label>
                        <br />
                        <input type="submit" value="Edit a person" />
                    </div>
                </form>
            </section>
            {person  ? loaded() : loading()}
        </div >
    )

}

export default People