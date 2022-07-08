import { RemoveVoteCacheUpdateParams } from 'types';
import { useRemoveVoteMutation, RemoveVoteMutationFn } from 'operations';
import { showProgressNotifications, ProgressNotificationsParams } from 'hooks';

type RemoveVoteParams = {
  postId: string;
  voteId: string;
  communityId: string;
  communityName?: string;
  updateCache: (args: RemoveVoteCacheUpdateParams) => void;
};

type RemoveParams = ProgressNotificationsParams & {
  mutationFn: RemoveVoteMutationFn;
};

function remove({
  mutationFn,
  start,
  success,
  error: errorNotification,
}: RemoveParams) {
  return async ({
    communityId,
    postId,
    voteId,
    communityName,
    updateCache,
  }: RemoveVoteParams) => {
    try {
      // call show notification func
      start('removing vote....');

      await mutationFn({
        variables: {
          communityId,
          postId,
          voteId,
        },
        update: (cache, { data: { removeVote } }) => {
          if (removeVote.__typename === 'CommonError') {
            throw new Error(removeVote.message);
          }

          if (removeVote.__typename === 'Vote') {
            const { id: deletedVoteId } = removeVote;

            updateCache({ cache, deletedVoteId, postId, communityName });

            success('vote removed successfully');

            return;
          }

          throw new Error();
        },
      });
    } catch (error) {
      const errorMessage = error?.message || 'something went wrong!';
      errorNotification(errorMessage);
    }
  };
}

function useRemoveVote() {
  const { start, error, success } = showProgressNotifications({
    id: 'post-vote',
  });
  const [mutationFn, { loading }] = useRemoveVoteMutation();

  const removeVote = remove({ mutationFn, start, success, error });

  // return loading for disabling buttons while operation is in progress
  return { removeVote, loading };
}

export default useRemoveVote;
