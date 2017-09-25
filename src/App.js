import React, { Component } from 'react';
// import { Jumbotron } from 'react-bootstrap';
import axios from 'axios';
// import Info from '../controllers/dataController'
import './App.css';
import AddForm from './components/AddForm'

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            infos: [],
            // editContent:{
            //     editableFlag: false,
            //     editButtonValue: "Edit",
            //     content: {
            //         name: "",
            //         address: "",
            //         comment: ""
            //     }

            // }
            editableFlag: false,
            
            editing: [],
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

    handleClickEdit = (e, data) => {
        e.preventDefault();
        this.setState({editableFlag: true});
        // this.setState({editButtonValue: "Add"})
        // console.log(this.editableFlag);
        // this.setState({editID: this.refs.tr.key});
        
        var edit = document.getElementById("editThis");
        console.log(edit);

        this.setState( state => {
            if ( state.editing.includes( data._id )) {
                return {
                    editing: state.editing.filter( id => id !== data._id ),
                };
            }

            return {
                editing: [...state.editing, data._id],
            }
        });
        // if(this.state.editID === data._id){
        //     e.target.value = "Add";
        //     this.setState({editableFlag: true});
        // }
    //     for (let i = 0; i < this.refs.lenght; i++){
    //     if (data._id === this.refs._id) {
    //         console.log(this.refs)
    //     }
    // }
        

        // data.editableFlag = true;
        // data.editButtonValue = "Add";

        // const infosArray = this.state.infos;
        // const index = infosArray.indexOf(data);
        // infosArray[index].name = "rajan",
        // infosArray[index].address = "nepal",
        // infosArray[index].comment = "namaskar"
        // const { infos } = this.state;
        // this.setState({
        //     infos: [...infos, infosArray]
        // });
        // const editData = {
        //     name: "rajan",
        //     address: "nepal",
        //     comment: "namaskar",
        // };
        // console.log(infosArray);

        // axios({
        //     method: 'put',
        //     url: 'http://localhost:8080/data/' + data._id,
        //     editData
        //     // params: {
        //     //     id: data._id
        //     // }
        // })

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
                                <tr id="editThis" contentEditable={this.state.editing.includes(data._id)} name={data._id} key={data._id}>
                                    <td>{rowNum++}</td>
                                    <td>{data.name}</td>
                                    <td>{data.address}</td>
                                    <td>{data.comment}</td>
                                    <td>
                                        {/* This is for Edit button */}
                                        <input value={this.state.editing.includes(data._id) ? 'Stop' : 'Edit'} type="button" onClick={(e) => this.handleClickEdit(e, data)}>
                                            
                                        </input>
                                        {/* This is for Delete button */}
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
                        {/* This is for Add button */}
                        <br />
                        <AddForm handleClick={this.handleClickAdd} />
                        <br />
                    </div>
                </div>
            </div>
        );
    }
}


