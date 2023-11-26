import { useForm } from "react-hook-form";
import { useMutation } from "urql";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../components/InputField";
import onPostSubmitHandler from "../api/postSubmission";
import POST_MUTATION from "../graphql/mutation/createPost";
import postSchema from "../validation/postValidation";
import styles from "./createlink.module.css";
import Button from "../components/Button";

const CreateLink = () => {
  const [, executeMutation] = useMutation(POST_MUTATION);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(postSchema),
  });
  const handlePostSubmission = async (postData) => {
    onPostSubmitHandler({
      postData,
      executeMutation,
      navigate,
      reset,
    });
  };
  return (
    <form onSubmit={handleSubmit(handlePostSubmission)}>
      <div className={styles.inputContainer}>
        <InputField
          className={`${styles.inputWidth} ${styles.marginBottom}`}
          register={register}
          name="description"
          placeholder="A description for the link"
          error={errors.description}
        />
        <InputField
          className={`${styles.inputWidth} ${styles.marginBottom}`}
          register={register}
          name="url"
          placeholder="The URL for the link"
          error={errors.url}
        />
      </div>
      <Button type={"submit"} buttonText={"Submit"} />
    </form>
  );
};

export default CreateLink;
