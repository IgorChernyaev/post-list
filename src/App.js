import React, { Component } from 'react';
import './App.css';

class App extends React.Component {
  
  state = {
    isLoading: true,
    posts: [],
  }

  componentDidMount() {
    Promise.all([this.listPosts(), this.listComments()])
      .then (response => {
        const posts = response[0];
        const comments = response[1];
        const items = posts.map(post => {
          const exactComments = comments.filter(comment => post.id === comment.postId);
          return { ...post, comment: exactComments }
        });
        this.setState({ posts: items, isLoading: false });
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

  postList = () => {
    return this.state.posts.map(post => {
      return (
        <div className="post" key={post.id}>
          <div className="post__title">{post.title}</div>
          <div className="post__body">{post.body}</div>
          <div className="post__metadata">
            <div className="post__author">UserId: {post.userId}</div>
            <div className="post__id">id: {post.id}</div>
          </div>
          <div className="post__comments">{post.comment.map(this.commentList)}</div>
        </div>
      );
    });
  }

  commentList = (comment) => {
    return (
      <div className="comment" key={comment.id}>
        <div className="comment__top">     
          <div className="comment__name">{comment.name}</div>
        </div>
        <div className="comment__body">{comment.body}</div>
        <div className="comment__id">postId: {comment.postId}</div>
      </div>
    );
  }

  render() {

    if (this.state.isLoading) {
      return <div>Loading...</div>
    }

    return (
      <div className="page-wrapper">
        <div className="container">
          {this.postList()}
        </div>
      </div>
    )
  }
}


export default App;
