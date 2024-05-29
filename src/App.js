import logo from './logo.svg';
import './App.css';
import PostItems from './post/postItems';
import Users from './users/users';

function App() {
  return (
    <div className="App">
     <h1>React redux</h1>
     <Users/>
     <PostItems/>
     
    </div>
  );
}

export default App;
