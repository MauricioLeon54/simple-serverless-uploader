export type Config = {
  /**
   * Project name used for display, logging, or tagging resources.
   */
  projectName: string;

  /**
   * List of valid deployment stages (e.g. ['dev', 'staging', 'prod']).
   * These must be lowercase.
   */
  stages: Array<Lowercase<string>>;

  /**
   * Optional: The stage considered as production (e.g. 'prod').
   * Useful for applying special rules or restrictions during deployment.
   */
  productionStage?: string;

  /**
   * Path to the main Serverless Framework configuration file.
   * Must be a YAML file (e.g. 'serverless.yml').
   */
  serverlessFile: `${string}.yml`;

  /**
   * Optional: Whether Git-based validations or operations are enabled.
   * If true, the CLI may check Git status, branch, etc.
   */
  gitImplementationEnabled?: boolean;

  /**
   * Optional: The main Git branch used for production deployments (e.g. 'main' or 'master').
   * Only relevant if gitImplementationEnabled is true.
   */
  mainGitBranch?: string;
};
