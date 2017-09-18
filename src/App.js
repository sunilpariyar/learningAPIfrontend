import React, { Component } from 'react';
// import { Jumbotron } from 'react-bootstrap';
import axios from 'axios';
// import Info from '../controllers/dataController'
import './App.css';
// import Form from './components/Form'

export default class App extends Component{
    constructor(){
        super();
        this.state = {
            infos: [],
            newData: {
                name: '',
                address: '',
                comment: ''
            }
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
    handleClickAdd = (e) => {
        e.preventDefault();
        console.log('success');
        const data = {
            name: this.state.newData.name,
            address: this.state.newData.address,
            comment: this.state.newData.comment
            // name: 'Fred',
            // address: 'USA',
            // comment: 'hi there'
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

    }

    handleClickDelete = (value) => {
        console.log(value);
        axios({
            method: 'delete',
            url: 'http://localhost:8080/data/:id',
            params: {
                id: value
            }
          });
       
    }

    handleChangeFor = (propertyName) => (event) => {
        const { info } = this.state.newData;
        const newInfo = {
          ...info,
          [propertyName]: event.target.value
        };
        this.setState({ newData: newInfo });
        console.log(newInfo);
    }
    
    render(){
        const data = this.state.infos;
        var rowNum = 0;
        return (
            <div>
                <form  onSubmit={this.handleClickAdd}>
                    <input type="text" placeholder="Name" 
                        value={this.state.newData.name} 
                        onChange={this.handleChangeFor('name')}
                        id="name"/>
                    <input type="text" placeholder="Address" 
                        value={this.state.newData.address} 
                        onChange={this.handleChangeFor('address')}
                        id="address"/>
                    <input type="text" placeholder="Comment" 
                        value={this.state.newData.comment}
                        onChange={this.handleChangeFor('comment')}
                        id="comment"/>
                    <input type="submit" value="Add"/>
                </form>
                
                 
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
                                <button value={data._id} onClick={() => this.handleClickDelete(data._id)}>Delete</button>
                            </td>                            
                        </tr>                                            
                        )}
                        
                    </tbody>
                </table>
                {/* <Form /> */}
                {/* <form>                                
                    <td><input type="text" placeholder="Name"></input></td>
                    <td><input type="text" placeholder="Address"></input></td>
                    <td><input type="text" placeholder="Comment"></input></td>
                    
                </form>       
                 */}
            </div>
          );               
    }
}
