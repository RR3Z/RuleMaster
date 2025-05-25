import { X } from 'lucide-react'
import styled from 'styled-components'

export const Dialog = styled.dialog`
	margin: auto auto;
	width: 60vw;
	max-height: 80vh;
	border-radius: 5px;
	background: none;
	color: white;
	padding: 0;
	overflow: visible;
`

export const DialogInner = styled.div`
	width: 100%;
	max-height: 80vh;
	display: flex;
	flex-direction: column;
	overflow: hidden;
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
	z-index: 10;
`

export const DialogHeaderButton = styled.button`
	cursor: pointer;
	padding: 0;
	min-width: 30px;
	min-height: 30px;
`

export const XIcon = styled(X)`
	width: 100%;
	height: 100%;
`

export const DialogBody = styled.div`
	background: #212d40;
	width: 100%;
	padding: 15px;
	overflow-y: auto;
	flex-grow: 1;

	scrollbar-gutter: stable;
	&::-webkit-scrollbar {
		width: 8px;
	}

	&::-webkit-scrollbar-track {
		background: #212d40;
	}

	&::-webkit-scrollbar-thumb {
		background: #4a5568;
		border-radius: 2px;
	}
`

export const DialogFooter = styled.footer`
	width: 100%;
	height: 40px;
	position: sticky;
	bottom: 0;
	display: flex;
	flex-direction: row;
	background: #364156;
	z-index: 10;
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

export const Img = styled.div`
	position: relative;
	min-width: 120px;
	aspect-ratio: 1 / 1;
`

export const GeneralInfo = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	gap: 20px;
`

export const GeneralLeft = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
`

export const Name = styled.span`
	font-size: 1.5rem;
	font-weight: bold;
`

export const Description = styled.span`
	font-size: 1rem;
`

export const Features = styled.span`
	display: block;
	font-size: 0.9rem;
	margin-top: 10px;
`

export const HR = styled.hr`
	border: none;
	height: 2px;
	background-color: #364156;
	margin: 10px 0px;
`

export const TraitsContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
`
