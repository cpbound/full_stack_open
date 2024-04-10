const Notification = ({ message }) => {
  if (message === null) {
    return null;
  } else if (message.includes("failed")) {
    return <div className="error">{message}</div>;
  }

  return <div className="info">{message}</div>;
};

export default Notification;
