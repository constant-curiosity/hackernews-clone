import { useMutation } from "urql";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import gql from "graphql-tag";

const POST_MUTATION = gql`
  mutation PostMutation($description: String!, $url: String!) {
    post(description: $description, url: $url) {
      id
      url
      description
      postedBy {
        id
        name
      }
      votes {
        id
        user {
          id
        }
      }
    }
  }
`;

const CreateLink = (props) => {
  const [description, setDescription] = useState("");
  const [state, executeMutation] = useMutation(POST_MUTATION);
  const [url, setUrl] = useState("");
  const navigate = useNavigate();

  const onPostSubmitHandler = () => {
    executeMutation({ url, description });
    navigate("/");
  };

  return (
    <div>
      <div className="flex flex-column mt3">
        <input
          className="mb2"
          onChange={(e) => setDescription(e.target.value)}
          placeholder="A description for the link"
          type="text"
          value={description}
        />
        <input
          className="mb2"
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
