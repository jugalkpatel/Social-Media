import { useReactiveVar } from '@apollo/client';
import { useModals } from '@mantine/modals';
import { ActionIcon, Text, createStyles } from '@mantine/core';
import { TiArrowSortedUp, TiArrowSortedDown } from 'react-icons/ti';

import {
  CommentVote,
  RemoveVoteCommentCacheParams,
  VoteCommentCacheParams,
} from 'types';
import { VoteType } from 'graphql-generated';
import { useVoteComment, useRemoveCommentVote } from 'operations';
import { useCheckUserInCommunity, useCommonNotifications } from 'hooks';
import { commentVoteCount, userIdVar } from 'lib';

type Props = {
  votes: Array<CommentVote>;
  commentId: string;
  communityId: string;
  postId: string;
  updateCacheOnVote: (args: VoteCommentCacheParams) => void;
  updateCacheOnRemoveVote: (args: RemoveVoteCommentCacheParams) => void;
};

const useStyles = createStyles((theme) => ({
  arrow: {
    color: 'grey',
    fontSize: '20px',
  },
}));

const checkExistingVote = ({
  type,
  userId,
  votes,
}: {
  type: VoteType;
  userId: string;
  votes: Array<CommentVote>;
}) => {
  const userVote = votes.length
    ? votes.find((voteItem) => {
        if (
          voteItem.type === type &&
          voteItem.votedBy &&
          voteItem.votedBy.id === userId
        ) {
          return true;
        }

        return false;
      })
    : null;

  return userVote;
};

function CommentVotes({
  votes,
  commentId,
  updateCacheOnVote,
  communityId,
  postId,
  updateCacheOnRemoveVote,
}: Props) {
  const { classes } = useStyles();
  const { error } = useCommonNotifications();
  const modals = useModals();
  const userId = useReactiveVar(userIdVar);
  const { isUserInCommunity } = useCheckUserInCommunity({
    communityId,
  });
  const { vote: submitVote, loading: voteCommentLoading } = useVoteComment();
  const { removeVote, loading: removeCommentVoteLoading } =
    useRemoveCommentVote();

  const onVoteClick = (type: VoteType) => {
    if (!userId) {
      modals.openContextModal('LOGIN', { innerProps: {} });
      return;
    }

    if (!isUserInCommunity) {
      error("You're not a member of this community");
      return;
    }

    const vote = checkExistingVote({ type, userId, votes });

    if (vote) {
      removeVote({
        commentId,
        postId,
        voteId: vote.id,
        updateCache: updateCacheOnRemoveVote,
      });
    } else {
      submitVote({ commentId, postId, type, updateCache: updateCacheOnVote });
    }
  };

  const isLoading = removeCommentVoteLoading || voteCommentLoading;
  return (
    <>
      <ActionIcon
        variant="transparent"
        size="sm"
        loading={isLoading}
        onClick={() => onVoteClick(VoteType.Upvote)}
      >
        <TiArrowSortedUp className={classes.arrow} />
      </ActionIcon>

      <Text weight={700} size="sm" color="gray">
        {commentVoteCount(votes)}
      </Text>

      <ActionIcon
        size="sm"
        loading={isLoading}
        onClick={() => onVoteClick(VoteType.Downvote)}
      >
        <TiArrowSortedDown className={classes.arrow} />
      </ActionIcon>
    </>
  );
}

export default CommentVotes;
