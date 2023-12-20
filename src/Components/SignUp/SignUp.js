import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./SignUp.css";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Mail } from "@mui/icons-material";
import { useUser } from "../../contexts/userContext";
import { useRouter } from "../../contexts/RouterContext";
const LoginSchema = Yup.object().shape({
  email: Yup.string().email("invalid mail").required("mail is required"),
  password: Yup.string().required("password is required"),
});

const SignUpPage = () => {
  const { register } = useUser();
  const { setCurrentRouter, Routers } = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (values, { setSubmitting }) => {
    // Effectuez ici votre logique de connexion
    console.log(values);
    register(values);
    setSubmitting(false);
  };

  return (
    <div className="Login center">
      <Typography sx={{ color: "primary.main" }} variant="h3">
        Register
      </Typography>

      <Typography sx={{ color: "primary.main" }} variant="p">
        have you an account{" "}
        <Button
          color="secondary"
          className="signup"
          onClick={() => setCurrentRouter(Routers.login)}
        >
          Login
        </Button>
      </Typography>
      <Box sx={{ backgroundColor: "background.secondary" }}>
        <div className="Login-container">
          <Formik
            initialValues={{ email: "", name: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, values, handleChange }) => (
              <Form className="form-login">
                <div>
                  <FormControl
                    sx={{ m: 1, width: "-webkit-fill-available" }}
                    variant="standard"
                  >
                    <InputLabel htmlFor="standard-adornment-email">
                      Mail
                    </InputLabel>
                    <Input
                      id="standard-adornment-email"
                      type="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      endAdornment={
                        <InputAdornment position="end" sx={{ paddingRight: 1 }}>
                          <Mail />
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error"
                  />
                </div>
                <div>
                  <FormControl
                    sx={{ m: 1, width: "-webkit-fill-available" }}
                    variant="standard"
                  >
                    <InputLabel htmlFor="standard-adornment-name">
                      Name
                    </InputLabel>
                    <Input
                      id="standard-adornment-name"
                      type="text"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error"
                  />
                </div>
                <div>
                  <FormControl
                    sx={{ m: 1, width: "-webkit-fill-available" }}
                    variant="standard"
                  >
                    <InputLabel htmlFor="standard-adornment-password">
                      Password
                    </InputLabel>
                    <Input
                      id="standard-adornment-password"
                      type={showPassword ? "text" : "password"}
                      name="password"
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
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="error"
                  />
                </div>
                <div className="center" style={{ marginTop: "20px" }}>
                  <Button
                    variant="contained"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Register
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Box>
    </div>
  );
};

export default SignUpPage;
