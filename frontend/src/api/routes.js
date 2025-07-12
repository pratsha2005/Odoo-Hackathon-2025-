const server = import.meta.env.VITE_SERVER_URL;

export const loginRoute = `${server}/login`
export const registerRoute = `${server}/register`
export const logoutRoute = `${server}/logout`
