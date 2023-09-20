import { Route,Routes} from "react-router-dom"
import { Gallery } from "./components/Gallery"
import { Login } from "./components/Login"
import { PrivateRoutesLayout } from "./layouts/PrivateRouteLayout"


function App() {


  return (
    
    <Routes>
    
    <Route element = {<PrivateRoutesLayout />}>
    <Route path="/gallery" element = {<Gallery />} />
    </Route>
   
    <Route path="/" element = {<Login />} />
  
    </Routes>
    
  )
}

export default App
