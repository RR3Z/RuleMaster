import styled from 'styled-components'

export const Dialog = styled.dialog`
	margin: auto auto;
	min-width: 40vw;
	max-width: 40vw;
	min-height: 80vh;
	max-height: 80vh;
	border-radius: 5px;
	background: none;
	color: white;
`

export const DialogHeader = styled.header`
	background: #364156;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 5px 15px;
	color: white;
	font-size: 1.5rem;
	font-weight: 600;
	position: sticky;
	top: 0;
`

export const DialogHeaderButton = styled.button`
	cursor: pointer;
`

export const DialogBody = styled.div`
	background: #212d40;
	width: 100%;
	min-height: 50vh;
	padding: 15px;
`

export const DialogFooter = styled.footer`
	width: 100%;
	height: 40px;
	position: sticky;
	bottom: 0;
	display: flex;
	flex-direction: row;
`

export const FooterDialogCloseButton = styled.button`
	width: 100%;
	background: #364156;
	border-radius: 0;
	cursor: pointer;
	color: white;
	font-size: 1.2rem;
	font-weight: 600;

	&:hover {
		background: #2d3647;
	}
`

export const FooterDialogAddButton = styled.button`
	width: 100%;
	background: #214e34;
	border-radius: 0;
	cursor: pointer;
	color: white;
	font-size: 1.2rem;
	font-weight: 600;

	&:hover {
		background: #1c422c;
	}
`

export const HorizontalLine = styled.hr`
	border: none;
	height: 2px;
	background-color: #364156;
	margin-top: 10px;
`

export const ClassGeneralInfo = styled.div`
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	gap: 10px;
`

export const ClassTitle = styled.h4`
	font-size: 1.35rem;
	font-weight: 700;
`

export const ClassDescription = styled.span`
	display: inline-block;
	font-size: 1rem;
	margin-top: 15px;
`

export const ClassFeatures = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 15px;
	font-size: 0.9rem;
`
