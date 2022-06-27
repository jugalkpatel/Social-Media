import { useReactiveVar } from '@apollo/client';
import { ActionIcon, Text, createStyles } from '@mantine/core';
import { TiArrowSortedUp, TiArrowSortedDown } from 'react-icons/ti';

import { commentVoteCount, userIdVar } from 'lib';
import { CommentVote, VoteCommentCacheParams } from 'types';
import { VoteType } from 'graphql-generated';
import { useVoteComment } from 'operations';
import { useCheckUserInCommunity } from 'hooks';

type Props = {
  votes: Array<CommentVote>;
  commentId: string;
  communityName: string;
  postId: string;
  updateCacheOnVote: (args: VoteCommentCacheParams) => void;
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
  communityName,
  postId,
}: Props) {
  const { classes } = useStyles();
  const userId = useReactiveVar(userIdVar);
  const { isUserInCommunity } = useCheckUserInCommunity({
    title: communityName,
  });
  const { vote: submitVote, loading: voteCommentLoading } = useVoteComment();

  const onVoteClick = (type: VoteType) => {
    if (!userId || !isUserInCommunity) {
      console.log("you're not logged in");
      return;
    }

    const vote = checkExistingVote({ type, userId, votes });

    if (vote) {
      console.log('remove vote');
    } else {
      console.log(`comment vote with type ${type}`);
      submitVote({ commentId, postId, type, updateCache: updateCacheOnVote });
    }
  };
  return (
    <>
      <ActionIcon
        variant="transparent"
        size="sm"
        loading={voteCommentLoading}
        onClick={() => onVoteClick(VoteType.Upvote)}
      >
        <TiArrowSortedUp className={classes.arrow} />
      </ActionIcon>

      <Text weight={700} size="sm" color="gray">
        {commentVoteCount(votes)}
      </Text>

      <ActionIcon
        size="sm"
        loading={voteCommentLoading}
        onClick={() => onVoteClick(VoteType.Downvote)}
      >
        <TiArrowSortedDown className={classes.arrow} />
      </ActionIcon>
    </>
  );
}

export default CommentVotes;
