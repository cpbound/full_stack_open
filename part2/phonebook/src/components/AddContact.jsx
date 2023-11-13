const AddContact = ({
  name,
  number,
  addPerson,
  nameHandler,
  numberHandler,
}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        Name: <input value={name} onChange={nameHandler} />
      </div>
      <div>
        Number: <input value={number} onChange={numberHandler} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default AddContact;
