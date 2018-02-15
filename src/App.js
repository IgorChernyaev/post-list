import React, { Component } from 'react';
//import Post from './posts.js'; 
//import Comment from './comments.js';
//import './App.css';

class App extends React.Component {

  componentDidMount() {
    Promise.all([this.listPosts(), this.listComments()])
      .then (response => {
        const posts = response [0];
        const comments = response [1];
        const items = posts.map(post => {
          const exactComments = comments.filter(comment => post.id === comment.postId);
          return { ...post, comment: exactComments }
        });
        console.log(items)  
      })
  }

  listPosts = () => {
    return fetch(`http://jsonplaceholder.typicode.com/posts`)
      .then(response=>response.json())
  }

  listComments = () => {
    return fetch(`https://jsonplaceholder.typicode.com/comments`)
      .then(response=>response.json()) 
  } 

  

  render() {
    return (
      <div>
     
      </div>
    )
  }
}


export default App;
