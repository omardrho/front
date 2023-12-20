import React,{useContext, useState} from 'react'
import useLocalStorage from '../hooks/useLocalStorage';
import { useRouter } from './RouterContext';
import { useUser } from './userContext';







const TaskContext = React.createContext({});


export function useTask(){
    return useContext(TaskContext);
}



export default function TaskProvider({children}){
    const {homeRouter,
        setHomeRouter,
        HomeRoutes} = useRouter();
    const {token} = useUser()
    const [tasks, setTasks] = useLocalStorage("tasks",[])
    const [task,setTask] = useLocalStorage("task",{})

    const getAll=async ()=>{
        fetch("http://127.0.0.1:3030/todos/",{
            method:"GET",
            headers:{
                "Authorization":`Bearer ${token}`
            },
        })
        .then(res=>res.json())
        .then(data=>{
            setTasks(data)
        })
        .catch(err=>console.log(err))
    }
    const add=async (task)=>{
        await req("/","POST",JSON.stringify(task))
        setHomeRouter(HomeRoutes.tasks)
    }
    const delete_=async (id)=>{
        console.log("delete",id)
        await req('/'+id,"DELETE")
    }
    const update=async (task)=>{
        await req("/"+task._id, "PUT", JSON.stringify(task))
        setTask({})
        setHomeRouter(HomeRoutes.tasks)
    }
    const sortFilter=async (key)=>{
        console.log("http://127.0.0.1:3030/todos/"+key)
        fetch("http://127.0.0.1:3030/todos/"+key,{
            method:"GET",
            headers:{
                "Authorization":`Bearer ${token}`
            },
        })
        .then(res=>res.json())
        .then(data=>{
            setTasks(data)
        })
        .catch(err=>console.log(err))
    }

    const complete=async (id)=>{
        await req('/complete/'+id, "PUT")
    }
    const req=async (endpoint,method,body)=>{
        console.log("http://127.0.0.1:3030/todos"+endpoint)
        fetch("http://127.0.0.1:3030/todos"+endpoint,{
            method:method,
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            },
            body:body
        })
        .then(res=>res.json())
        .then(data=>{
            getAll()
        })
        .catch(err=>console.log(err))
    }
    // todos
    const values={
        tasks,
        getAll,
        add,
        delete_,
        update,
        complete,
        sortFilter,
        task,
        setTask
    }

    return (
        <TaskContext.Provider value={values}>
            {children}
        </TaskContext.Provider>
    )
}