import { VoteType } from 'graphql-generated';
import { Vote } from 'types';

export default function voteCount(votes: Array<Vote> | null): number {
  if (!votes || !votes.length) {
    return 0;
  }

  const upvotes = votes.filter(({ type }) => type === VoteType.Upvote);

  const downvotes = votes.filter(({ type }) => type === VoteType.Downvote);

  const totalVotes = upvotes.length - downvotes.length;

  return totalVotes < 0 ? 0 : totalVotes;
}
