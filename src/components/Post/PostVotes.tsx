import { useReactiveVar } from '@apollo/client';
import { ActionIcon, Text, createStyles } from '@mantine/core';
import { useModals } from '@mantine/modals';
import { TiArrowSortedUp, TiArrowSortedDown } from 'react-icons/ti';

import {
  RemoveVoteCacheUpdateParams,
  Vote,
  VoteCacheUpdateParams,
} from 'types';
import { VoteType } from 'graphql-generated';
import { useCheckUserInCommunity, useCommonNotifications } from 'hooks';
import { useRemoveVote, useVote } from 'operations';
import { userIdVar, voteCount } from 'lib';

type Props = {
  data: {
    votes: Array<Vote>;
    postId: string;
    communityId: string;
    communityName: string;
    updateCacheOnRemove: (args: RemoveVoteCacheUpdateParams) => void;
    updateCacheOnVote: (args: VoteCacheUpdateParams) => void;
  };
};

const useStyles = createStyles((_theme) => ({
  arrow: {
    color: 'grey',
    fontSize: '20px',
  },
}));

function checkExistingVote({
  votes,
  userId,
  type,
}: {
  votes: Array<Vote>;
  userId: string;
  type: VoteType;
}) {
  const userVote = votes.length
    ? votes.find((voteItem) => {
        if (
          voteItem.type === type &&
          voteItem.voteUser &&
          voteItem.voteUser.id === userId
        ) {
          return true;
        }

        return false;
      })
    : null;

  return userVote;
}

function PostVotes({
  data: {
    votes,
    postId,
    communityId,
    communityName,
    updateCacheOnRemove,
    updateCacheOnVote,
  },
}: Props) {
  const { classes } = useStyles();
  const { error } = useCommonNotifications();
  const { removeVote, loading: removeVoteLoading } = useRemoveVote();
  const { vote: voteFn, loading: voteLoading } = useVote();
  const userId = useReactiveVar(userIdVar);
  const modals = useModals();
  const { isUserInCommunity } = useCheckUserInCommunity({
    communityId,
  });
  const isUpvoted = checkExistingVote({ votes, userId, type: VoteType.Upvote });
  const isDownvoted = checkExistingVote({
    votes,
    userId,
    type: VoteType.Downvote,
  });

  const isLoading = removeVoteLoading || voteLoading;

  const handleClick = (type: VoteType) => {
    return async (e: React.MouseEvent) => {
      e.stopPropagation();

      if (!userId) {
        modals.openContextModal('LOGIN', { innerProps: {} });
        return;
      }

      if (!isUserInCommunity) {
        error("You're not a member of this community");
        return;
      }
      const vote = checkExistingVote({ votes, userId, type });

      if (vote) {
        const { id: voteId } = vote;
        removeVote({
          communityId,
          postId,
          voteId,
          communityName,
          updateCache: updateCacheOnRemove,
        });
      } else {
        voteFn({
          communityId,
          postId,
          type,
          communityName,
          updateCache: updateCacheOnVote,
        });
      }
    };
  };

  const onUpvoteClick = handleClick(VoteType.Upvote);
  const onDownvoteClick = handleClick(VoteType.Downvote);
  return (
    <>
      <ActionIcon size="sm" disabled={isLoading} onClick={onUpvoteClick}>
        <TiArrowSortedUp
          className={classes.arrow}
          style={isUpvoted ? { color: 'orange' } : null}
        />
      </ActionIcon>

      <Text weight={700} size="sm" color="gray">
        {voteCount(votes)}
      </Text>

      <ActionIcon size="sm" disabled={isLoading} onClick={onDownvoteClick}>
        <TiArrowSortedDown
          className={classes.arrow}
          style={isDownvoted ? { color: 'orange' } : null}
        />
      </ActionIcon>
    </>
  );
}

export default PostVotes;
