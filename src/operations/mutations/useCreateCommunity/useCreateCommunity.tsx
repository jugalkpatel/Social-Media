import Router from 'next/router';

import { UserCommunity } from 'types';
import { CommonNotificationParms, useCommonNotifications } from 'hooks';
import {
  useCreateCommunityMutation,
  CreateCommunityMutationFn,
  addCommunity,
} from 'operations';
import { userCommunitiesVar } from 'lib';

type CreateCommunityParams = CommonNotificationParms & {
  createCommunityMutation: CreateCommunityMutationFn;
  updateLocalCommunities: (newCommunity: UserCommunity) => void;
};

function create({
  createCommunityMutation,
  updateLocalCommunities,
  success,
  error: showError,
}: CreateCommunityParams) {
  return async ({
    name,
    description,
  }: {
    name: string;
    description: string;
  }) => {
    try {
      const { data } = await createCommunityMutation({
        variables: { name, description },
      });

      if (
        data &&
        data?.createCommunity &&
        data.createCommunity.__typename === 'CommonError'
      ) {
        throw new Error(data.createCommunity.message);
      }

      if (
        data &&
        data?.createCommunity &&
        data.createCommunity.__typename === 'Community'
      ) {
        const { id, title } = data.createCommunity;

        updateLocalCommunities({ __typename: 'Community', id });

        success('community created sucessfully');

        Router.push(`/c/${title}`);

        return;
      }

      throw new Error();
    } catch (error) {
      const errorMessage = error?.message || 'something went wrong!';

      showError(errorMessage);
    }
  };
}

function useCreateCommunity() {
  const [mutationFn, { loading }] = useCreateCommunityMutation();
  const { success, error } = useCommonNotifications();
  const updateLocalCommunities = addCommunity(userCommunitiesVar);

  const createCommunity = create({
    createCommunityMutation: mutationFn,
    updateLocalCommunities,
    success,
    error,
  });

  return { createCommunity, loading };
}

export default useCreateCommunity;
