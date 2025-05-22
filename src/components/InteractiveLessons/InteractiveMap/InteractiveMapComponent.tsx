import { useEffect, useRef } from 'react'
import styled from 'styled-components'

const MainContainer = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	z-index: 0;
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

		canvas.style.width = '100%'
		canvas.style.height = '100%'

		container.appendChild(canvas)

		return () => {
			if (container && container.contains(canvas)) {
				container.removeChild(canvas)
			}
		}
	}, [canvas])

	return <MainContainer ref={containerRef} id='interactiveMapContainer' />
}
