import { Request, Response } from "express";
import { getManager } from "typeorm";
import { User } from "../entity/User";

export async function login(request: Request, response: Response) {
    const userRepository = getManager().getRepository(User);
    console.log('username', request.body.username)
    const user = await userRepository.find({ where: { username: request.body.username, password: request.body.password } });

    if(user.length > 0){
        response.send(user)
    }else{
        response.sendStatus(401)
    }
}

export async function post(request: Request, response: Response) {
    const userRepository = getManager().getRepository(User);
    const newUser = userRepository.create(request.body);
    const user = await userRepository.find({ where: { username: request.body.username } })
    if(user.length == 0){
        await userRepository.save(newUser);
        response.send(newUser);
    }else{
        response.sendStatus(400)
    }
    
}

export async function remove(request: Request, response: Response) {
    const userRepository = getManager().getRepository(User);
    const user = await userRepository.findOne(request.params.id);
    if (!user) {
        response.status(404);
        response.end();
        return;
    }

    await userRepository.remove(user);
    response.send(user);
}

export async function getOne(request: Request, response: Response) {
    const userRepository = getManager().getRepository(User);
    const user = await userRepository.findOne(request.params.id);
    if (!user) {
        response.status(404);
        response.end();
        return;
    }
    response.send(user);
}


export async function getAll(request: Request, response: Response) {
    const userRepository = getManager().getRepository(User);
    const users = await userRepository.find();

    response.send(users);
}

export async function put(request: Request, response: Response) {
    const userRepository = getManager().getRepository(User);
    const user = await userRepository.findOne(request.params.id);
    if (!user) {
        response.status(404);
        response.end();
        return;
    }
    user.username = request.body.username || user.username;
    user.role = request.body.role || user.role;
    user.password = request.body.password || user.password;

    await userRepository.save(user);

    response.send(user);
}