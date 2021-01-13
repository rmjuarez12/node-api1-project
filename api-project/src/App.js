// Import Modules
import { BrowserRouter as Router, Route } from "react-router-dom";

// Import Assets
import "./App.css";

// Import Components
import UserList from "./components/UserList";
import Header from "./components/Header";
import UserForm from "./components/UserForm";

function App() {
  return (
    <div className='App'>
      <Router>
        <Header />

        <main>
          <Route path='/' exact component={UserList} />
          <Route path='/add-user' component={UserForm} />
          <Route path='/edit-user/:id' component={UserForm} />
        </main>
      </Router>
    </div>
  );
}

export default App;
