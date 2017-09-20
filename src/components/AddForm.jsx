import React, { Component } from 'react';
// import { Jumbotron } from 'react-bootstrap';
// import Info from '../controllers/dataController'
import '../App.css';
import axios from 'axios';
import App from '../App.js'

export default class Form extends Component {
    constructor(props) {
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

    // handleChangeFor = (key) => (e) => {
    //     var state = {};
    //     state[key] = e.target.value;
    //     this.setState(state);
    // }

    handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    render() {
        const { name, address, comment } = this.state;
        return (
            <div>
                <form onSubmit={ e => this.props.handleClick(e,this.state)}>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={this.handleChange}
                        id="name"
                        name="name"
                    />
                    <input
                        type="text" placeholder="Address"
                        value={address}
                        onChange={this.handleChange}
                        id="address"
                        name="address"
                    />
                    <input
                        type="text"
                        placeholder="Comment"
                        value={comment}
                        onChange={this.handleChange}
                        id="comment"
                        name="comment"
                    />
                    <input type="submit" value="Add" />
                </form>
            </div>
        );
    }
}