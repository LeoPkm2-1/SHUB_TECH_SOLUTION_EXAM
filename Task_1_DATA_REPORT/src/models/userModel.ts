export interface User {
    id: number;
    name: string;
    email?: string;
}

let users: User[] = [{ id: 0, name: "a" }];

export const getAllUsers = (): User[] => {
    return users;
};

export const createUser = (user: User): User => {
    users.push(user);
    return user;
};
