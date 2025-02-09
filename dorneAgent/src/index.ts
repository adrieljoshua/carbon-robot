import { Coordinates, EmissionResult } from "./types";
import { createEmissionAnalysisWorkflow } from "./workflow/emissionAnalysisWorkflow";
import { createPathPlanningWorkflow } from "./workflow/pathPlanningWorkflow";

async function main() {
  const location = {
    latitude: 37.7749,
    longitude: -122.4194,
  };
  const radius = 1000; // 1km

  try {
    console.log("Running path planning workflow...");
    const pathResult = await createPathPlanningWorkflow(location, radius);
    console.log("Path planning result:", pathResult);
    // Run path planning workflow

    console.log("\nRunning emission analysis workflow for each point...");
    const emissionPromises = createEmissionAnalysisWorkflow(
      pathResult as unknown as Coordinates
    );
    const emissionResults = await Promise.all(
      emissionPromises as unknown as Promise<EmissionResult>[]
    );
    console.log("Emission analysis results:", emissionResults);
  } catch (error) {
    console.error("Workflow failed:", error);
  }
}

main();
