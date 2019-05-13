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
const User_1 = require("../entity/User");
function login(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const userRepository = typeorm_1.getManager().getRepository(User_1.User);
        console.log('username', request.body.username);
        const user = yield userRepository.find({ where: { username: request.body.username, password: request.body.password } });
        if (user.length > 0) {
            response.send(user);
        }
        else {
            response.sendStatus(401);
        }
    });
}
exports.login = login;
function post(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const userRepository = typeorm_1.getManager().getRepository(User_1.User);
        const newUser = userRepository.create(request.body);
        const user = yield userRepository.find({ where: { username: request.body.username } });
        if (user.length == 0) {
            yield userRepository.save(newUser);
            response.send(newUser);
        }
        else {
            response.sendStatus(400);
        }
    });
}
exports.post = post;
function remove(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const userRepository = typeorm_1.getManager().getRepository(User_1.User);
        const user = yield userRepository.findOne(request.params.id);
        if (!user) {
            response.status(404);
            response.end();
            return;
        }
        yield userRepository.remove(user);
        response.send(user);
    });
}
exports.remove = remove;
function getOne(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const userRepository = typeorm_1.getManager().getRepository(User_1.User);
        const user = yield userRepository.findOne(request.params.id);
        if (!user) {
            response.status(404);
            response.end();
            return;
        }
        response.send(user);
    });
}
exports.getOne = getOne;
function getAll(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const userRepository = typeorm_1.getManager().getRepository(User_1.User);
        const users = yield userRepository.find();
        response.send(users);
    });
}
exports.getAll = getAll;
function put(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const userRepository = typeorm_1.getManager().getRepository(User_1.User);
        const user = yield userRepository.findOne(request.params.id);
        if (!user) {
            response.status(404);
            response.end();
            return;
        }
        user.username = request.body.username || user.username;
        user.role = request.body.role || user.role;
        user.password = request.body.password || user.password;
        yield userRepository.save(user);
        response.send(user);
    });
}
exports.put = put;
//# sourceMappingURL=user.js.map