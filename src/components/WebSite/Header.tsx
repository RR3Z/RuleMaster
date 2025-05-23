'use client'
import Link from 'next/link'
import styled from 'styled-components'

const StyledHeader = styled.header`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	background: #868686;
	width: 100vw;
	height: 80px;
`

export default function Header() {
	return (
		<StyledHeader>
			<Link href='/dnd/battle/1'>Lesson</Link>
		</StyledHeader>
	)
}
