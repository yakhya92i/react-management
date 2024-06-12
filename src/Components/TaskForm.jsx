import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


function TaskForm () {
    // Je récupère la valeur de l'id : il est soit undefined ou un nombre
    const ID = useParams().id;


    // Je génère ici un id pour le cas où une nouvelle tâche veut être créée
    let newId = String(JSON.parse(localStorage.getItem('id')));
    useEffect(() => {
        localStorage.setItem('id', JSON.stringify(Number(newId) + 1));
    }, [newId]);
    

    const navigate = useNavigate();

    // Je récupère ici le tableau des tâches. Si l'id des params de l'url est undefined, je crée une nouvelle tâche
    // Dans le cas contraire je récupère la tâche à modifier
    const taskTab = JSON.parse(localStorage.getItem('tasks'));
    const task = (ID !== 'undefined') ? taskTab.find(j => j.id == ID) : {id: newId, name: "", desc: ""};

    // Ces états permettent de contrôller les inputs
    const [name, setName] = useState(task.name);
    const [desc, setDesc] = useState(task.desc);

    // Permet de gérer l'erreur où un des champs est vide à la soumission
    const [error, setError] = useState("");

    // Fonction pour gérer la soumission du formulaire
    const handleSubmit = (e) => {
        e.preventDefault();

        // Je vérifie qu'aucun des champs n'est vide. Si oui je continue. Sinon je montre l'erreur
        if(name != "" && desc != "") {
            // Si une tâche a été modifiée, je la modifie dans le tableau
            if(ID !== 'undefined') {
                taskTab.find(j => j.id == ID).desc = desc;
                taskTab.find(j => j.id == ID).name = name;
            }
            // Si une nouvelle tâche a été ajoutée, je l'ajoute au tableau
            else {
                taskTab.push({id: newId, name: name, desc: desc});
            }

            // J'update aussi le localStorage
            localStorage.setItem('tasks', JSON.stringify(taskTab));

            // Je ramène l'utilisateur vers la page d'accueil pour voir l'ensemble de ses tâches
            navigate('/');
        }
        else {
            setError("Please fill in all fields");
        }
    }

    return(
        <div>
            {error != "" && <div className="my-4 bg-danger-subtle p-3 rounded-1" style={{width: '400px', margin:'auto', marginTop: '100px'}}>{error}</div>}
            {task && <form  onSubmit = {handleSubmit} id = "taskForm" className="d-flex flex-column justify-content-around align-items-center" style={{width: '400px', margin:'auto', marginTop: '250px'}}>
                <label htmlFor="nom" className="mt-2">Task name</label>
                <input className="rounded-1 px-3" style = {{width: '100%', height: '40px'}} id = "nom" type = "text" value={name} onChange={(e) => {setName(e.target.value); setError("");}} />
                <label htmlFor="desc" className="mt-2">Description</label>
                <textarea className="rounded-1 px-3" style = {{width: '100%', minHeight: '150px'}} id = "desc" value = {desc} onChange  = {(e) => {setDesc(e.target.value); setError("");}}></textarea>
                <button type='submit' className="btn btn-primary my-2" form="taskForm">{(ID !== 'undefined') ? "Modifier" : "Ajouter"}</button>
            </form>}
        </div>
    )
}


export default TaskForm;