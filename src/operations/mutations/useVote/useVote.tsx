import { VoteCacheUpdateParams } from 'types';
import { useVoteMutation, VoteMutationFn } from 'operations';
import { VoteType } from 'graphql-generated';
import { CommonNotificationParms, useCommonNotifications } from 'hooks';

type VoteParams = {
  type: VoteType;
  postId: string;
  communityId: string;
  communityName: string;
  updateCache: (args: VoteCacheUpdateParams) => void;
};

type SubmitVoteParams = CommonNotificationParms & {
  voteMutation: VoteMutationFn;
};

function submitVote({
  voteMutation,
  success,
  error: showError,
}: SubmitVoteParams) {
  return async ({
    type,
    postId,
    communityId,
    communityName,
    updateCache,
  }: VoteParams) => {
    try {
      await voteMutation({
        variables: { data: { communityId, postId, type } },
        update: (cache, { data: { vote } }) => {
          if (vote.__typename === 'CommonError') {
            throw new Error(vote.message);
          }

          if (vote.__typename === 'Vote') {
            const newVote = vote;

            updateCache({ cache, communityName, newVote, postId });

            success(`${type}D Successfully`);

            return;
          }

          throw new Error();
        },
      });
    } catch (error) {
      const errorMessage = error?.message || 'something went wrong!';

      showError(errorMessage);
    }
  };
}

function useVote() {
  const [mutationFn, { loading }] = useVoteMutation();
  const { success, error } = useCommonNotifications();

  const vote = submitVote({ voteMutation: mutationFn, success, error });

  return { vote, loading };
}

export default useVote;
