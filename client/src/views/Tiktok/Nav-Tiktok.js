import {React,useEffect,useState} from 'react';
import { Container, Row, Col } from "react-bootstrap";
import logotiktok from "./images/logo-Tiktok.jpg"
import { FaSearch } from 'react-icons/fa';
import "./scss/Nav-tiktok.scss"
import axios from "axios"
const NavTiktok = () => {

    useEffect(()=>{
        token()
    },[])
    // Set the API endpoint
const endpoint = 'https://open.tiktokapis.com//oauth/access_token/';

// Set the parameters for the API request
const params = {
  app_id: '7210594668864800773', // Your TikTok App ID
  app_secret: '26e0e4019baccc84898f121fd425806a', // Your TikTok App Secret
  grant_type: 'awdoc8jxx2qdhfup', // OAuth 2.0 grant type
}

let token=async()=>{
// Send a POST request to the API endpoint with the parameters
axios.post(endpoint, params)
  .then(response => {
    // Process the response data
    const access_token = response.data.access_token;
    console.log(access_token);
  })
  .catch(error => {
    // Handle errors
    console.error(error);
  });
}

    return (
        <Container className='container-tiktok'>
      <Row>
        <Col><img className='logotiktok' src={logotiktok}></img></Col>
        <Col><div className="search-container">
        <input type="text" placeholder="Search Account and videos"/>
        <button type="submit"><FaSearch/></button>
        </div>
        </Col>
        <Col></Col>
      </Row>
    </Container>
    );
};

export default NavTiktok;