import { useApolloMetadataClient } from '@/object-metadata/hooks/useApolloMetadataClient';
import { COMPUTE_SERVERLESS_FUNCTION_INPUT_SCHEMA } from '@/workflow/graphql/mutations/computeServerlessFunctionInputSchema';
import { ApolloClient, useMutation } from '@apollo/client';

import {
  ComputeServerlessFunctionInputSchemaInput,
  ComputeServerlessFunctionInputSchemaMutation,
  ComputeServerlessFunctionInputSchemaMutationVariables,
} from '~/generated/graphql';

export const useComputeFunctionInputSchema = () => {
  const apolloMetadataClient = useApolloMetadataClient();
  const [mutate] = useMutation<
    ComputeServerlessFunctionInputSchemaMutation,
    ComputeServerlessFunctionInputSchemaMutationVariables
  >(COMPUTE_SERVERLESS_FUNCTION_INPUT_SCHEMA, {
    client: apolloMetadataClient ?? ({} as ApolloClient<any>),
  });

  const computeServerlessFunctionInputSchema = async (
    input: ComputeServerlessFunctionInputSchemaInput,
  ) => {
    return await mutate({ variables: { input } });
  };

  return { computeServerlessFunctionInputSchema };
};
