import { useEffect, useRef } from 'react'
import styled from 'styled-components'

const MainContainer = styled.div<{ $isActive: boolean }>`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 1;
	display: block;
	overflow: hidden;
	flex-grow: 1;
	visibility: ${$isActive => ($isActive ? 'hidden' : 'visible')};
`

type Props = {
	isActive: boolean
	canvas: HTMLCanvasElement
}

export default function DiceRollerComponent({ canvas, isActive }: Props) {
	const containerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const container = containerRef.current
		if (!container) return

		canvas.style.width = '100%'
		canvas.style.height = '100%'

		container.appendChild(canvas)

		return () => {
			if (container && container.contains(canvas)) {
				container.removeChild(canvas)
			}
		}
	}, [])

	return (
		<MainContainer
			ref={containerRef}
			id='diceRollerContainer'
			$isActive={isActive}
		/>
	)
}
