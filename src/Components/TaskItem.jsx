import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import image from '../assets/completed.png'


function TaskItem({Name, Desc, ID}) {
    const navigate = useNavigate();
    // Un état pour gérer la suppression de la tâche
    const [deleted, setDeleted] = useState(false);

    // Une référence au bouton de suppression pour son utilisation plus tard
    const buttonRef = useRef(null);

    // Lorsque l'objet est supprimé, je l'enlève du tableau et j'update le rendu grâce à setDeleted pour le faire disparaitre de la liste
    const handleDeletion = () => {
        // Je vérifie d'abord que la personne veut vraiment supprimer la tâche
        if(confirm("Do you really want to remove this task?")) {
            const taskTab = JSON.parse(localStorage.getItem('tasks'));
            const newTab = taskTab.filter(j=> j.id !== ID);
            localStorage.setItem('tasks', JSON.stringify(newTab));
            setDeleted(true);
        }
    };

    return(
        !deleted && <div className="accordion-item" id = {ID} key = {ID}>
            <h2 className="accordion-header">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    {Name}
                    {/* La référence au bouton est utilisée pour entrainer sont clic forcé quand la tâche est complétée
                        Cela permet de la supprimée effectivement de la liste sans avoir  réécrire une fonction séparée pour. */}
                    <img onClick={() => {buttonRef.current.click()}} style={{position: 'absolute', right: '100px', width: '16px', height: '16px'}} src = {image} alt="completed" />
                </button>
            </h2>
            <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                <div className="accordion-body container-fluid">
                    <div className = "row justify-items-around align-items-center">
                        <p className='col-12 col-lg-7' style={{textAlign: 'justify'}}>{Desc}</p>
                        <button type='button' className='btn btn-primary col-12 col-lg-2 my-2 my-lg-0 mx-lg-2' onClick={() => {navigate(`/change/${ID}`)}}>Modify</button>
                        <button ref={buttonRef} type='button' className='btn btn-primary col-12 col-lg-2 my-2 my-lg-0 mx-lg-2' onClick={handleDeletion}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

TaskItem.propTypes = {
    ID: PropTypes.string,
    Name: PropTypes.string,
    Desc: PropTypes.string
}


export default TaskItem;