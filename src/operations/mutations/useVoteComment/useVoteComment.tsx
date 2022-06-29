import { VoteType } from 'graphql-generated';
import { VoteCommentCacheParams } from 'types';
import { useCommonNotifications, CommonNotificationParms } from 'hooks';
import { useVoteCommentMutation, VoteCommentMutationFn } from 'operations';

type VoteParams = {
  type: VoteType;
  commentId: string;
  postId: string;
  updateCache: (args: VoteCommentCacheParams) => void;
};

type CommentVoteParams = CommonNotificationParms & {
  vote: VoteCommentMutationFn;
};

function submitVote({ vote, success, error: showError }: CommentVoteParams) {
  return async ({ commentId, postId, type, updateCache }: VoteParams) => {
    try {
      await vote({
        variables: { commentId, type },
        update: (cache, { data: { voteComment } }) => {
          if (voteComment && voteComment.__typename === 'CommonError') {
            throw new Error(voteComment.message);
          }

          if (voteComment && voteComment.__typename === 'CommentVote') {
            const newCommentVote = voteComment;

            updateCache({ cache, commentId, newCommentVote, postId });

            success(`${type}D Comment successfully`);

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

function useVoteComment() {
  const [mutationFn, { loading }] = useVoteCommentMutation();
  const { success, error } = useCommonNotifications();

  const vote = submitVote({ vote: mutationFn, success, error });

  return { vote, loading };
}

export default useVoteComment;
