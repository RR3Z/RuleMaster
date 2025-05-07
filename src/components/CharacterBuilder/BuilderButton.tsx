'use client'
import styled from 'styled-components'

const Button = styled.button`
	cursor: pointer;
	background: #364156;
	font-size: 1.15rem;
	font-weight: 500;
	line-height: 1;
	vertical-align: middle;
	padding: 7px 9px;
`

type BuilderButtonProps = {
	name: string
	id: string
	onClick: () => void
}

export default function BuilderButton({
	name,
	id,
	onClick,
}: BuilderButtonProps) {
	return (
		<Button id={id} onClick={onClick}>
			{name}
		</Button>
	)
}
