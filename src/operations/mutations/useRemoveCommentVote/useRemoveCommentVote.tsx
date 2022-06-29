import { RemoveVoteCommentCacheParams } from 'types';
import {
  useRemoveCommentVoteMutation,
  RemoveCommentVoteMutationFn,
} from 'operations';
import { ProgressNotificationsParams, showProgressNotifications } from 'hooks';

type VoteParams = {
  voteId: string;
  commentId: string;
  postId: string;
  updateCache: ({
    cache,
    commentId,
    postId,
    voteId,
  }: RemoveVoteCommentCacheParams) => void;
};

type RemoveCommentVoteParams = ProgressNotificationsParams & {
  remove: RemoveCommentVoteMutationFn;
};

function removeCommentVote({
  remove,
  start,
  success,
  error: showError,
}: RemoveCommentVoteParams) {
  return async ({ updateCache, voteId, commentId, postId }: VoteParams) => {
    try {
      start('removing comment vote');

      await remove({
        variables: { commentId, voteId },
        update: (cache, { data: { removeCommentVote } }) => {
          if (
            removeCommentVote &&
            removeCommentVote.__typename === 'CommonError'
          ) {
            throw new Error(removeCommentVote.message);
          }

          if (
            removeCommentVote &&
            removeCommentVote.__typename === 'CommentVote'
          ) {
            const deletedVote = removeCommentVote;

            updateCache({ cache, commentId, postId, voteId: deletedVote.id });

            success('Comment vote removed successfully');

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

function useRemoveCommentVote() {
  const [mutationFn, { loading }] = useRemoveCommentVoteMutation();
  const { start, success, error } = showProgressNotifications({
    id: 'comment-vote',
  });

  const removeVote = removeCommentVote({
    remove: mutationFn,
    start,
    success,
    error,
  });

  return { removeVote, loading };
}

export default useRemoveCommentVote;
