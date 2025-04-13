import type { DeploymentType } from 'src/constants/DeploymentType';

export async function deployProject(deployProject: DeployProjectRequest) {
  //
}

export type DeployProjectRequest = {
  type: DeploymentType;
  stage: string;
};
