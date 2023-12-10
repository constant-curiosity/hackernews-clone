import { useNavigate, useParams } from "react-router-dom";
import { useMemo, useCallback } from "react";
import { useQuery } from "urql";
import Button from "../components/Button";
import FEED_QUERY from "../graphql/query/feedList";
import Link from "../components/Link";
import styles from "./linklist.module.css";

const LinkList = () => {
  const navigate = useNavigate();
  const params = useParams();
  let page = parseInt(params.page, 10) || 1;
  const pageIndex = (page - 1) * 10;

  const variables = useMemo(
    () => ({
      skip: (page - 1) * 10,
      take: 10,
      orderBy: { createdAt: "desc" },
    }),
    [page]
  );

  const [result] = useQuery({ query: FEED_QUERY, variables });
  const { data, fetching, error } = result;

  const nextPage = useCallback(() => {
    if (page <= data.feed.count / 10) {
      navigate(`/new/${page + 1}`);
    }
  }, [page, navigate, data]);

  const previousPage = useCallback(() => {
    if (page > 1) {
      navigate(`/new/${page - 1}`);
    }
  }, [page, navigate]);

  const linksToRender = useMemo(() => {
    if (!data || !data.feed) {
      return [];
    } else if (location.pathname.includes("/new")) {
      return data.feed.links;
    } else {
      const rankedLinks = data.feed.links
        .slice()
        .sort((l1, l2) => l2.votes.length - l1.votes.length);
      return rankedLinks;
    }
  }, [data, location.pathname]);

  if (fetching) return <div>Fetching</div>;
  if (error) return <div>{error.message}</div>;
  if (data.feed.errors.length > 0) return <div>{data.feed.errors[0]}</div>;
  if (data.feed.message !== "") return <div>{data.feed.message}</div>;

  return (
    <>
      <div className={styles.linksList}>
        {linksToRender.map((link, index) => (
          <Link
            createdAt={link.createdAt}
            description={link.description}
            index={index + pageIndex}
            key={link.id}
            linkId={link.id}
            url={link.url}
            username={link.postedBy.name}
            userVotes={link.votes}
            votes={link.votes.length}
          />
        ))}
      </div>
      <div className="flex ml4 mv3 gray">
        <Button
          type={"button"}
          className={"pointer mr2"}
          buttonText={"Previous"}
          onClick={previousPage}
        />
        <Button
          type={"button"}
          className={"pointer"}
          buttonText={"Next"}
          onClick={nextPage}
        />
      </div>
    </>
  );
};

export default LinkList;

//1. Need to add server errors
// username={link.postedBy ? link.postedBy.name : "Anonymous"}
//This is here due to a random error that needs to be looked into
