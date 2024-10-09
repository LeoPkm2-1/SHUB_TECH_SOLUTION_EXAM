import type { User } from "../models/userModel";

export const renderUsers = (users: User[]) => {
    return users
        .map(
            (user) => `ID: ${user.id}, Name: ${user.name}, Email: ${user.email}`
        )
        .join("\n");
};

export const renderUser = (user: User) => {
    return `ID: ${user.id}, Name: ${user.name}, Email: ${user.email}`;
};
