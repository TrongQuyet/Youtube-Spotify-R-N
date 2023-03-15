import {React,useEffect,useState} from 'react';
import axios from 'axios';
import { format, parseISO } from "date-fns";
import '../scss/Popular.scss'
const Popular = (props) => {
    const [videos,setvideos] = useState([])
    let render= async()=> {
        let res = await axios({
            method: "GET",
            url: "https://www.googleapis.com/youtube/v3/videos",
            params: {
                part: 
                    "snippet,contentDetails,statistics"
                  ,
                  chart: "mostPopular",
                  maxResults: 25,
                  key: "AIzaSyCqX_5XlQr6VS_qLuVA7DMqkYeWtxd1Hqc",
                  regionCode: "VN"
            },
          });
        if(res && res.data && res.data.items){
            setvideos(res.data.items)
        }}
        useEffect(()=>{
          if(props.isLoggedIn===true){
            render()
          }
            
        },[props.isLoggedIn])
    return (
      <>
      {props.isLoggedIn===true?(        <div className='container'>
      {props.isshow===true &&videos &&
        videos.length > 0 &&
        videos.map((item) => {
          return (
            <div className="contaiter-body" key={item.id}>
              <div className="top">
                  <iframe
                    className="iframe"
                    src={`https://www.youtube.com/embed/${item.id}`}
                    title={item.snippet.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
              </div>
              <div className="bot">
                <div className="title">{item.snippet.title}</div>
                <div className="time">
                  {format(parseISO(item.snippet.publishedAt), "dd/MM/yyyy-HH:mm:ss a")}
                </div>
                <div className="author"> {item.snippet.channelTitle}</div>
                {/* <div className="description">{item.snippet.description}</div> */}
              </div>
            </div>
          );
        })}
        
        </div>):(<div>Vui lòng đăng nhập để xem video</div>)}

      </>

    );
};

export default Popular;