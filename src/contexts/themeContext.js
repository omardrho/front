import React,{useContext, useState} from 'react'
import { createTheme } from '@mui/material/styles';
import useLocalStorage from '../hooks/useLocalStorage';
import { red, green, blue } from '@mui/material/colors';
const LigthTheme = createTheme({
  palette: {
    primary: {
      main: '#333',
    },
    secondary: {
      main: "#000",
    },
    background: {
      default: '#fff',
    },

  },
});
const DarkTheme = createTheme({
  palette: {
    primary: {
      main: '#5090D3',
    },
    secondary: {
      main: "#fff",
    },
    background: {
      default: '#0a1929',
      secondary:'#001e3c'
    }
  },
})


const Themes={
    dark:"dark",
    light:"light",
}



const ThemeContext = React.createContext({});


export function useTheme(){
    return useContext(ThemeContext);
}



export default function MyThemeProvider({children}){
    // const [Theme, setTheme] = useLocalStorage('theme',LigthTheme);
    const [theme_, setTheme_] = useLocalStorage('theme',Themes.light);
    const [Theme, setTheme] = useState(theme_===Themes.dark?DarkTheme:LigthTheme);

    const dark=()=>{
        console.log("dark")
        setTheme(DarkTheme)
        setTheme_(Themes.dark)
    }
    const light=()=>{
        console.log("light")
        setTheme(LigthTheme)
        setTheme_(Themes.light)
    }

    const values={
        Theme,
        setTheme,
        theme_,
        setTheme_,
        dark,
        light,
        Themes
    }
    return (
        <ThemeContext.Provider value={values}>
            {children}
        </ThemeContext.Provider>
    )
}