import React from 'react'
import styled from 'styled-components'

const Button = styled.button`
	min-width: 20px;
	min-height: 20px;
	background: none;
	border: none;
	cursor: pointer;
	background-image: url('/assets/button/messageBoxButton.png');
	background-size: cover;
	background-position: center;
	position: absolute;
	bottom: 10px;
	right: 10px;
`

export default function MessageBoxButton({ id }: { id: string }) {
	return (
		<>
			<Button id={id}></Button>
		</>
	)
}
