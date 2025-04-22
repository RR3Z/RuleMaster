import React from 'react'
import styled from 'styled-components'

const StyledOverlay = styled.div`
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.6);
	position: absolute;
	top: 0;
	left: 0;
	z-index: 999;
`

export function Overlay() {
	return <StyledOverlay id='overlay'></StyledOverlay>
}
