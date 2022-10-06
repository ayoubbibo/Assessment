import { useNavigate, useLocation } from "react-router-dom";
import {Card} from 'react-bootstrap/';

/**
 * this component render all the details of a post 
 * @param props the data of the author  
 * @returns 
 */
function Details(props){
    let navigate = useNavigate();
    const location = useLocation();
    //console.log(props);
    //console.log(location, "use Location hook");
    const data = location.state?.data;
    return (
        <div>
            <Card>
                <Card.Img variant="top" src={data.author.avatar} className="post-cover__item"/>
                <Card.Body>
                    <Card.Title>{data.author.name}</Card.Title>
                    <Card.Text>
                        {data.title}		
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                <small className="text-muted">published : {data.publishDate}</small>
                </Card.Footer>
            </Card>        
            <button onClick={()=> {navigate("/Home")}}>return to Home</button>
        </div>
    )    
}

export default Details;