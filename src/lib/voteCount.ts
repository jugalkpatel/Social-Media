import { VoteType, ICommonVote } from 'graphql-generated';

export default function voteCount(votes: Array<ICommonVote> | null): number {
  if (!votes || !votes.length) {
    return 0;
  }

  const upvotes = votes.filter(({ type }) => type === VoteType.Upvote);

  return upvotes.length;
}
