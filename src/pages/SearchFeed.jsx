import { useClient } from "urql";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../components/Button";
import FEED_SEARCH_QUERY from "../graphql/query/searchFeed";
import InputField from "../components/InputField";
import Link from "../components/Link";
import searchFeedSchema from "../validation/searchFeedValidation";
import styles from "./searchfeed.module.css";

const SearchFeed = () => {
  const [result, setResult] = useState({ data: null });
  const client = useClient();
  const navigate = useNavigate();

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm({
    resolver: zodResolver(searchFeedSchema),
  });

  const handleSearchFeed = async (data) => {
    try {
      const response = await client
        .query(FEED_SEARCH_QUERY, { filter: data.description })
        .toPromise();
      setResult(response);
      reset();
    } catch (error) {
      navigate("/error", {
        state: { message: "An error occurred while fetching data." },
      });
    }
  };

  const links = result.data ? result.data.feed.links : [];
  const message = result.data ? result.data.feed.message : "";

  return (
    <div>
      <form onSubmit={handleSubmit(handleSearchFeed)}>
        Search
        <InputField
          className={`${styles.inputWidth} ${styles.marginBottom}`}
          register={register}
          name="description"
          placeholder="Enter a description"
          error={errors.description}
        />
        {links.length === 0 && (
          <div className={styles.errorMessage}>{message}</div>
        )}
        <Button type={"submit"} buttonText={"Submit"} />
      </form>
      {links.map((link, index) => (
        <Link
          // username={link.postedBy ? link.postedBy.name : "Anonymous"}
          //This is here due to a random error that needs to be looked into
          createdAt={link.createdAt}
          description={link.description}
          index={index}
          key={link.id}
          linkId={link.id}
          url={link.url}
          username={link.postedBy.name}
          userVotes={link.votes}
          votes={link.votes.length}
        />
      ))}
    </div>
  );
};

export default SearchFeed;
