import { useReactiveVar } from '@apollo/client';
import { ActionIcon, Text, createStyles } from '@mantine/core';
import { TiArrowSortedUp, TiArrowSortedDown } from 'react-icons/ti';

import {
  RemoveVoteCacheUpdateParams,
  Vote,
  VoteCacheUpdateParams,
} from 'types';
import { VoteType } from 'graphql-generated';
import { useCheckUserInCommunity } from 'hooks';
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

const useStyles = createStyles((theme) => ({
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
  // const userVote = votes.find(({ voteUser }) => vote)
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

const handleOnClick = (e: React.MouseEvent, callback: () => void) => {
  callback();

  e.stopPropagation();
};

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
  const { removeVote, loading: removeVoteLoading } = useRemoveVote();
  const { vote: voteFn, loading: voteLoading } = useVote();
  const userId = useReactiveVar(userIdVar);
  const { isUserInCommunity } = useCheckUserInCommunity({
    title: communityName,
  });

  const onVoteClick = (type: VoteType) => {
    if (!userId || !isUserInCommunity) {
      console.log("you're not loggin in");
      return;
    }

    const vote = checkExistingVote({
      votes,
      userId,
      type,
    });

    if (vote) {
      const { id: voteId } = vote;
      console.log('remove  vote');
      removeVote({
        communityId,
        postId,
        voteId,
        communityName,
        updateCache: updateCacheOnRemove,
      });
    } else {
      console.log(`vote function with type ${type}`);
      voteFn({
        communityId,
        postId,
        type,
        communityName,
        updateCache: updateCacheOnVote,
      });
    }
  };

  const upVote = () => {
    onVoteClick(VoteType.Upvote);
  };

  const downVote = () => {
    onVoteClick(VoteType.Downvote);
  };

  const isLoading = removeVoteLoading || voteLoading;

  return (
    <>
      <ActionIcon
        size="sm"
        disabled={isLoading}
        onClick={(e: React.MouseEvent) => handleOnClick(e, upVote)}
      >
        <TiArrowSortedUp
          className={classes.arrow}
          // style={{ color: 'orange' }}
        />
      </ActionIcon>

      <Text weight={700} size="sm" color="gray">
        {voteCount(votes)}
      </Text>

      <ActionIcon
        size="sm"
        disabled={isLoading}
        onClick={(e: React.MouseEvent) => handleOnClick(e, downVote)}
      >
        <TiArrowSortedDown className={classes.arrow} />
      </ActionIcon>
    </>
  );
}

export default PostVotes;
