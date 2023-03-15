import { forwardRef, useImperativeHandle, useState, React } from "react";
import axios from "axios";
import { format, parseISO } from "date-fns";
import '../scss/Nav.scss'
import "../scss/Body.scss";
const Youtube = (props,ref) => {
  const [videos, setvideos] = useState([]);
  
  useImperativeHandle(ref, () => ({
     search : async(event)=> {
      let query = props.query1;
      let res = await axios({
        method: "GET",
        url: "https://www.googleapis.com/youtube/v3/search",
        params: {
          part: "snippet",
          maxResults: "30",
          key: "AIzaSyCqX_5XlQr6VS_qLuVA7DMqkYeWtxd1Hqc",
          q: query,
        },
      });
  
      if ( res && res.data && res.data.items) {
        let data = res.data.items;
        let result = [];
        if (data && data.length > 0) {
          data.map((item) => {
            let obj = {};
            obj.id = item.id.videoId;
            obj.title = item.snippet.title;
            obj.description = item.snippet.description;
            obj.author = item.snippet.channelTitle;
            obj.publishedAt = item.snippet.publishedAt;
            result.push(obj);
          });
        }
        setvideos(result);
      }
    }

  }));
  return (
    <>
    {props.isLoggedIn===true?(    <div>
    {props.isshow===false &&videos &&
        videos.length > 0 &&
        videos.map((item) => {
          return (
            <div className="contaiter-body-search" key={item.id}>
              <div className="left">
                <div>
                  <iframe
                    className="iframe"
                    src={`https://www.youtube.com/embed/${item.id}`}
                    title={item.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
              <div className="right">
                <div className="title">{item.title}</div>
                <div className="time">
                  {format(parseISO(item.publishedAt), "dd/MM/yyyy-HH:mm:ss a")}
                </div>
                <div className="author"> {item.author}</div>
                <div className="description">{item.description}</div>
              </div>
            </div>
          );
        })}
    </div>):(<div></div>)}

    </>
  );
};

export default forwardRef(Youtube);

