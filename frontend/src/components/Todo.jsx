import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, ListGroup } from 'react-bootstrap';

function Todo() {
  const [todos, setTodos] = useState([]);
  const [task, settask] = useState('');
  const [editId, setEditId] = useState(null);
  const [edittask, setEdittask] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3200/todo')
      .then(response => setTodos(response.data))
      .catch(error => console.log(error));
  }, []);

  const addTodo = () => {
    axios.post('http://localhost:3200/todo', {task})
      .then(response => setTodos([...todos, response.data]))
      .then(alert("added"))
      .catch(error => console.log(error));
    settask('');
  };

  const editTodo = (id, task) => {
    setEditId(id);
    setEdittask(task);
  };

  const updateTodo = () => {
    axios.put(`http://localhost:3200/todo/${editId}`, { task: edittask })
      .then(response => {
        setTodos(todos.map(todo => todo._id === editId ? response.data : todo));
        setEditId(null);
        setEdittask('');
      })
      .then(alert("updated"))
      .catch(error => console.log(error));
  };

  const deleteTodo = id => {
    axios.delete(`http://localhost:3200/todo/${id}`)
      .then(() => setTodos(todos.filter(todo => todo._id !== id)))
      .then(alert("deleted"))
      .catch(error => console.log(error));
  };


  return (
    <Container >
      <Row className='mx-3'>
        <Col>
          <h1 className='text-center'>To-Do List</h1>
          <Form>
            <Form.Group controlId="formTodotask" className='d-flex'>
              
              <Form.Control
                type="text"
                placeholder="Enter todo"
                value={task}
                onChange={e => settask(e.target.value)}
              /> <Button className='ms-2' variant="primary" onClick={addTodo}>
              Add
            </Button>
            </Form.Group>
            
          </Form>
          <ListGroup className="mt-4">
            {todos.map(todo => (
              <ListGroup.Item style={{maxWidth:1000}} >
                {editId === todo._id ? (
                  <Form.Control
                    type="text"
                    value={edittask}
                    onChange={e => setEdittask(e.target.value)}
                  />
                ) : (
                  <span>
                    {todo.task}
                  </span>
                )}
                <div style={{float:"right"}}>
                <Button variant="danger"  onClick={() => deleteTodo(todo._id)}>
                  Delete
                </Button>
                {editId === todo._id ? (
                  <Button variant="success" className="float-right ms-2" onClick={updateTodo}>
                    Save
                  </Button>
                ) : (
                  <Button variant="warning" className="float-right ms-2" onClick={() => editTodo(todo._id, todo.task)}>
                    Edit
                  </Button>
                )}
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default Todo;
