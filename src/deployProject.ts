import type { DeploymentType } from 'src/constants/DeploymentType';

export async function deployProject(deployProject: DeployProjectRequest) {
  console.log(`Starting deploy for project ${deployProject.projectName} 🚀`);
}

export type DeployProjectRequest = {
  type: DeploymentType;
  stage: string;
  projectName: string;
};
