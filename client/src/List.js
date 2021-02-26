import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';

const List = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('/tasks');
      setTasks(data);
    };

    getData();
  }, []);
  return (
    <div>
      LIST
      {tasks && tasks.map((t) => <h3 key={t._id}>{t.task}</h3>)}
    </div>
  );
};

export default List;
