
export const isLoggedIn = ()=>{
    const token = localStorage.getItem('token');
    if (token){
        return true
    }
    return false
}


export const setToken = (token)=>{
    localStorage.setItem('token', token);
}


export const getToken = (token)=>{
    return token = localStorage.getItem('token');
}


export const logout = ()=>{
    localStorage.removeItem('token');
}