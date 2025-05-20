import { DNDLogType } from './DNDLogType'

export type DNDLogData = {
	type: DNDLogType
	actorName: string
	details?: any // Depends on the log type
}
