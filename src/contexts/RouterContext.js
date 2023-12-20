import React,{useContext, useState} from 'react'
import useLocalStorage from '../hooks/useLocalStorage';



const Routers={
    login:"login",
    register:"register",
    home:'home',
    profile:'profile',
}
const HomeRoutes={
    tasks:"tasks",
    taskAdd:"taskAdd",
    profile:'Profile',
    dash:"DashBoard"
}


const RouterContext = React.createContext({});


export function useRouter(){
    return useContext(RouterContext);
}

export default function RouterProvider({children}){
    const [currentRouter, setCurrentRouter] = useLocalStorage('currentRouter',Routers.register);
    const [homeRouter, setHomeRouter] = useLocalStorage("homeRouter",HomeRoutes.tasks);
    const values={
        currentRouter,
        setCurrentRouter,
        Routers,
        homeRouter,
        setHomeRouter,
        HomeRoutes
    }


    return (
        <RouterContext.Provider value={values}>
            {children}
        </RouterContext.Provider>
    )
}