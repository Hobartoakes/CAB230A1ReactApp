import Navbar from "../Components/Navbar"
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "react-bootstrap";
import Popups from "../Components/Popups";
import { useParams } from "react-router-dom";
import { fetchPerson } from "../api/api.js";
import cookie from 'react-cookies'
import { useState,useEffect } from "react";
import { display  as displayAlert,logout} from '../redux/Store';
import { Link } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import { Bar } from 'react-chartjs-2';
import {Chart,BarElement,CategoryScale,LinearScale,Tooltip,Legend} from "chart.js"


const counts = [
  { id: 0, rating: "0-1", count: 0 },
  { id: 1, rating: "1-2", count: 0 },
  { id: 2, rating: "2-3", count: 0 },
  { id: 3, rating: "3-4", count: 0 },
  { id: 4, rating: "4-5", count: 0 },
  { id: 5, rating: "5-6", count: 0 },
  { id: 6, rating: "6-7", count: 0 },
  { id: 7, rating: "7-8", count: 0 },
  { id: 8, rating: "8-9", count: 0 },
  { id: 9, rating: "9-10", count: 0 }
];
function getRoleBarGraphData(roles) {

  Chart.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
  )

  roles.forEach(role => {
    const imdbRating = role.imdbRating;
    roles.forEach(role => {
      const imdbRating = role.imdbRating;
      if(Math.floor(imdbRating)<10 &&Math.floor(imdbRating)>=0){
      counts[Math.floor(imdbRating)].count++;
    }
  })
});
  return {
    labels: counts.map((count) => count.rating),
    datasets: [
      {
        label : "Number of Movies",
        data : counts.map((count) => count.count),
        backgroundColor: 'blue',
        borderColor: 'black',
        borderWidth: 1
      }
    ]
  }
}



export default function PersonDetails(){
    const disabled = useSelector(state => state.Navbar.disabled)

    const [loading,setLoading] = useState(true)
    const [access,setAccess] = useState(true)

    const{display,message,variant} = useSelector(state => state.Alerts)
    
    const dispatch = useDispatch()
    const loggedIn = useSelector(state => state.Auth.loggedIn)

    const [person,setPerson] = useState({})

    const { id } = useParams();

    const [roleData,setRoleData] = useState([{}])

    const [roleGraphData,setRoleGraphData] = useState([{}])

    const columnDefs = [
      {field: 'category',sortable: true,headerName:"Role",width:"100%",flex: 1},
      {field: 'movieName',sortable: true,headerName:"Movie",cellRendererFramework: (params)=><div><Link to={`/movie/data/${params.data.movieId}`}>{params.value}</Link></div>,width:"200%",flex: 1},
      {field: 'characters',sortable: true,headerName:"Characters",width:"500%",flex: 1},
      {field: 'imdbRating',sortable: true,headerName:"Rating",width:"100%",flex: 1}
    ]

    useEffect(() => {
      fetchPerson(id, cookie.load('Bearer Token'))
        .then(res => {
          if (res.error) {
            dispatch(logout()) 
            dispatch(displayAlert({ message: "Login Expired",variant: "danger"}))
          }
          if (!res.error) {
            setPerson(res)
            setRoleData(res.roles)
            const data = getRoleBarGraphData(res.roles)
            setRoleGraphData(data)  
            setLoading(false)
          }
      })
    }, [])

    return (
      <div id="page">
        <div className="main">
          <Navbar></Navbar>
          <div className="content">
            {loading && loggedIn ? (
              <h4>loading...</h4>
            )  : (
              <div>
                <div className="d-flex align-items-start ">
                  <div className="flex-grow-1">
                      <h3>{person.name}</h3>
                      <p className="fs-4">{person.birthYear} - {person.deathYear}</p>
                  </div>
                </div>
                <br/>
                <div className="ag-theme-alpine mx-auto" style={{width:'80%'}}>
                    <AgGridReact
                      rowData={roleData}
                      columnDefs={columnDefs}
                      domLayout="autoHeight"
                      pagination={true}
                      paginationPageSize={10}
                    />
                </div>
                <br/>
                <div id="Bar_Chart" className="mx-auto">
                  <h4>IMDB Ratings at a glance</h4>
                  <Bar data={roleGraphData} height={"100%"}></Bar>
                </div>
              </div>
            ) }
          </div>
        </div>
        <Alert show={display} variant={variant} id="alert">
        <Alert.Heading>tips</Alert.Heading>
          {message}
        </Alert>
      </div>
    )
}