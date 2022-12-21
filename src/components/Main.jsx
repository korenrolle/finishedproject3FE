import {Routes, Route} from 'react-router-dom'
import People from '../pages/People/People'
import Show from '../pages/Show'
import PersonEdit from '../pages/PersonEdit'

const Main = (props) => {
    return (
        <main>
            <Routes>
                <Route path="/" element={<People/>}/>
                <Route path="/people/:id" element={<Show />}/>
                <Route path="/people/:id/edit" element={<PersonEdit />}/>
            </Routes>
        </main>
    )
}

export default Main