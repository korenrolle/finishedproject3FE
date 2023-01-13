import {Routes, Route} from 'react-router-dom'
import Post from '../pages/Post/Post'
import Show from '../pages/Show'
import singlePostEdit from '../pages/singlePostEdit'

const Main = (props) => {
    return (
        <main>
            <Routes>
                <Route path="/" element={<Post/>}/>
                <Route path="/post/:id" element={<Show />}/>
                <Route path="/post/:id/edit" element={<singlePostEdit />}/>
            </Routes>
        </main>
    )
}

export default Main