import { Post } from 'types';
import { voteCount } from 'lib';

function topFilter(posts: Array<Post>): Array<Post> {
  const postsForSort = [...posts];

  const filteredPosts = postsForSort.sort((current, next) => {
    if (voteCount(current.votes) > voteCount(next.votes)) {
      return -1;
    }
    if (voteCount(current.votes) < voteCount(next.votes)) {
      return 1;
    }
    return 0;
  });

  return filteredPosts;
}

function timeFilter(posts: Array<Post>): Array<Post> {
  const postsForSort = [...posts];

  const today = Date.now();

  const filteredPosts = postsForSort.sort((current, next) => {
    const currentPostTime = today - Date.parse(current.createdAt);
    const nextPostTime = today - Date.parse(next.createdAt);

    if (currentPostTime < nextPostTime) {
      return -1;
    }

    if (nextPostTime < currentPostTime) {
      return 1;
    }

    return 0;
  });

  return filteredPosts;
}

export { topFilter, timeFilter };
