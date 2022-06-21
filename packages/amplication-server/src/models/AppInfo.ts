import { AppSettingsValues } from "src/core/appSettings/constants";


export type AppInfo = {
    name: string;
    description: string;
    version: string;
    id: string;
    url: string;
    settings: AppSettingsValues;
};