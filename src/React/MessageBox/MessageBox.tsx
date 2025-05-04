import React from 'react'
import styled from 'styled-components'
import MessageBoxButton from './MessageBoxButton'

const MessageBoxContainer = styled.div`
	z-index: 1000;
	background-color: gray;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	padding: 10px;
	display: flex;
	visibility: hidden;

	#tutorialText {
		color: black;
		font-family: 'Courier New', Courier, monospace;
		font-size: 20px;
		margin-bottom: 30px;
	}
`

export default function MessageBox() {
	return (
		<MessageBoxContainer id='tutorialMessageBox'>
			<span id='tutorialText'>*empty*</span>
			<MessageBoxButton id='messageBoxCloseBtn' />
			<MessageBoxButton id='messageBoxNextBtn' />
		</MessageBoxContainer>
	)
}
