import { Observable, Subject } from 'rxjs'
import { LogData } from './LogData'

export default class Logger {
	protected readonly _logs: LogData[]

	protected readonly _onNewLog$: Subject<LogData>

	constructor() {
		this._logs = []
		this._onNewLog$ = new Subject<LogData>()
	}

	public get onNewLog$(): Observable<LogData> {
		return this._onNewLog$.asObservable()
	}

	public get logs(): LogData[] {
		return this._logs
	}

	public newLog(data: LogData): void {
		this._logs.push(data)
		this._onNewLog$.next(data)
	}

	public clear(): void {
		this._logs.splice(0, this._logs.length)
	}
}
