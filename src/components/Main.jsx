import {Routes, Route} from 'react-router-dom'
import Post from '../pages/Post/Post'
import Show from '../pages/Show'
import SinglePostEdit from '../SingleEdit/singlePostEdit'
import SingleCommentEdit from '../pages/singleCommentEdit'
import Comment from '../pages/Comment/Comment'
import CommentShow from '../pages/CommentShow'

const Main = (props) => {
    return (
        <main>
            <Routes>
                <Route path="/" element={<Post/>}/>
                <Route path="/post/:id" element={<Show />}/>
                <Route path="/post/:id/edit" element={<SinglePostEdit />}/>
                <Route path="/comment" element={<Comment/>}/>
                <Route path="/comment/:id" element={<CommentShow />}/>
                <Route path="/comment/:id/edit" element={<SingleCommentEdit />}/>
            </Routes>
        </main>
    )
}

export default Main