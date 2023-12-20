import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import "./Profile.css";
import { Button, FormControl, IconButton, Input, InputAdornment, InputLabel, TextField } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Label, Mail } from '@mui/icons-material';
import { useUser } from '../../contexts/userContext';
import { useRouter } from '../../contexts/RouterContext';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
const LoginSchema = Yup.object().shape({
  email: Yup.string().email("invalid mail").required('mail is required'),
  password: Yup.string().required('password is required'),
});

const Profile = () => {
    const [edit, setEdit] = useState(false)
    const {user,updateUser} = useUser()
    const {setCurrentRouter, Routers} = useRouter();

  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    // Effectuez ici votre logique de connexion
    console.log(values);
    updateUser(values);
    setSubmitting(false);
    resetForm();
    setEdit(!edit)
  };

  return (
    <div className="center">
      <h1>Profile</h1>
    <div className='profile-container'>
        <div style={{display: 'flex',  alignItems: 'flex-end',flexDirection: 'column'}}>
            {edit?
                <IconButton aria-label="edit" onClick={() => setEdit(!edit)}>
                    <CloseIcon />
                </IconButton>:
                <IconButton aria-label="edit" onClick={() => setEdit(!edit)}>
                  <EditIcon />
                </IconButton>}
        </div>
      <Formik
        initialValues={{ email: user.email, name: user.name, password: "" }}
        enableReinitialize
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting,values,handleChange }) => (
          <Form className='form-login'>
            <div>
                <h3>Mail</h3>
              <FormControl sx={{ m: 1, width: '-webkit-fill-available' }} variant="standard">
                
                <Input
                id="standard-adornment-email"
                type='email'
                name='email'
                value={values.email}
                onChange={handleChange}
                disabled={true}
                endAdornment={
                  <InputAdornment position="end" sx={{paddingRight: 1}}>
                      <Mail/>
                  </InputAdornment>
                }
              />
                </FormControl>
              <ErrorMessage name="email" component="div" className="error" />
            </div>
            <div>
              <h3>Name</h3>
              <FormControl sx={{ m: 1, width: '-webkit-fill-available' }} variant="standard">
                <Input
                id="standard-adornment-name"
                type='text'
                name='name'
                value={values.name}
                disabled={!edit}

                onChange={handleChange}
              />
                </FormControl>
              <ErrorMessage name="email" component="div" className="error" />
            </div>
            {edit&&<div>
            <h3>New Password</h3>
            <FormControl sx={{ m: 1, width: '-webkit-fill-available' }} variant="standard">
              <Input
                id="standard-adornment-password"
                type={showPassword ? 'text' : 'password'}
                name='password'
                value={values.password}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
              <ErrorMessage name="password" component="div" className="error" />
            </div>}
            {edit&&<div className='center' style={{marginTop: '20px'}}>
              <Button  variant="contained"  type="submit"  disabled={isSubmitting}>Update State</Button>
            </div>}
          </Form>
        )}
      </Formik>
    </div>
    </div>
  );
};

export default Profile;
