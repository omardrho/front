import React,{useContext, useState} from 'react'
import { useRouter } from './RouterContext';
import useLocalStorage from '../hooks/useLocalStorage';







const UserContext = React.createContext({});


export function useUser(){
    return useContext(UserContext);
}



export default function UserProvider({children}){
    const {currentRouter, setCurrentRouter, Routers} = useRouter();
    const [user, setUser] = useLocalStorage('user',{})
    const [token, setToken] = useLocalStorage('token',"")

    React.useEffect(()=>{
        if(token){
            setCurrentRouter(Routers.home)
        }
    },[])
    const login=(values)=>{
        fetch("http://127.0.0.1:3030/users/login",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(values)
        })
        .then(function(response) {
            if (response.status === 200) {
              return response.json();
            } else if (response.status === 404) {
              throw new Error('Resource not found');
            } else if (response.status === 401) {
              throw new Error('Unauthorized');
            } else {
              throw new Error('User Not found');
            }
          })
        .then(data=>{
            if (data.token){
                setToken(data.token)
                setUser(data.user)
            }
            setCurrentRouter(Routers.home)
        })
        .catch(err=>{
            alert(err.message)
            console.log(err)
        })
        .finally(()=>{
            console.log("finally")
        })
    }
    const logout=()=>{
        setToken("")
        setUser({})
        setCurrentRouter(Routers.login)
    }
    const register=(values)=>{
        fetch("http://127.0.0.1:3030/users/register",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(values)
        })
        .then(res=>res.json())
        .then(data=>{
            setCurrentRouter(Routers.login)
        })
        .catch(err=>console.log(err))
    }
    const updateUser=(values)=>{
        fetch(`http://127.0.0.1:3030/users/${user._id}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(values)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            setUser(data)
        })
        .catch(err=>console.log(err))
    }

    const values={
        login,
        logout,
        register,
        user,
        updateUser,
        token
    }
    return (
        <UserContext.Provider value={values}>
            {children}
        </UserContext.Provider>
    )
}