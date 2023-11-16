const Notification = ({ message }) => {
  if (message === null) {
    return null;
  } else if (message === "This person has already been deleted!") {
    return <div className="error">{message}</div>;
  }

  return <div className="info">{message}</div>;
};

export default Notification;
