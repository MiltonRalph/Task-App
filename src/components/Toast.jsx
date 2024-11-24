import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toast = () => {
  const notifySuccess = () => {
    toast.success('🎉 Task completed successfully!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });
  };

  const notifyError = () => {
    toast.error('❌ Something went wrong. Please try again.', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });
  };

  const notifyInfo = () => {
    toast.info('ℹ️ Remember to check your deadlines!', {
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
    <div style={{ padding: '20px' }}>
      <h1>React Toastify Example</h1>
      <button onClick={notifySuccess} style={styles.button}>
        Show Success
      </button>
      <button onClick={notifyError} style={styles.button}>
        Show Error
      </button>
      <button onClick={notifyInfo} style={styles.button}>
        Show Info
      </button>

      <ToastContainer />
    </div>
  );
};
const styles = {
  button: {
    margin: '10px',
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Toast;
