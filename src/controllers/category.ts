import {Request, Response} from "express";
import {getManager} from "typeorm";
import {Category} from "../entity/Category";

export async function post(request: Request, response: Response) {
    const categoryRepository = getManager().getRepository(Category);

    const newCategory = categoryRepository.create(request.body);

    await categoryRepository.save(newCategory);

    response.send(newCategory);
}

export async function getAll(request: Request, response: Response) {
    const categoryRepository = getManager().getRepository(Category);
    const categories = await categoryRepository.find( { relations: ["posts"] });

    response.send(categories);
}

export async function getOne(request: Request, response: Response) {
    const categoryRepository = getManager().getRepository(Category);
    const category = await categoryRepository.findOne(request.params.id, { relations: ["posts"] });

    // if category was not found return 404 to the client
    if (!category) {
        response.status(404);
        response.end();
        return;
    }

    response.send(category);
}

export async function put(request: Request, response: Response) {
    const categoryRepository = getManager().getRepository(Category);
    const category = await categoryRepository.findOne(request.params.id);

    // if category was not found return 404 to the client
    if (!category) {
        response.status(404);
        response.end();
        return;
    }

    category.name = request.body.name || category.name;

    await categoryRepository.save(category);

    response.send(category);
}

export async function remove(request: Request, response: Response) {
    const categoryRepository = getManager().getRepository(Category);
    const category = await categoryRepository.findOne(request.params.id);

    // if category was not found return 404 to the client
    if (!category) {
        response.status(404);
        response.end();
        return;
    }

    await categoryRepository.remove(category);

    response.send(category);
}