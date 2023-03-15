import {React,useState,useEffect} from 'react';
import "./scss/Home.scss"
import axios from 'axios'
import { Buffer } from 'buffer';
const Homespotify = () => {

  const clientId = '001c2529f2dc442bb58d426f0a2319bb';
  const clientSecret = 'e1d3c60ca9a149f39f8f93823d6e9e30';
  const authHeader = 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64');
  const [accessToken,setaccessToken] = useState('')
  const [listmusic,setlistmusic] = useState([])
  const [render,setrender] = useState(false)
//render lần đầu lấy tokken
  useEffect(()=>{
    token()
  },[])
//có tokken mới render lấy music    
  useEffect(()=>{
    if(render==true) {
      getlist()
    }else{
      setrender(true)
    }
  },[accessToken])
  //render lại khi có music
  useEffect(()=>{
    if(render==true) {
      console.log('list:',listmusic)
    }else{
      setrender(true)
    }
  },[listmusic])

 // Xác thực truy cập vào API Spotify
  let token =async()=>{
   await axios.post('https://accounts.spotify.com/api/token', 
    'grant_type=client_credentials', 
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': authHeader
      }
    }
    )
    .then(response => {
    console.log( 'token cua b =',response.data.access_token);
    if(response && response.data && response.data.access_token){
      let token = response.data.access_token
      setaccessToken(token)
    }
    
    })
    .catch(error => {
    console.error(error);
    });
  }
 
let getlist =async()=> {
  //Lấy danh sách bài hát đang thịnh hành trên Spotify
  //https://api.spotify.com/v1/albums/0S4pP8MBY9p7ngFWIZQAJv/tracks?limit=5
  await axios.get('https://api.spotify.com/v1/browse/featured-playlists?country=VN&limit=25', {
    headers: {
      'Authorization': 'Bearer ' + accessToken
    }
  })
  .then(response => {
    console.log(response)
    if(response && response.data && response.data.playlists && response.data.playlists.items
      ){
      setlistmusic(response.data.playlists.items)
    }
    
  })
  .catch(error => {
    console.error(error);
  });
}

{/* <iframe src={`https://open.spotify.com/embed/playlist/${item.id}`} width="240" height="380" frameBorder="0" allowtransparency="true" allow="encrypted-media">
              </iframe> */}
  return (
    <div className="popular">
     <div className="top-popular">
      <button className="Premium Plans">Upgrade</button>
      <button className="Account">Account</button>
     </div>
     <h2>Trending Now</h2>
     <div className='popular-container'>
        {listmusic.map((item) => (
          <div className='list-track' key={item.id}>
              <iframe src={`https://open.spotify.com/embed/playlist/${item.id}`} width="240" height="380" frameBorder="0" allowtransparency="true" allow="encrypted-media">
              </iframe>
          </div>
        ))}

        </div>
    </div>
  );
};

export default Homespotify;