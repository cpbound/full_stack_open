import axios from "axios";
import { useState, useEffect } from "react";

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    axios.get(baseUrl).then((res) => {
      setResources(res.data);
    });
  }, [baseUrl]);

  const create = async (resource) => {
    const res = await axios.post(baseUrl, resource);
    setResources([...resources, res.data]);
  };

  const service = {
    create,
  };

  return [resources, service];
};

export default useResource;
