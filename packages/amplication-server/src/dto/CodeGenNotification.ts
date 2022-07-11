import { KafkaMessage } from './KafkaMessage';

export interface Cache {
  type: string;
}

export interface Source {
  location: string;
  type: string;
}

export interface Environment {
  image: string;
  privilegedMode: boolean;
  imagePullCredentialsType: string;
  computeType: string;
  type: string;
  environmentVariables: any[];
}

export interface Logs {
  groupName: string;
  streamName: string;
  deepLink: string;
}

export interface Phase {
  phaseContext: string[];
  startTime: string;
  endTime: string;
  durationInSeconds: number;
  phaseType: string;
  phaseStatus: string;
}

export interface Artifact {
  md5sum: string;
  sha256sum: string;
  location: string;
}

export interface AdditionalInformation {
  cache: Cache;
  buildNumber: number;
  timeoutInMinutes: number;
  buildComplete: boolean;
  initiator: string;
  buildStartTime: string;
  source: Source;
  artifact: Artifact;
  environment: Environment;
  logs: Logs;
  phases: Phase[];
  queuedTimeoutInMinutes: number;
}

export interface CodeBuildBuildPhaseChangeDetail {
  completedPhase: string;
  projectName: string;
  buildId: string;
  completedPhaseContext: string;
  additionalInformation: AdditionalInformation;
  completedPhaseStatus: string;
  completedPhaseDurationSeconds: number;
  version: string;
  completedPhaseStart: string;
  completedPhaseEnd: string;
}

export interface CodeBuildBuildStateChangeDetail {
  buildStatus: string;
  projectName: string;
  buildId: string;
  additionalInformation: AdditionalInformation;
  currentPhase: string;
  currentPhaseContext: string;
  version: string;
}

export interface AdditionalAttributes {}

export interface CodeGenNotificationMessage {
  account: string;
  detailType: string;
  region: string;
  source: string;
  time: Date;
  notificationRuleArn: string;
  detail: CodeBuildBuildPhaseChangeDetail | CodeBuildBuildStateChangeDetail;
  resources: string[];
  additionalAttributes: AdditionalAttributes;
}

export interface CodeGenNotificationValue {
  Type: string;
  MessageId: string;
  TopicArn: string;
  Message: string;
  Timestamp: Date;
  SignatureVersion: string;
  Signature: string;
  SigningCertURL: string;
  UnsubscribeURL: string;
}

export interface CodeGenNotification extends KafkaMessage {
  value: CodeGenNotificationValue
}
