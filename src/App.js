import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import "./App.css";

const API = "https://dtang-in-memory-api.herokuapp.com";

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <h1>My Blog</h1>
        <nav>
          <ul>
            <li>
              <NavLink to="/" exact={true}>
                Posts
              </NavLink>
            </li>
            <li>
              <NavLink to="/posts/write">Write a Post</NavLink>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/" exact={true} component={PostsPage} />
          <Route path="/posts/write" component={PostForm} />
        </Switch>
      </Router>
    );
  }
}

class PostsPage extends React.Component {
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
      <ul>
        {this.state.posts.map(post => {
          return <li key={post.id}>{post.title}</li>;
        })}
      </ul>
    );
  }
}

class PostForm extends React.Component {
  render() {
    return (
      <form>
        <div>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" />
        </div>
        <div>
          <label htmlFor="body">Body</label>
          <textarea id="body"></textarea>
        </div>
        <button>Publish</button>
      </form>
    );
  }
}
