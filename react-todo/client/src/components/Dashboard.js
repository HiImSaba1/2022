import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";
import NewToDo from "./NewToDo";
import TodoCard from "./TodoCard";

const Dashboard = () => {
  const { user, completeToDos, incompleteToDos } = useGlobalContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user && navigate) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="dashboard">
        <NewToDo />
      <div className="todos">
        <h1 className="todos__title">Incomplete Todos</h1>
        {incompleteToDos.map((toDo) => (
          <TodoCard toDo={toDo} key={toDo._id} />
          
        ))}
      </div>

      {completeToDos.length > 0 && (
        <div className="todos">
          <h1 className="todos__title">Complete Todos</h1>
          {completeToDos.map((toDo) => (
            <TodoCard toDo={toDo} key={toDo._id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
