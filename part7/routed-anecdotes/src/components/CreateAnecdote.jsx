import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useField } from "../hooks";

const CreateNew = (props) => {
  const createContent = useField("text");
  const createAuthor = useField("text");
  const createInfo = useField("text");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: createContent.value,
      author: createAuthor.value,
      info: createInfo.value,
      votes: 0,
    });
    navigate("/");
  };

  const handleReset = () => {
    createContent.reset();
    createAuthor.reset();
    createInfo.reset();
  };

  const { reset: resetContent, ...createContentInput } = createContent;
  const { reset: resetAuthor, ...createAuthorInput } = createAuthor;
  const { reset: resetInfo, ...createInfoInput } = createInfo;

  return (
    <div>
      <h2>Create a New Anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Content:
          <input {...createContentInput} />
        </div>
        <div>
          Author:
          <input {...createAuthorInput} />
        </div>
        <div>
          URL for more info:
          <input {...createInfoInput} />
        </div>
        <button type="submit">Create</button>
        <button type="button" onClick={handleReset}>
          Reset
        </button>
      </form>
    </div>
  );
};

export default CreateNew;
