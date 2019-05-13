"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const post_1 = require("./controllers/post");
const category_1 = require("./controllers/category");
const user_1 = require("./controllers/user");
app_1.default.get('/', (req, res) => {
    res.send({
        "liu": "Laureate International Universities"
    });
});
app_1.default.post('/category', category_1.post);
app_1.default.get('/category', category_1.getAll);
app_1.default.get('/category/:id', category_1.getOne);
app_1.default.put('/category/:id', category_1.put);
app_1.default.delete('/category/:id', category_1.remove);
app_1.default.post('/post', post_1.post);
app_1.default.get('/post', post_1.getAll);
app_1.default.get('/post/:id', post_1.getOne);
app_1.default.put('/post/:id', post_1.put);
app_1.default.delete('/post/:id', post_1.remove);
app_1.default.post('/user', user_1.post);
app_1.default.get('/user', user_1.getAll);
app_1.default.get('/user/:id', user_1.getOne);
app_1.default.put('/user/:id', user_1.put);
app_1.default.delete('/user/:id', user_1.remove);
app_1.default.post('/login', user_1.login);
//# sourceMappingURL=routes.js.map