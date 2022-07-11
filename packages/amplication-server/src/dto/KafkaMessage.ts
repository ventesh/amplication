

export interface Headers {
}

export interface BatchContext {
    firstOffset: string;
    firstTimestamp: string;
    partitionLeaderEpoch: number;
    inTransaction: boolean;
    isControlBatch: boolean;
    lastOffsetDelta: number;
    producerId: string;
    producerEpoch: number;
    firstSequence: number;
    maxTimestamp: string;
    timestampType: number;
    magicByte: number;
}

export interface KafkaMessage {
    magicByte: number;
    attributes: number;
    timestamp: string;
    offset: string;
    key?: any;
    value: any;
    headers: Headers;
    isControlRecord: boolean;
    batchContext: BatchContext;
    topic: string;
    partition: number;
}