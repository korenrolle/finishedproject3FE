import './People.css'
import { useState, useEffect } from 'react'

const People = (props) => {
    // define our state variable - []
    // react state
    const [people, setPeople] = useState([])
    // fetch endpoint
    const BASE_URL = "http://localhost:4000/people"

    const getPeople = async () => {
        try {
            const response = await fetch(BASE_URL)
            // fetch grabs the data from API - (mongo)
            const allPeople = await response.json()
            // assuming no errors - translate to JS 
            console.log(allPeople)
            setPeople(allPeople)
            // store that data (from api) in react state
        } catch (err) {
            console.log(err)
        }
    }

    const loaded = () => {
        return (
            <section className="people-list">
                {people?.map((person) => {
                    return (
                        <div key={person._id}>
                            {/* React optimization / difference */}
                            <h1>{person.name}</h1>
                            <img src={person.image} />
                            <h3>{person.title}</h3>
                        </div>
                    )
                })
                }
            </section>)
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
        getPeople()
    }, [])
    // useEffect takes two arguments -> runs function upon component mount
    // react mount -> 
    return (
        <div>
            {people && people.length ? loaded() : loading()}
    </div >
    )

}

export default People