import '../styles/App.css';
import Axios from "axios";
import { useEffect, useState } from 'react';
import AvatarsList from './AvatarsList';
import Banner from './Banner';

function Home(){
const [data, setData] = useState([]);
useEffect(() => {
    Axios.get('http://localhost:3000/api/posts')
    .then(res => { 
    console.log("We got the data that we need ",res.data.posts)
    setData(res.data.posts);
    }
    )
    .catch(err => console.log(err));
}, [])
return(
    <div className="App">
        <Banner/>     
        <AvatarsList data={data}/>
    </div>
)
}
  
export default Home;
  