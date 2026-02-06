import api from "./client"

export const getAllUsers = (params) => 
    api.get("/users", {params}).then((r) => r.data)

export const getUserById = (id) =>
    api.get(`/users/${id}`).then((r) => r.data)

export const createUser = (payload) =>
    api.post("/register", payload).then((r) => r.data)

export const updateUser = (id, payload) =>
    api.put(`/users/${id}`, payload).then((r) => r.data)

export const deleteUser = (id) =>
    api.delete(`/users/${id}`).then((r) => r.data)

export const loginUser = (payload) =>
    api.post("/login", payload).then((r) => r.data);
