import './App.css';

import {Routes, Route} from 'react-router-dom';
import TaskForm from './Components/TaskForm';
import TaskList from './Components/TaskList';

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="/change/:id" element={<TaskForm />}/>
      </Routes>
    </div>
  )
}

export default App;
