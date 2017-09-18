import React, { Component } from 'react';
// import { Jumbotron } from 'react-bootstrap';
// import axios from 'axios';
// import Info from '../controllers/dataController'
import '../App.css';

export default class Form extends Component{
    render(){
        return(
            <form>
                <input type="text" placeholder="Name"></input>
                <input type="text" placeholder="Address"></input>
                <input type="text" placeholder="Comment"></input>
            </form>
        );
    }
}