import {React,useEffect,useState} from 'react';
import axios from 'axios'
import { Buffer } from 'buffer';
import { FaSearch } from 'react-icons/fa';
import './scss/Search.scss'
const Search = () => {
    const clientId = '001c2529f2dc442bb58d426f0a2319bb';
    const clientSecret = 'e1d3c60ca9a149f39f8f93823d6e9e30';
    const authHeader = 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64');
    const [accessToken,setaccessToken] = useState('')
    const [query,setquery] = useState('')
    const [list,setlist] = useState([])
  //render lần đầu lấy tokken
    useEffect(()=>{
      token()
    },[])
    const something=(event)=> {
      if (event.keyCode === 13) {
        search()
      }
    }
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
    let  search=async()=>{
        console.log(query)
        await axios.get(`https://api.spotify.com/v1/search?q=${query}&type=track&market=VN&limit=25`, {
            headers: {
              'Authorization': 'Bearer ' + accessToken
            }
          })
          .then(response => {
            console.log(response)
            if(response && response.data && response.data.tracks && response.data.tracks.items
              ){
                setlist(response.data.tracks.items)
            }
            
          })
          .catch(error => {
            console.error(error);
          });
        }
        
    return (
        <div className='container-search'>
        <div className='search'>
        <input className='input-search' onKeyDown={(e) => something(e) } value={query} placeholder="what do you want to listen to?" onChange={(e) => setquery(e.target.value)}></input>
        <FaSearch className='fasearch' onClick={search} />
        </div>
        <div className='result-search'>
        {list.map((item) => (
          <div className='list-track' key={item.id}>
              <iframe src={`https://open.spotify.com/embed/track/${item.id}`} width="240" height="380" frameBorder="0" allowtransparency="true" allow="encrypted-media">
              </iframe>
          </div>
        ))}

        </div>

        </div>
    );
};

export default Search;