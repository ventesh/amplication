import { AppInfo } from "./AppInfo";
import { AppRole } from "./AppRole";
import { Entity } from "./Entity";



export class CodeGenInput {
    roles: AppRole[];
    entities: Entity[];
    appInfo: AppInfo;
}