import { Request, Response } from "express";
import { type User, getAllUsers, createUser } from "../models/userModel";
import { renderUser, renderUsers } from "../views/userView";
export const getUsers = (req: Request, res: Response) => {
    const users = getAllUsers();
    res.send(renderUsers(users));
};

export const addUser = (req: Request, res: Response) => {
    const newUser: User = req.body;
    const createdUser = createUser(newUser);
    res.send(renderUser(createdUser));
};
