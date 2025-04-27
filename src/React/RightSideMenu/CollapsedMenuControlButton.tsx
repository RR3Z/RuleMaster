import React from 'react'
import styled from 'styled-components'

type CollapsedMenuControlProps = {
	id: string
	imgPath: string
	onClick: () => void
}

const StyledCollapsedMenuControlButton = styled.button`
	display: flex;
	justify-content: center;
	cursor: pointer;
	border: 2px solid black;
	border-radius: 3px;
	width: 100%;
	padding: 5px 3px;
`

export default function CollapsedMenuControlButton({
	id,
	imgPath,
	onClick,
}: CollapsedMenuControlProps) {
	return (
		<StyledCollapsedMenuControlButton id={id} onClick={onClick}>
			<img src={imgPath} width='15px' height='15px' />
		</StyledCollapsedMenuControlButton>
	)
}
