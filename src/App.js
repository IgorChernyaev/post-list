import React, { Component } from 'react';
//import Post from './posts.js'; 
//import Comment from './comments.js';
//import './App.css';

class App extends React.Component {
  
  listPosts() {
    return (fetch(`http://jsonplaceholder.typicode.com/posts`)
    .then(response=>response.json())) 
  }

  listComments() {
    return (fetch(`https://jsonplaceholder.typicode.com/comments`)
    .then(response=>response.json())) 
  } 

  componentDidMount(){
    Promise.all([this.listPosts(), this.listComments()])
    .then(response => console.log(response))
  }

  render() {
    return(
      <div>
      </div>
   )
  }
}


export default App;
