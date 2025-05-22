import { useEffect, useRef } from 'react'
import styled from 'styled-components'

const MainContainer = styled.div`
	position: relative;
	overflow: hidden;
	flex-grow: 1;
`

type Props = {
	canvas: HTMLCanvasElement
}

export default function InteractiveMapComponent({ canvas }: Props) {
	const containerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const container = containerRef.current
		if (!container) return

		container.appendChild(canvas)

		return () => {
			container.removeChild(canvas)
		}
	}, [canvas])

	return <MainContainer ref={containerRef} id='interactiveMapContainer' />
}
