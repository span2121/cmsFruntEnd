import { createContext } from  'react' ;

const AppContext = createContext({
    API_PATH: "http://localhost:5001/api",
    //API_PATH:"https://backendcms.herokuapp.com/api"
})
export  default AppContext;