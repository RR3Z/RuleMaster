export default abstract class Logger {
	protected _maxLogsNumber: number = 50

	public abstract newLog(data: any): void
	public abstract clear(): void
}
