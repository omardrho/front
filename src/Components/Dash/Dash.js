import React, { useState } from 'react'
import { Chart } from "react-google-charts";
import { useUser } from '../../contexts/userContext';


export const options = {
    title: "My Daily Tasks",
  };
export default function Dash() {
  const [data, setData] = useState([])
  const {token} = useUser()
      React.useEffect(()=>{
        fetch("http://127.0.0.1:3030/todos/graphstats",{
          method:"GET",
          headers:{
              "Authorization":`Bearer ${token}`
          },
      })
      .then(res=>res.json())
      .then(json=>{
      setData([["Task", "nbr"],["Completed",json.completed],["Uncompleted",json.uncompleted]])
    })
  },[])
  return (
    <div>
        <Chart
        chartType="PieChart"
        data={data}
        options={options}
        width={"100%"}
        height={"400px"}
        />
    </div>
  )
}
