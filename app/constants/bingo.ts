const roundHistoryStatus = {
    STARTED: 'started',
    FINISHED: 'finished',
} as const
type RoundHistoryStatus = typeof roundHistoryStatus[keyof typeof roundHistoryStatus]

// history value
const roundHistoryDataValue = {
    CREATED: 'created',
    FINISHED: 'finished',
    DELETED: 'deleted',
    JOIN: 'join',
}
type RoundHistoryDataValue = typeof roundHistoryDataValue[keyof typeof roundHistoryDataValue]

const roundHistoryType = {
    STATUS_UPDATED: 'statusUpdated',
    ROLL_NUMBER: 'rollNumber',
    USER_ACTIONS: 'userAction',
}
type RoundHistoryType = typeof roundHistoryType[keyof typeof roundHistoryType]


export {
    roundHistoryStatus,
    type RoundHistoryStatus,
    roundHistoryDataValue,
    type RoundHistoryDataValue,
    roundHistoryType,
    type RoundHistoryType
}
