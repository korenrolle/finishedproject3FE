import { Link } from 'react-router-dom'

const Header = (props) => {
    return (
        <header style={{ height: "300px", overflow: 'hidden' }}>
            <nav className="nav">
                <Link to='/'>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" />
                </Link>
                <h1>PEOPLE APP</h1>
            </nav>
            <img style={{ width: "100%" }} src="https://i.ibb.co/3N8LMH6/pexels-pixabay-206359.jpg" />
        </header>
    )
}

export default Header