
const baseUrl = "http://sefdb02.qut.edu.au:3000"
// const baseUrl = "http://localhost:3001"

export function fetchPerson(imdbID,token){
    const url = baseUrl + "/people/" + imdbID
    return fetch(url,{
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        },
    })
    .then(res =>{
        return res.json()
    })
}

export function fetchMovies(pageNumber, movieTitle, releaseYear) {

    const params = {};

    if (pageNumber) {
        params.page = pageNumber;
    }

    if (movieTitle) {
        params.title = movieTitle;
    }

    if (releaseYear) {
        params.year = releaseYear;
    }

    return fetch(baseUrl+"/movies/search?" + new URLSearchParams(params), {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(res => {
        return res.json();
    });
}

export function fetchMovie(id){
    return fetch(baseUrl + "/movies/data/" + id,{
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(res => {
        return res.json();
    });
}


export function register(formData){
    return fetch(baseUrl + "/user/register",{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "email": formData.email,
            "password": formData.password
            
        })
    })
    .then(res =>{
        return res.json()
    })
}

export function userLogin(formData){
    return fetch(baseUrl + "/user/login",{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "email": formData.email,
            "password": formData.password
            
        })
    })
    .then(res =>{
        return res.json()
    })
}

export function refreshToken(refreshToken){
    return fetch(baseUrl + "/user/refresh",{
        method:'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "refreshToken": refreshToken
        })

    })
    .then(res => {
        return res.json()
    })
}

export function userLogout(refreshToken){
    return fetch(baseUrl + "/user/logout",{
        method:'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "refreshToken": refreshToken
        })

    })
    .then(res => {
        return res.json()
    })
}
