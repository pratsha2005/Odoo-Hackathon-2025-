const server = import.meta.env.VITE_SERVER_URL;

export const loginRoute = `${server}/api/v1/auth/login`
export const registerRoute = `${server}/api/v1/auth/register`
export const logoutRoute = `${server}/api/v1/auth/logout`
export const getAllItems = `${server}/api/v1/item/getAllItems`
export const getItemById = `${server}/api/v1/item/getItemById`
export const addProductRoute = `${server}/api/v1/item/addItem`
// export const logoutRoute = `${server}/api/v1/auth/logout`
// export const logoutRoute = `${server}/api/v1/auth/logout`
// export const logoutRoute = `${server}/api/v1/auth/logout`
