import React from 'react'
import styled from 'styled-components'

export type ActionButtonProps = {
	text: string
}

const StyledActionButton = styled.button`
	min-width: 64px;
	min-height: 64px;
	color: white;
	border: 1px solid #ffffff;
	border-radius: 3px;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	position: relative;

	&:hover {
		border: 1px solid #ff2121;
	}
`

export default function ActionButton({ text }: ActionButtonProps) {
	// TODO: передавать сюда данные, что должна кнопка делать и отключать неиспользуемые кнопки
	// TODO: text временное решение - заменить на картинки
	return (
		<StyledActionButton className='actionButton'>{text}</StyledActionButton>
	)
}
