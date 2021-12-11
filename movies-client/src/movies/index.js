import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Bar from "./Components/Bar";
import Movies from "./Components/Movies";
import Footer from "./Components/Footer"

function App(){
    return <>
    <Bar/>
    <Router>
        <Switch>
          <Route exact path="/">
            <Movies/>
          </Route>
        </Switch>
    </Router>
    <Footer/>
    </>
}

export default App