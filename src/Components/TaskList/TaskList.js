import React, { useState } from 'react';
import "./TaskList.css"

import { DataGrid, getGridStringOperators } from '@mui/x-data-grid';
import { Box, Button, IconButton, Input, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useTask } from '../../contexts/taskContext';
import { useRouter } from '../../contexts/RouterContext';
export default function BasicExampleDataGrid() {
  const {tasks,getAll,add,delete_,update,complete,sortFilter,setTask} = useTask()
  const {homeRouter,setHomeRouter,HomeRoutes} = useRouter()
  React.useEffect(()=>{
    getAll()
  },[])
  const columns = [
    { field: 'title', headerName: 'title', width: 150,filterOperators: getGridStringOperators().filter((operator) => operator.value === 'contains') },
    { field: 'description', headerName: 'Description',flex: 1,minWidth: 150,filterOperators: getGridStringOperators().filter((operator) => operator.value === 'contains')},
    { field: 'limitDate', headerName: 'DeadLine',minWidth: 150,getCellValue: (params) => {console.log(params);return new Date()}},
    { field: 'completed', headerName: 'Completed', type: 'boolean',minWidth: 150},
    { field: 'tools', headerName: 'tools',minWidth: 200,renderCell: (params) => (
      <>
        <Button onClick={()=>complete(params.row._id)}>
          Complete
        </Button>
        <IconButton aria-label="delete" onClick={()=>delete_(params.row._id)}>
          <DeleteIcon color='error'/>
        </IconButton>
        <IconButton aria-label="edit" onClick={()=>{
          setTask(params.row);
          setHomeRouter(HomeRoutes.taskAdd)
        }}>
          <EditIcon color='primary'/>
        </IconButton>
      </>
    ),},
  ];
  const handleSortModelChange = React.useCallback(async (sortModel) => {
    if (sortModel[0] === undefined) return;
    console.log(sortModel[0].field+"sort"+sortModel[0].sort);
    await sortFilter(sortModel[0].field+"sort"+sortModel[0].sort)
  }, []);
  const onFilterChange = React.useCallback((filterModel) => {
    // Here you save the data you need from the filter model
    // setQueryOptions({ filterModel: { ...filterModel } });
    if(filterModel.items.length===0 || filterModel.items[0]?.value===undefined) {getAll();return;}
    if( filterModel.items[0]?.field === "completed") 
    {if(filterModel.items[0]?.value === "true") sortFilter("completed");
    else sortFilter("uncompleted");}
    console.log(filterModel);
  }, []);
  return (
    <>
    <h1 style={{textAlign:'center'}}>Tasks</h1>
    <div className="data-container">
      <Box sx={{backgroundColor: 'background.secondary'}}>
        <div className='datagrid'>
          <DataGrid   
          getRowId={(row)=>row._id}
          checkboxSelection 
          disableRowSelectionOnClick 
          rows={tasks} 
          columns={columns} 
          sortingMode="server"
          onSortModelChange={handleSortModelChange}
          filterMode="server"
          onFilterModelChange={onFilterChange}
          sx={{color: "secondary.main"}}
          />
        </div>
      </Box>

    </div>
    </>
  );
}