import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import Loader from '../components/Loader';
import NotFound from '../components/NotFound';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    title: '',
    description: '',
    deadline: '',
    priority: 'Low',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [doneTasks, setDoneTasks] = useState(
    JSON.parse(window.localStorage.getItem('doneTasks')) || {}
  );

  const token = JSON.parse(window.sessionStorage.getItem('task_App-token'));
  const username = window.localStorage.getItem('task_App-username');

  // const token = window.localStorage.getItem('task_App-token');

  // Fetch tasks and username
  useEffect(() => {
    if (!token) {
      setError('You must be logged in');
      setLoading(false);
      return;
    }

    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/tasks', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }

        const data = await response.json();
        setTasks(data);
      } catch (err) {
        setError(err.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [token]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = isEditing ? 'PUT' : 'POST';
      const url = isEditing
        ? `http://localhost:8000/api/v1/tasks/${currentTaskId}`
        : 'http://localhost:8000/api/v1/tasks';

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error('Failed to submit task');
      }

      const updatedTask = await response.json();

      if (isEditing) {
        setTasks((prev) =>
          prev.map((task) =>
            task._id === updatedTask._id ? updatedTask : task
          )
        );
      } else {
        setTasks((prev) => [...prev, updatedTask]);
      }

      setForm({ title: '', description: '', deadline: '', priority: 'Low' });
      setIsEditing(false);
      setCurrentTaskId(null);
    } catch (err) {
      setError(err.message || 'Failed to submit task');
    }
  };

  const handleEdit = (task) => {
    setForm({
      title: task.title,
      description: task.description,
      deadline: task.deadline.split('T')[0],
      priority: task.priority,
    });
    setIsEditing(true);
    setCurrentTaskId(task._id);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/api/v1/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete task');
      }

      setTasks((prev) => prev.filter((task) => task._id !== id));
      const updatedDoneTasks = { ...doneTasks };
      delete updatedDoneTasks[id];
      setDoneTasks(updatedDoneTasks);
      window.localStorage.setItem(
        'doneTasks',
        JSON.stringify(updatedDoneTasks)
      );
    } catch (err) {
      setError(err.message || 'Failed to delete task');
    }
  };

  const toggleDone = (id) => {
    const updatedDoneTasks = { ...doneTasks };
    if (updatedDoneTasks[id]) {
      delete updatedDoneTasks[id];
    } else {
      updatedDoneTasks[id] = true;
    }
    setDoneTasks(updatedDoneTasks);
    window.localStorage.setItem('doneTasks', JSON.stringify(updatedDoneTasks));
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <Loader />;
  if (error) return <NotFound />;

  const notifySuccess = () => {
    toast.success('Task created successfully!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  };

  const notifyError = () => {
    toast.error('Task successfully deleted 🗑️', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  };

  const notifyInfo = () => {
    toast.info('🙂 Remember to check your deadlines!', {
      position: 'bottom-left',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  };

  return (
    <>
      <NavBar />
      <div className='min-h-screen flex flex-col items-center bg-gray-100 px-4 md:px-6 lg:px-8 xl:px-12 py-3'>
        <h1 className='text-2xl font-semibold text-primaryColor my-3'>
          {username
            ? `Welcome ${username} 👋`
            : "Welcome Back, Let's Get It Done 👋"}
        </h1>

        <main className='bg-white p-6 rounded-lg shadow-md w-full max-w-2xl mt-6'>
          <h2 className='text-lg font-bold mb-4'>
            {isEditing ? 'Edit Task' : 'Add New Task'}
          </h2>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <input
              type='text'
              name='title'
              value={form.title}
              onChange={handleFormChange}
              placeholder='Title'
              className='w-full border px-4 py-2 rounded'
              required
            />
            <textarea
              name='description'
              value={form.description}
              onChange={handleFormChange}
              placeholder='Description'
              className='w-full border px-4 py-2 rounded'
              required
            />
            <input
              type='date'
              name='deadline'
              value={form.deadline}
              onChange={handleFormChange}
              className='w-full border px-4 py-2 rounded'
              required
            />
            <select
              name='priority'
              value={form.priority}
              onChange={handleFormChange}
              className='w-full border px-4 py-2 rounded'
              required>
              <option value='Low'>Low</option>
              <option value='Medium'>Medium</option>
              <option value='High'>High</option>
            </select>
            <button
              type='submit'
              onClick={notifySuccess}
              className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition'>
              {isEditing ? 'Update Task' : 'Create Task'}
            </button>
          </form>

          <section className='mt-6'>
            <h2 className='text-lg font-bold mb-4'>Search Tasks</h2>
            <input
              type='text'
              placeholder='Search by title...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full border px-4 py-2 rounded'
            />

            <h2 className='text-lg font-bold mt-6 mb-4'>Your Tasks</h2>
            <ul className='space-y-4'>
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
                  <li
                    key={task._id}
                    className={`p-4 rounded-md shadow-md ${
                      doneTasks[task._id] ? 'bg-green-200' : 'bg-gray-100'
                    } flex flex-col`}>
                    <h3 className='text-md font-semibold'>
                      {task.title}{' '}
                      {doneTasks[task._id] && (
                        <span className='text-green-700'>✔</span>
                      )}
                    </h3>
                    <p className='text-sm text-gray-600'>{task.description}</p>
                    <small className='text-xs text-gray-500'>
                      Due: {new Date(task.deadline).toLocaleString()}
                    </small>
                    <p className='text-xs text-gray-700'>
                      Priority: {task.priority}
                    </p>
                    <div className='mt-2 flex space-x-4'>
                      <button
                        onClick={() => {
                          handleEdit(task);
                          notifyInfo();
                        }}
                        className='bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition'>
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          handleDelete(task._id);
                          notifyError();
                        }}
                        className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition'>
                        Delete
                      </button>
                      <button
                        onClick={() => toggleDone(task._id)}
                        className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition'>
                        {doneTasks[task._id]
                          ? 'Mark as Undone'
                          : 'Mark as Done'}
                      </button>
                    </div>
                  </li>
                ))
              ) : (
                <li>No tasks found</li>
              )}
            </ul>
          </section>
        </main>
        <ToastContainer />
      </div>
    </>
  );
};

export default Dashboard;
