import './App.css';
import LoginPage from './Components/Login/Login';
import SignUpPage from './Components/SignUp/SignUp';
import { useRouter } from './contexts/RouterContext';
import Home from './Components/Home/Home';
import { ThemeProvider } from '@mui/material/styles';
import { useTheme } from './contexts/themeContext';
import { Box } from '@mui/material';
function App() {
  const {currentRouter, Routers} = useRouter();
  const {Theme} = useTheme()

  return (
    <ThemeProvider theme={Theme}>
      <Box sx={{backgroundColor: 'background.default',minHeight:'100vh'}} >
        {currentRouter === Routers.login && <LoginPage />}
        {currentRouter === Routers.register && <SignUpPage />}
        {currentRouter === Routers.home && <Home />}
      </Box>
    </ThemeProvider>

  );
}
export default App;
