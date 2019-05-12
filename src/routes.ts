import app from './app'
import { post as createPost, put as updatePost, remove as deletePost, getOne as getPost, getAll as getPosts } from "./controllers/post";
import { post as createCategory, put as updateCategory, remove as deleteCategory, getOne as getCategory, getAll as getCategories } from "./controllers/category";
import { post as createUser, remove as removeUser, getOne as getSelectedUser, getAll as getUsers, put as updateUser,login as login} from "./controllers/user";

app.get('/', (req, res) => {
    res.send({
        "liu": "Laureate International Universities"
    })
});

app.post('/category', createCategory);
app.get('/category', getCategories);
app.get('/category/:id', getCategory);
app.put('/category/:id', updateCategory);
app.delete('/category/:id', deleteCategory);

app.post('/post', createPost);
app.get('/post', getPosts);
app.get('/post/:id', getPost);
app.put('/post/:id', updatePost);
app.delete('/post/:id', deletePost);

app.post('/user', createUser);
app.get('/user', getUsers);
app.get('/user/:id', getSelectedUser);
app.put('/user/:id', updateUser);
app.delete('/user/:id', removeUser);

app.post('/login', login);

