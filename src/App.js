import React, { Component } from 'react';
// import { Jumbotron } from 'react-bootstrap';
import axios from 'axios';
// import Info from '../controllers/dataController'
import './App.css';
import Form from './components/AddForm'

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            infos: [],
        }
    }

    componentDidMount() {
        const that = this;
        axios({
            url: 'http://localhost:8080/data',
            method: 'get',
            // baseURL: 'https://localhost:8080',
        }).then(function (result) {
            var apiData = result.data;
            that.setState({
                infos: apiData
            })
        }).catch(function (error) {
            console.log(error);
        })
    }

    handleClickDelete = (data) => {
        axios({
            method: 'delete',
            url: 'http://localhost:8080/data/' + data._id,
            // params: {
            //     id: data._id
            // }
        })
        var infosArray = this.state.infos;
        var index = infosArray.indexOf(data);
        infosArray.splice(index, 1);
        this.setState({ infos: infosArray });
    }

    handleClickAdd = (e, params) => {

        e.preventDefault();
        const data = {
            name: params.name,
            address: params.address,
            comment: params.comment,
        };
        axios({
            method: 'post',
            url: 'http://localhost:8080/data/post',
            data
        });
        const { infos } = this.state;
        this.setState({
            infos: [...infos, data]
        })
        console.log('success');
    }

    handleClickEdit = (data) => {
        const infosArray = this.state.infos;
        const index = infosArray.indexOf(data);
        infosArray[index].name = "rajan",
        infosArray[index].address = "nepal",
        infosArray[index].comment = "namaskar"
        const { infos } = this.state;
        this.setState({
            infos: [...infos, infosArray]
        });
        const editData = {
            name: "rajan",
            address: "nepal",
            comment: "namaskar",
        };
        console.log(infosArray);

        axios({
            method: 'put',
            url: 'http://localhost:8080/data/' + data._id,
            editData
            // params: {
            //     id: data._id
            // }
        })

        // var infosArray = this.state.infos;
        // var index = infosArray.indexOf(data);
        // infosArray.splice(index, 1);
        // this.setState({ infos: infosArray });
    }

    render() {
        const data = this.state.infos;
        var rowNum = 0;
        return (
            <div style={{float:"center",alignContent:"center"}}>
                <div className="nav">
                    <h1>API data manipulation....</h1>
                </div>
                <div className="dataTable">
                   <div style={{display:"flex", justifyContent:"space-around"}}>
                    <table>
                        <tbody>
                            <tr>
                                <th>S.N</th>
                                <th>Name</th>
                                <th>Address</th>
                                <th>Comment</th>
                                <th>Operations</th>
                            </tr>
                            {data.map((data) =>
                                <tr>
                                    <td>{rowNum++}</td>
                                    <td key={data._id}>{data.name}</td>
                                    <td>{data.address}</td>
                                    <td>{data.comment}</td>
                                    <td>
                                        <button value={data._id} onClick={() => this.handleClickEdit(data)}>
                                            Edit
                                        </button>
                                        <button value={data._id} onClick={() => this.handleClickDelete(data)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            )}

                        </tbody>
                    </table>
                    </div>
                    <div style={{display:"flex", justifyContent:"space-around"}}>
                        <br />
                        <Form handleClick={this.handleClickAdd} />
                        <br />
                    </div>
                </div>
            </div>
        );
    }
}


