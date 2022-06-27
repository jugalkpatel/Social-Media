import { useState } from 'react';
import { Tabs } from '@mantine/core';
import { CgToday } from 'react-icons/cg';
import { AiOutlineStock } from 'react-icons/ai';

type Props = {
  byVotes: React.ReactNode;
  byTime: React.ReactNode;
};

function Popular({ byVotes, byTime }: Props) {
  const [filter, setFilter] = useState(0);

  return (
    <Tabs active={filter} onTabChange={setFilter} variant="pills" grow>
      <Tabs.Tab label="NEW" icon={<CgToday size={16} />}>
        {byTime}
      </Tabs.Tab>
      <Tabs.Tab label="TOP" icon={<AiOutlineStock size={16} />}>
        {byVotes}
      </Tabs.Tab>
    </Tabs>
  );
}

// function updateCacheOnVote({ cache, postId, newVote }: VoteCacheUpdateParams) {
//   const data = cache.readQuery<FetchAllPostsQuery, FetchAllPostsQueryVariables>(
//     {
//       query: FetchAllPostsDocument,
//       variables: { take: NO_OF_POSTS_AT_A_TIME },
//     },
//   );

//   if (
//     data &&
//     data?.fetchAllPosts &&
//     data.fetchAllPosts.__typename === 'BatchPosts'
//   ) {
//     const { posts } = data.fetchAllPosts;

//     const isVoteExist = !!posts.find((post) => {
//       if (post.id === postId) {
//         const checkVote = post.votes.find((vote) => vote.id === newVote.id);

//         return !!checkVote;
//       }
//       return false;
//     });

//     if (!isVoteExist) {
//       cache.writeQuery<FetchAllPostsQuery, FetchAllPostsQueryVariables>({
//         query: FetchAllPostsDocument,
//         variables: { take: NO_OF_POSTS_AT_A_TIME },
//         data: {
//           fetchAllPosts: {
//             ...data.fetchAllPosts,
//             posts: posts.map((post) => {
//               if (post.id === postId) {
//                 const updatedVotes = post.votes.concat(newVote);

//                 return { ...post, votes: updatedVotes };
//               }

//               return post;
//             }),
//           },
//         },
//       });
//     }

//     return;
//   }

//   if (
//     data &&
//     data?.fetchAllPosts &&
//     data.fetchAllPosts.__typename === 'CommonError'
//   ) {
//     throw new Error(data.fetchAllPosts.message);
//   }
// }

// function updateCacheOnRemove({
//   cache,
//   deletedVoteId,
//   postId,
// }: RemoveVoteCacheUpdateParams) {
//   const data = cache.readQuery<FetchAllPostsQuery, FetchAllPostsQueryVariables>(
//     {
//       query: FetchAllPostsDocument,
//       variables: { take: NO_OF_POSTS_AT_A_TIME },
//     },
//   );

//   if (
//     data &&
//     data?.fetchAllPosts &&
//     data.fetchAllPosts.__typename === 'CommonError'
//   ) {
//     throw new Error(data.fetchAllPosts.message);
//   }

//   if (
//     data &&
//     data?.fetchAllPosts &&
//     data.fetchAllPosts.__typename === 'BatchPosts'
//   ) {
//     const { posts } = data.fetchAllPosts;

//     if (posts.length) {
//       cache.writeQuery<FetchAllPostsQuery, FetchAllPostsQueryVariables>({
//         query: FetchAllPostsDocument,
//         variables: { take: NO_OF_POSTS_AT_A_TIME },
//         data: {
//           fetchAllPosts: {
//             ...data.fetchAllPosts,
//             posts: posts.map((post) => {
//               if (post.id === postId) {
//                 const updatedVotes = post.votes.filter(
//                   ({ id }) => id !== deletedVoteId,
//                 );

//                 return { ...post, votes: updatedVotes };
//               }

//               return post;
//             }),
//           },
//         },
//       });

//       return;
//     }

//     throw new Error();
//   }

//   throw new Error();
// }

export default Popular;
