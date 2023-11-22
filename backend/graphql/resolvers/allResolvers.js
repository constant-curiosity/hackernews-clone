import AuthMutations from "./mutations/auth/index.js";
import PostMutations from "./mutations/post/index.js";
import VoteMutations from "./mutations/vote/index.js";
import TypeResolvers from "./type/index.js";
import QueryResolvers from "./query/index.js";
import Link from "./type/link.js";
import Subscription from "./Subscription.js";

export default {
  AuthMutations,
  PostMutations,
  VoteMutations,
  TypeResolvers,
  Link,
  QueryResolvers,
  Subscription,
};
