"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Post_1 = require("../entity/Post");
const Category_1 = require("../entity/Category");
function post(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const postRepository = typeorm_1.getManager().getRepository(Post_1.Post);
        const categoryRepository = typeorm_1.getManager().getRepository(Category_1.Category);
        const categories = yield categoryRepository.findByIds(request.body.categories);
        request.body.categories = categories;
        const newPost = postRepository.create(request.body);
        yield postRepository.save(newPost);
        response.send(newPost);
    });
}
exports.post = post;
function getAll(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const postRepository = typeorm_1.getManager().getRepository(Post_1.Post);
        const posts = yield postRepository.find({ relations: ["categories"] });
        response.send(posts);
    });
}
exports.getAll = getAll;
function getOne(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const postRepository = typeorm_1.getManager().getRepository(Post_1.Post);
        const post = yield postRepository.findOne(request.params.id, { relations: ["categories"] });
        // if post was not found return 404 to the client
        if (!post) {
            response.status(404);
            response.end();
            return;
        }
        response.send(post);
    });
}
exports.getOne = getOne;
function put(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const postRepository = typeorm_1.getManager().getRepository(Post_1.Post);
        const categoryRepository = typeorm_1.getManager().getRepository(Category_1.Category);
        const post = yield postRepository.findOne(request.params.id);
        const categories = yield categoryRepository.findByIds(request.body.categories);
        request.body.categories = categories;
        // if post was not found return 404 to the client
        if (!post) {
            response.status(404);
            response.end();
            return;
        }
        post.title = request.body.title || post.title;
        post.text = request.body.text || post.text;
        post.categories = request.body.categories || post.categories;
        yield postRepository.save(post);
        response.send(post);
    });
}
exports.put = put;
function remove(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const postRepository = typeorm_1.getManager().getRepository(Post_1.Post);
        const post = yield postRepository.findOne(request.params.id);
        // if post was not found return 404 to the client
        if (!post) {
            response.status(404);
            response.end();
            return;
        }
        yield postRepository.remove(post);
        response.send(post);
    });
}
exports.remove = remove;
//# sourceMappingURL=post.js.map