import { VoteType } from 'graphql-generated';
import { CommentVote } from 'types';

export default function commentVoteCount(
  votes: Array<CommentVote> | null,
): number {
  if (!votes || !votes.length) {
    return 0;
  }

  const upvotes = votes.filter(({ type }) => type === VoteType.Upvote);

  const downvotes = votes.filter(({ type }) => type === VoteType.Downvote);

  const totalVotes = upvotes.length - downvotes.length;

  return totalVotes < 0 ? 0 : totalVotes;
}
