import React, { Component } from 'react';
// import { Jumbotron } from 'react-bootstrap';
import axios from 'axios';
// import Info from '../controllers/dataController'
import './App.css';
import Form from './components/Form'

export default class App extends Component{
    constructor(props){
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
        }).then(function(result){
                var apiData = result.data;
                that.setState({ infos: apiData 
            })            
        }).catch(function(error) {
                console.log(error);
            })
    }    

    handleClickDelete = (data) => {
        axios({
            method: 'delete',
            url: 'http://localhost:8080/data/:id',
            params: {
                id: data._id
            }
          })
          var infosArray = this.state.infos;
          var index = infosArray.indexOf(data);
          infosArray.splice(index,1);
          this.setState({infos: infosArray});
    }

    handleClickAdd = (params) => {
         
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
              infos: [ ...infos, data ]
          })
            console.log('success');
    } 
    
    render(){
        const data = this.state.infos;
        var rowNum = 0;
        return (
            <div>
                <br/>
                <Form handleClick={this.handleClickAdd} state={this.state.infos}/>
                <br/>
                <table style={{border:"1px solid", width:550}}>
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
                                <button>Edit</button>
                                <button value={data._id} onClick={() => this.handleClickDelete(data)}>Delete</button>
                            </td>                            
                        </tr>                                            
                        )}
                        
                    </tbody>
                </table>
            </div>
          );               
    }
}


