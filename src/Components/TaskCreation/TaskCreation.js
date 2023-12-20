import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import "./TaskCreation.css"
import { Button, FormControl, Input, InputLabel } from '@mui/material';
import { useUser } from '../../contexts/userContext';
import { useTask } from '../../contexts/taskContext';
const TaskSchema = Yup.object().shape({
  title: Yup.string().required('Le titre est requis'),
  description: Yup.string().notRequired(),
  limitDate: Yup.date().required('La date d\'échéance est requise'),
});

const TaskForm = ({ task,onSubmit }) => {
  const {user} = useUser()
  const {add,update} = useTask()
  const handleSubmit = (values, { resetForm }) => {
    if(onSubmit){
      onSubmit(values);
    }
    console.log(values);
    if (task?._id){
      update(values);
    }else{
      add(values);
    }
    resetForm();
  };

  return (
    <Formik
      initialValues={task?._id?
        task
      :{ title: '', description: '', limitDate: '2024-01-01',completed:false,userId:user._id }}
      validationSchema={TaskSchema}
      onSubmit={handleSubmit}
    >
      {({handleChange,values}) => (
        <Form className='form' >
            <div>
              <FormControl sx={{ m: 1, width: '-webkit-fill-available' }} variant="standard" >
                <InputLabel htmlFor="standard-adornment-password" sx={{color:'primary.main'}} >Title</InputLabel>
                <Input
                type='text'
                name='title'
                value={values.title}
                onChange={handleChange}
                sx={{color:'primary.main'}}
              />
                </FormControl>
              <ErrorMessage name="title" component="div" className="error" />
            </div>
            <div>
              <FormControl sx={{ m: 1, width: '-webkit-fill-available' }} variant="standard">
                <InputLabel htmlFor="standard-adornment-password" sx={{color:'primary.main'}}>Description</InputLabel>
                <Input
                type='text' sx={{color:'primary.main'}}
                name='description'
                value={values.description}
                onChange={handleChange}
              />
                </FormControl>
              <ErrorMessage name="description" component="div" className="error" />
            </div>
            <div>
              <FormControl sx={{ m: 1, width: '-webkit-fill-available' }} variant="standard">
                <InputLabel htmlFor="standard-adornment-password" sx={{color:'primary.main'}}>Deadline</InputLabel>
                <Input
                type='date' sx={{color:'primary.main'}}
                name='limitDate'
                value={values.limitDate}
                onChange={handleChange}
              />
                </FormControl>
            <ErrorMessage name="limitDate" component="div" className="error" />
            </div>
          <Button type="submit">
            {task?._id?"Modifier une tâche":"Créer une tâche"}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default TaskForm;
