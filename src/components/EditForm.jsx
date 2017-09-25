import React, { Component } from 'react';
// import { Jumbotron } from 'react-bootstrap';
// import Info from '../controllers/dataController'
import '../App.css';
// import axios from 'axios';
// import App from '../App.js'

export default class EditForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '',
            comment: ''
        }
    }

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
                <form ref="addForm" onSubmit={ e => this.props.handleClick(e,this.state)}>
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