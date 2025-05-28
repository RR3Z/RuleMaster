'use client'
import { LogData } from '@/InteractiveLessons/Logger/LogData'
import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import LogEntry from './LogEntry'

const MainContainer = styled.div`
	flex-grow: 1;
	margin: 5px 0 5px 5px;
	border-radius: 3px;
	color: white;
	display: flex;
	flex-direction: column;
	overflow-y: auto;
	padding: 10px;

	&::-webkit-scrollbar {
		width: 8px;
	}
	&::-webkit-scrollbar-thumb {
		background-color: #596273;
		border-radius: 4px;
	}
	&::-webkit-scrollbar-track {
		background: #2c2c2c;
	}
`

type Props = {
	initialLogs?: LogData[]
	isActive?: boolean
}

export default function LogsTab({ initialLogs, isActive }: Props) {
	const [logs, setLogs] = useState<LogData[]>(initialLogs || [])
	const logsEndRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		setLogs(initialLogs || [])
	}, [initialLogs])

	useEffect(() => {
		logsEndRef.current?.scrollIntoView({ behavior: 'smooth' })
	}, [logs, isActive])

	return (
		<MainContainer id='logsTab'>
			{logs.length === 0 && (
				<p style={{ textAlign: 'center', color: '#aaa' }}>
					Нет логов для отображения.
				</p>
			)}
			{logs.map((log, index) => (
				<LogEntry key={index} log={log} />
			))}
			<div ref={logsEndRef} />
		</MainContainer>
	)
}
