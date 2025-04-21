const Notification = ({ notification }) => {
  console.log("Notification",);

  const style = {
    border: "solid",
    padding: 8,
    borderRadius: 8,
    margin: 24,
    borderWidth: 1,
  };

  if (!notification) {
    return null;
  }

  return <div style={style}>{notification}</div>;
};

export default Notification;
