import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useField } from "../hooks";

const CreateNew = (props) => {
  // const [content, setContent] = useState("");
  // const [author, setAuthor] = useState("");
  // const [info, setInfo] = useState("");

  const createContent = useField("text");
  const createAuthor = useField("text");
  const createInfo = useField("text");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content,
      author,
      info,
      votes: 0,
    });
    navigate("/");
  };

  return (
    <div>
      <h2>Create a New Anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Content
          <input
            type={createContent.type}
            value={createContent.value}
            onChange={createContent.onChange}
          />
        </div>
        <div>
          Author
          <input
            type={createAuthor.type}
            value={createAuthor.value}
            onChange={createAuthor.onChange}
          />
        </div>
        <div>
          URL for more info
          <input
            type={createInfo.type}
            value={createInfo.value}
            onChange={createInfo.onChange}
          />
        </div>
        <button>Create</button>
      </form>
    </div>
  );
};

export default CreateNew;
