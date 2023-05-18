export default function Navbar(){
    return (
        <div>
                <div className="bg-dark fixed-bottom text-light" style={{textAlign:"center" ,position: "fixed",bottom: 0,left: 0,width: "100%"}}>
                    I hope you find the movie you’re after!
                    <br></br>
                    All data is from IMDB, Metacritic and RottenTomatoes.
                        © 2023 Yuchen Jiang
                </div>
        </div>
    )
}