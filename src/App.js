import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";

const API = "https://dtang-in-memory-api.herokuapp.com";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }
  async componentDidMount() {
    const response = await fetch(`${API}/api/posts`);
    const posts = await response.json();
    this.setState({ posts });
  }
  render() {
    return (
      <Router>
        <h1>My Blog</h1>
        <nav>
          <ul>
            {this.state.posts.map(post => {
              return <li key={post.id}>{post.title}</li>;
            })}
          </ul>
        </nav>
      </Router>
    );
  }
}
