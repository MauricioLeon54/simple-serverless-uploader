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
   * Path to the main Serverless Framework configuration file.
   * Must be a YAML file (e.g. 'serverless.yml').
   */
  serverlessFile: `${string}.yml`;
};
