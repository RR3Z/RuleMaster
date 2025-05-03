import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
	display: inline-block;
	padding: 5px 10px;
	background-color: #f9f8ea;
	color: #000000;
	// font-family: 'Times New Roman', Times, serif;
	font-size: 18px;
	text-align: center;
	border: 1px solid #b5b3a4;
	border-radius: 5px;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
	cursor: pointer;
	transition: all 0.2s ease;

	&:hover {
		background-color: #dbdbc7;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
	}

	&:active {
		background-color: #e8e6cb;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
		transform: translateY(1px);
	}
`

export type CustomMenuButtonProps = {
	text: string
	onClick?: () => void
}

export default function CustomMenuButton({
	text,
	onClick,
}: CustomMenuButtonProps) {
	return (
		<StyledButton className='customMenuButton' onClick={() => onClick?.()}>
			{text}
		</StyledButton>
	)
}
