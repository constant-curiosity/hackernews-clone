import { useMutation } from "urql";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import POST_MUTATION from "../graphql/mutation/createPost";
// import { postValidation } from "../../backend/validations/validationSchema";
import styles from "./createlink.module.css";

const CreateLink = () => {
  const [description, setDescription] = useState("");
  const [state, executeMutation] = useMutation(POST_MUTATION);
  const [url, setUrl] = useState("");
  const navigate = useNavigate();

  const onPostSubmitHandler = async () => {
    const response = await executeMutation({ url, description });
    console.log(response);
    navigate("/");
  };

  return (
    <div>
      <div className={styles.flexColumn}>
        <input
          className={styles.marginBottom}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="A description for the link"
          type="text"
          value={description}
        />
        <input
          className={styles.marginBottom}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="The URL for the link"
          type="text"
          value={url}
        />
      </div>
      <button disabled={state.fetching} onClick={onPostSubmitHandler}>
        Submit
      </button>
    </div>
  );
};

export default CreateLink;
