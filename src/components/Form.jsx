import React, { Component } from 'react';
// import { Jumbotron } from 'react-bootstrap';
// import Info from '../controllers/dataController'
import '../App.css';
import axios from 'axios';
import App from '../App.js'


export default class Form extends Component{
    constructor(props){
        super(props);
        this.state = {
                name: '',
                address: '',
                comment: ''            
        }
    }   

    // handleClickAdd = (e) => {
    //     e.preventDefault();
    //     const data = {
    //         name: this.state.name,
    //         address: this.state.address,
    //         comment: this.state.comment
    //     };
    //     axios({
    //         method: 'post',
    //         url: 'http://localhost:8080/data/post',
    //         data
    //       });
    //     //   const { infos } = this.state;
    //     //   this.setState({
    //     //       infos: [ ...infos, data ]
    //     //   })
    //         console.log('success');
    // } 

    handleChangeFor = (key) => (e) => {    
      var state = {};
      state[key] = e.target.value;
      this.setState(state);
    }

    render(){
        return(
            <div>
                <form  onSubmit={() => this.props.handleClick(this.state)}>
                    <input type="text" placeholder="Name" 
                        value={this.state.name} 
                        onChange={this.handleChangeFor('name')}
                        id="name"/>
                    <input type="text" placeholder="Address" 
                        value={this.state.address} 
                        onChange={this.handleChangeFor('address')}
                        id="address"/>
                    <input type="text" placeholder="Comment" 
                        value={this.state.comment}
                        onChange={this.handleChangeFor('comment')}
                        id="comment"/>
                    <input type="submit" value="Add"/>
                </form>
            </div>
        );
    }
}