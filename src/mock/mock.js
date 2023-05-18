var express = require("express")
const cors = require('cors')
// const Mock = require('mockjs');
// const mockjsExpress = require('mockjs-express');

var app = express();
 
app.use(cors())

var router = express.Router();
 
// app.use('/test', mockjsExpress(Mock.mock({
//     'list|10': [{
//       'id|+1': 1,
//       'name': '@cname',
//       'age|18-60': 1,
//       'address': '@province@city@county'
//     }]
//   })));

app.get('/movies/search', function(req, res) {
    var data = 
        { 
            "data": [
        { 
            "title": "Kate & Leopold", 
            "year": 2001, 
            "imdbID": "tt0035423", 
            "imdbRating": "6.4", 
            "rottenTomatoesRating": "52", 
            "metacriticRating": "44", 
            "classification": "PG-13"
            },
            { 
            "title": "The Other Side of the Wind", 
            "year": 2018, 
            "imdbID": "tt0069049", 
            "imdbRating": "6.7", 
            "rottenTomatoesRating": "83", 
            "metacriticRating": "78", 
            "classification": "R"
            },
            { 
            "title": "A Tale of Springtime", 
            "year": 1990, 
            "imdbID": "tt0097106", 
            "imdbRating": "7.1", 
            "rottenTomatoesRating": "86", 
            "metacriticRating": null, 
            "classification": "PG"
            }, 
            ],
            "pagination": {
            "total": 12184, 
            "lastPage": 122, 
            "prevPage": null, 
            "nextPage": 2, 
            "perPage": 100, 
            "currentPage": 1, 
            "from": 0, 
            "to": 100
            } 
        }
    ;
    return res.json(data);
});
 
 
app.get('/people/:id', function(req, res) {
    var data = 
    { 
        "name": "Patrick Stewart", 
        "birthYear": 1940, 
        "deathYear": null, 
        "roles": [
        { 
        "movieName": "Star Trek: Generations", 
        "movieId": "tt0111280", 
        "category": "actor", 
        "characters": [
        "Picard"
        ],
        "imdbRating": 6.6
        },
        { 
        "movieName": "Star Trek: First Contact", 
        "movieId": "tt0117731", 
        "category": "actor", 
        "characters": [
        "Picard"
        ],
        "imdbRating": 7.6
        },
        { 
        "movieName": "Conspiracy Theory", 
        "movieId": "tt0118883", 
        "category": "actor", 
        "characters": [
        "Dr. Jonas"
        ],
        "imdbRating": 6.7
        },
        ] 
       }
    ;
    return res.json(data);
});

app.get('/movies/data/:id', function(req, res) {
    var data = 
    { 
        "year": 1998, 
        "runtime": 83, 
        "genres": [
        "Adventure", 
        "Animation", 
        "Comedy"
        ],
        "country": "United States", 
        "principals": [
        { 
        "id": "nm0506977", 
        "category": "producer", 
        "name": "Bradford Lewis", 
        "characters": []
        },
        { 
        "id": "nm0000095", 
        "category": "actor", 
        "name": "Woody Allen", 
        "characters": [
        "Z"
        ] 
        },
        ],
        "ratings": [
        { 
        "source": "Internet Movie Database", 
        "value": 6.5
        },
        { 
        "source": "Rotten Tomatoes", 
        "value": 92
        },
        { 
        "source": "Metacritic", 
        "value": 72
        } 
        ],
        "boxoffice": 90757863, 
        "poster": "https://m.mediaamazon.com/images/M/MV5BMzMzMDdlMDktODg4OC00Y2E5LTk1ZjMtNzM2MzIxZGQ0ZGI3XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg", 
        "plot": "A rather neurotic ant tries to break from his totalitarian society while trying to win the affection of the princess he loves."
       }
    return res.json(data);
});

app.post('/user/login', function(req, res) {
    var data = 
    { 
        bearerToken:{token:"aaa"},
        refreshToken:{token:"bbb"}
    }
    return res.json(data);
});
app.use("/",router)
 
app.listen(3001)