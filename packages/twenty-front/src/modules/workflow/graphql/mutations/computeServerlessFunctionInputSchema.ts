import { gql } from '@apollo/client';

export const COMPUTE_SERVERLESS_FUNCTION_INPUT_SCHEMA = gql`
  mutation ComputeServerlessFunctionInputSchema(
    $input: ComputeServerlessFunctionInputSchemaInput!
  ) {
    computeServerlessFunctionInputSchema(input: $input)
  }
`;
