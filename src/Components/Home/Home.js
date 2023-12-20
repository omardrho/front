import React from 'react'
import Header from '../Header/Header'
import TaskList from '../TaskList/TaskList'
import { useRouter } from '../../contexts/RouterContext'
import Profile from '../Profile/Profile'
import TaskForm from '../TaskCreation/TaskCreation'
import { useTask } from '../../contexts/taskContext'
import Dash from '../Dash/Dash'

export default function Home() {
    const {homeRouter,
        setHomeRouter,
        HomeRoutes} = useRouter()
    const {task} = useTask()
  return (
    <div>
        <Header />
        {homeRouter === HomeRoutes.tasks && <TaskList />}
        {homeRouter === HomeRoutes.profile && <Profile />}
        {homeRouter === HomeRoutes.taskAdd && <TaskForm task={task}/>}
        {homeRouter === HomeRoutes.dash && <Dash/>} 
    </div>
  )
}
