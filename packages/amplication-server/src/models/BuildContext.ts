import { CodeGenInput } from "./CodeGenInput"

export interface BuildContext {
	buildId: string,
	resourceId: string,
	projectId: string,
	data: CodeGenInput
}