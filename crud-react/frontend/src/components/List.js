import React from 'react'
import axios from "axios";
import {BsTrash} from "react-icons/bs";
import {BiEditAlt} from "react-icons/bi";
import { baseUrl } from '../utils/constant';

const List = ({id, task, name, setUpdateUI, updateMode }) => {

const removeTask = () => {
  axios.delete(`${baseUrl}/delete/${id}`)
  .then((res) => {
    console.log(res);
    setUpdateUI((prevState) => !prevState);
  });
}

  return (
    <li>
        <div className="task_entry">
          {id}<br/>
          {task}<br/>
          {name}
        </div>
        <div className="icon_holder">
            <BiEditAlt className="icon" onClick={() => updateMode(id, task, name)} />
            <BsTrash className="icon" onClick={removeTask} />
        </div>
    </li>
  )
}

export default List