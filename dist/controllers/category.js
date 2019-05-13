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
const Category_1 = require("../entity/Category");
function post(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const categoryRepository = typeorm_1.getManager().getRepository(Category_1.Category);
        const newCategory = categoryRepository.create(request.body);
        yield categoryRepository.save(newCategory);
        response.send(newCategory);
    });
}
exports.post = post;
function getAll(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const categoryRepository = typeorm_1.getManager().getRepository(Category_1.Category);
        const categories = yield categoryRepository.find({ relations: ["posts"] });
        response.send(categories);
    });
}
exports.getAll = getAll;
function getOne(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const categoryRepository = typeorm_1.getManager().getRepository(Category_1.Category);
        const category = yield categoryRepository.findOne(request.params.id, { relations: ["posts"] });
        // if category was not found return 404 to the client
        if (!category) {
            response.status(404);
            response.end();
            return;
        }
        response.send(category);
    });
}
exports.getOne = getOne;
function put(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const categoryRepository = typeorm_1.getManager().getRepository(Category_1.Category);
        const category = yield categoryRepository.findOne(request.params.id);
        // if category was not found return 404 to the client
        if (!category) {
            response.status(404);
            response.end();
            return;
        }
        category.name = request.body.name || category.name;
        yield categoryRepository.save(category);
        response.send(category);
    });
}
exports.put = put;
function remove(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const categoryRepository = typeorm_1.getManager().getRepository(Category_1.Category);
        const category = yield categoryRepository.findOne(request.params.id);
        // if category was not found return 404 to the client
        if (!category) {
            response.status(404);
            response.end();
            return;
        }
        yield categoryRepository.remove(category);
        response.send(category);
    });
}
exports.remove = remove;
//# sourceMappingURL=category.js.map