// Imports
import Navbar from "../Components/Navbar"
import Copyright from "../Components/Copyright"

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Alert } from "react-bootstrap";
import Popups from "../Components/Popups";
import { AgGridReact } from "ag-grid-react";
import { useState,useEffect,useRef } from "react";
import { fetchMovies } from "../api/api.js";
import { Button, Col, Form, Row } from "react-bootstrap";

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';


export default function Movies(){
    const disabled = useSelector(state => state.Navbar.disabled)
    
    const{display,message,variant} = useSelector(state => state.Alerts)

    const[pageNumber,setPageNumber] = useState(1)


    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 1899 }, (_, i) => 1900 + i);

    const movieTitleRef = useRef(null);
    const movieYearRef = useRef(null);

    const[movieTitle,setMovieTitle] = useState()
    const[movieYear,setMovieYear] = useState()


    const[total,setTotal] = useState(null)
    const[current,setCurrent] = useState(null)

    const [rowData,setRowData] = useState([{}])


    const columnDefs = [
        {field: 'title',sortable: true, cellRendererFramework: (params)=><div><Link to={`/movie/data/${params.data.imdbID}`}>{params.value}</Link></div>, flex: 1},
        {field: 'year',sortable: true, flex: 1},
        {field: 'imdbRating',sortable: true, flex: 1},
        {field: 'rottenTomatoesRating',sortable: true, flex: 1},
        {field: 'metacriticRating',sortable: true, flex: 1}

    ]


    const handleSearch = () => {
        setMovieTitle(movieTitleRef.current.value)
        setMovieYear(movieYearRef.current.value)
        setPageNumber(1)
    }

    useEffect(() => {
        fetchMovies(null, movieTitle, movieYear)
          .then((res) => {
            setRowData(res.data);
            setTotal(res.pagination.total);
            setCurrent(res.pagination.to);
            setPageNumber(1);
          });
    }, [movieTitle, movieYear]);

    
    useEffect(() => {
        if(current < total){
            fetchMovies(pageNumber, movieTitle, movieYear)
            .then(res => {
              setRowData(prevData => [...prevData, ...res.data]);
              setTotal(res.pagination.total);
              setCurrent(res.pagination.to);
            });   
        }
    }, [pageNumber]);


    return(
        <div id="page">
            <div className="main">
                <Navbar></Navbar>
                <div className="content">
                    <h4>Search for Movies</h4>

                    <div id="Search" >
                        <Form  onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
                            <Row>
                                <Col>
                                    <Form.Label>Movie Title</Form.Label>
                                    <Form.Control
                                        name = "movieTitle"
                                        ref={movieTitleRef}
                                    ></Form.Control>
                                    </Col>
                                     <Col>
                                    <Form.Label>Release Year</Form.Label>
                                    <Form.Select  name="movieYear" ref={movieYearRef} defaultValue="" >
                                      {years.map(year => (
                                        <option key={year} value={year}>{year}</option>
                                      ))}
                                        <option key = "Select" value="">Any year</option>
                                    </Form.Select>
                                    </Col>
                                    <Col>
                                    <Form.Group className="mt-4 mb-4 col-8 mx-auto">
                                <div className="d-flex justify-content-center justify-content-between">
                                    <Button className="text-light w-25 mx-1" variant="primary" onClick={() => handleSearch()} disabled = {disabled}>Search</Button>
                                </div>
                            </Form.Group>
                                </Col>
                      
                            </Row>
                        </Form>
                    </div>
                    <div className="ag-theme-alpine" style={{width:'100%'}}>
                        <AgGridReact
                            rowData={rowData}
                            columnDefs={columnDefs}
                            domLayout={'autoHeight'}
                        />
                    </div>
                    <div>
                    <p>Showing {current} out of {total} movies</p>
                    </div>
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