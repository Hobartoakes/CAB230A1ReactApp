import Navbar from "../Components/Navbar"
import { useSelector } from "react-redux";
import { Alert,Card } from "react-bootstrap";
import Popups from "../Components/Popups";
import { useEffect, useState } from "react";
import { fetchMovie } from "../api/api.js";
import { useParams } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import { Link } from "react-router-dom";
import Copyright from "../Components/Copyright"
import imdbLOGO from '../images/IMDB_Logo_2016.svg.png';
import metaLogo from '../images/Metacritic_logo.svg.png';
import rottentomatoeslogo from '../images/rottentomatoes_logo_40.336d6fe66ff.png';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

export default function Movies(){

    const disabled = useSelector(state => state.Navbar.disabled)
      const{display,message,variant} = useSelector(state => state.Alerts)
    const [loading,setLoading] = useState(true)

    const[movie,setMovie] = useState()
    const { id } = useParams()


    const [rowData,setRowData] = useState([{}])

    const columnDefs = [
        {field: 'category',sortable: true,headerName:"Role",flex: 1},
        {field: 'name',sortable: true,headerName:"Name",cellRendererFramework: (params)=><div><Link to={`/movie/person/${params.data.id}`}>{params.value}</Link></div>,flex: 1},
        {field: 'characters',sortable: true,headerName:"Characters",flex: 1}
    ]

    useEffect(() =>{
        fetchMovie(id)
        .then(res =>{
            setMovie(res)
            setRowData(res.principals)
            setLoading(false)
        })
    },[id])

    return(
        <div id="page">
            <div className="main">
                <Navbar></Navbar>
                <div className="content">
                    {loading ?
                        <div>
                            <p>Loading...</p>
                        </div>
                        :
                        <div>
                            <Card>
                              <Card.Body>
                                <div className="d-flex align-items-start ">
                                    <div className="flex-grow-1" style={{ wordWrap: "break-word", width: "70%"}} >
                                    <Card.Title ><h2>{movie.title}</h2></Card.Title>
                                        <Card.Text style={{width: '90%' }}>
                                            Release Year: {movie.year}<br />
                                            Runtime: {movie.runtime} minutes<br/>
                                            Country: {movie.country}<br />
                                            Genres: {movie.genres.join(", ")}<br/>
                                            { movie.boxoffice?
                                            <div>
                                                Box office: ${movie.boxoffice.toLocaleString()}<br />
                                            </div>
                                            :""
                                            }
                                            <br/>
                                            <h4>Plot Summary:</h4>
                                            {movie.plot}
                                        </Card.Text>
                                    </div>
                                    <div style={{width: "60%", marginRight: "25%",width:"15%"}} >
                                        <Card.Text>
                                            <div className="d-flex justify-content-end">
                                                <img src={imdbLOGO}  style={{ height: "24px"}}></img>
                                                <span style={{marginLeft: "10px"}}>{movie.ratings[0].value}</span>
                                            </div>
                                            <br/>
                                            { movie.ratings[1].value != null ?
                                            <div>
                                                <div className="d-flex justify-content-end">
                                                    <img src={rottentomatoeslogo}  style={{ height: "24px"}}></img>
                                                    <span style={{marginLeft: "10px"}}>{movie.ratings[1].value}</span>
                                                </div>
                                                <br/>
                                            </div>
                                            :""
                                            }
                                            { movie.ratings[2].value != null ?
                                            <div className="d-flex justify-content-end">
                                                <img src={metaLogo} style={{ height: "24px"}} ></img>
                                                <span style={{marginLeft: "10px"}}>{movie.ratings[2].value}</span>
                                            </div>
                                            :""
                                            }
                                        </Card.Text>
                                    </div>
                                  <Card.Img src={movie.poster}  style={{ width: "200px",height: "300px"}}  />
                                </div>
                              </Card.Body>
                            </Card>
                            <br></br>
                            <div className="mx-auto" style={{width:"60%" }}>     
                                <div className="ag-theme-alpine">
                                    <h4>Cast of {movie.title}:</h4>
                                    <AgGridReact
                                        rowData={rowData}
                                        columnDefs={columnDefs}
                                        domLayout="autoHeight"
                                    />
                                </div>
                            </div>
                            <br/>
                        </div>
                    }
                </div>
                <Copyright></Copyright>
            </div>
            <Alert show={display} variant={variant} id="alert">
            <Alert.Heading>tips</Alert.Heading>
                {message}
            </Alert>
            <Popups/>
        </div>
    )
}