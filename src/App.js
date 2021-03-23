
import './App.css';
import Login from './login'
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from './Routes/Layout'
import 'react-toastify/dist/ReactToastify.min.css';
import 'react-datetime/css/react-datetime.css';

function App() {
  return (
    <Router>
        <Layout />
    </Router>
  );
}

export default App;
