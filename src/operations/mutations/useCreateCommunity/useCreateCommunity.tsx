import Router from 'next/router';

import { CommonNotificationParms, useCommonNotifications } from 'hooks';
import {
  useCreateCommunityMutation,
  CreateCommunityMutationFn,
} from 'operations';

type CreateCommunityParams = CommonNotificationParms & {
  createCommunityMutation: CreateCommunityMutationFn;
};

function create({
  createCommunityMutation,
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

  const createCommunity = create({
    createCommunityMutation: mutationFn,
    success,
    error,
  });

  return { createCommunity, loading };
}

export default useCreateCommunity;
