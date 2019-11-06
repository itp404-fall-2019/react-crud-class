import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Redirect
} from "react-router-dom";
import "./App.css";

// const API = "https://dtang-in-memory-api.herokuapp.com";
const API = "http://localhost:8000";

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
          <Route path="/posts/write" component={CreatePostForm} />
          <Route path="/posts/:id/edit" component={EditPostForm} />
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
  deletePost = async id => {
    await fetch(`${API}/api/posts/${id}`, {
      method: "DELETE"
    });

    this.setState({
      posts: this.state.posts.filter(post => {
        return post.id !== id;
      })
    });
  };
  render() {
    return (
      <ul>
        {this.state.posts.map(post => {
          return (
            <li key={post.id}>
              <NavLink to={`/posts/${post.id}/edit`}>{post.title}</NavLink>
              <button onClick={this.deletePost.bind(this, post.id)}>
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    );
  }
}

class EditPostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      body: ""
    };
  }
  async componentDidMount() {
    const { id } = this.props.match.params;
    const response = await fetch(`${API}/api/posts/${id}`);
    const json = await response.json();
    this.setState({
      title: json.title,
      body: json.body
    });
  }
  handleTitleChange = event => {
    this.setState({ title: event.target.value });
  };
  handleBodyChange = event => {
    this.setState({ body: event.target.value });
  };
  handleSubmit = async event => {
    event.preventDefault();
    const { id } = this.props.match.params;
    await fetch(`${API}/api/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: this.state.title,
        body: this.state.body
      })
    });

    this.setState({ redirectToPostsPage: true });
  };
  render() {
    if (this.state.redirectToPostsPage) {
      return <Redirect to="/" />;
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={this.state.title}
            onChange={this.handleTitleChange}
          />
        </div>
        <div>
          <label htmlFor="body">Body</label>
          <textarea
            id="body"
            value={this.state.body}
            onChange={this.handleBodyChange}
          ></textarea>
        </div>
        <button>Publish</button>
      </form>
    );
  }
}

class CreatePostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      body: ""
    };
  }
  handleTitleChange = event => {
    this.setState({ title: event.target.value });
  };
  handleBodyChange = event => {
    this.setState({ body: event.target.value });
  };
  handleSubmit = async event => {
    event.preventDefault();
    await fetch(`${API}/api/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: this.state.title,
        body: this.state.body
      })
    });

    this.setState({ redirectToPostsPage: true });
  };
  render() {
    if (this.state.redirectToPostsPage) {
      return <Redirect to="/" />;
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={this.state.title}
            onChange={this.handleTitleChange}
          />
        </div>
        <div>
          <label htmlFor="body">Body</label>
          <textarea
            id="body"
            value={this.state.body}
            onChange={this.handleBodyChange}
          ></textarea>
        </div>
        <button>Publish</button>
      </form>
    );
  }
}
