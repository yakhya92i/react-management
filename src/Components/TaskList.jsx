import { useNavigate } from "react-router-dom";
import TaskItem from "./TaskItem";
import { useEffect, useState } from "react";



function TaskList() {
// Un état pour conserver le tableau de tâches à accomplir
const [tasksTab, setTasks] = useState([]);

useEffect(() => {
function fetchData () {
    // S'il n'y a pas de variable pour stocker le tableau définie, on la définit
    if(localStorage.getItem('tasks') === null) {
        localStorage.setItem('tasks', JSON.stringify([{ }]));
    }
    // S'il n'y a pas de variable pour stocker l'id définie, on la définit
    if(localStorage.getItem('id') === null) {
        localStorage.setItem('id', '0');
    }
    // On récupère ensuite le tableau de tâches
    const fetched = localStorage.getItem("tasks");
    setTasks(JSON.parse(fetched));
}
        fetchData();
    }, []);

const navigate = useNavigate();
return (
    <div className="d-flex flex-column justify-content-center align-items-center">
        <button className="btn btn-primary my-4" type="button" onClick={() => {navigate('/change/undefined')}}>Add task</button>
        {/* Le tableau est parcouru et s'il est rempli et contient plus de deux éléments, on le parcoure pour former une liste d'élément TaskItem */}
        {tasksTab && tasksTab.length > 1  && <div className="accordion" id="accordionExample" style = {{width: '85%'}}>
        {(tasksTab.filter((j) => tasksTab.indexOf(j) !== 0)).map((j) => {return <TaskItem key = {j.id} ID = {j.id} Name = {j.name} Desc = {j.desc} />})}
    </div>}
    </div>
)
}


export default TaskList;