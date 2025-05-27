import { LogType } from './LogType'

export type LogData = {
	logType: LogType
	actorName: string
	message?: string
	details?: any // Depends on the log type
}
