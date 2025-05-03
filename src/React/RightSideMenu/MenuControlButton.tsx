import React from 'react'
import styled from 'styled-components'

type MenuControlButtonProps = {
	id: string
	imgPath: string
	onClick?: () => void
}

const StyledMenuControlButton = styled.button`
	display: flex;
	justify-content: center;
	cursor: pointer;
	border: 2px solid black;
	border-bottom: none;
	border-top-left-radius: 3px;
	border-top-right-radius: 3px;
	width: 100%;
	padding: 5px 3px;
`

export default function MenuControlButton({
	id,
	imgPath,
	onClick,
}: MenuControlButtonProps) {
	return (
		<StyledMenuControlButton id={id} onClick={onClick}>
			<img src={imgPath} width='20px' height='20px' />
		</StyledMenuControlButton>
	)
}
