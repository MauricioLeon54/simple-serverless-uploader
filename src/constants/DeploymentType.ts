/**
 * @prettier
 */
export const DeploymentTypes = {
  S3_WEBSITE: 's3-website',
  LAMBDA_SERVER: 'lambda-server',
} as const;

export type DeploymentType = (typeof DeploymentTypes)[keyof typeof DeploymentTypes];
