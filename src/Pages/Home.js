
import { useSelector } from "react-redux";
import Navbar from "../Components/Navbar";
import Copyright from "../Components/Copyright"
import Popups from "../Components/Popups";
import "../CSS/Main.css"
import { Alert } from "react-bootstrap";
import background from '../images/background.jpeg';


function Home(){

    const{display,message,variant} = useSelector(state => state.Alerts)
    const mainStyle = {
        backgroundImage: `url(${background})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition:"center",
        textAlign: "center",
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%"
      };
    return(
        <div id = "page">
            <div style={ mainStyle}>
                <Navbar></Navbar>
                <div className = "content">
                    <h1 className="text-light">Yuchen Jiang’s Fabulous Movie Searching Website</h1>
                </div>
            <Copyright></Copyright>
               
            </div>
            <Alert show={display} variant={variant} id="alert">
            <Alert.Heading>How's it going?!</Alert.Heading>
                {message}
            </Alert>
            <Popups/>
        </div>
        
    )
}
export default Home