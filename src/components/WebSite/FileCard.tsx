'use client' // Если этот файл уже 'use client', оставляем. Если нет - добавляем.
import styled from 'styled-components'
import { device } from '../InteractiveLessons/breakpoints'

const MainContainer = styled.div`
	background: #364156;
	border: 1px solid white;
	border-radius: 3px;
	width: 300px;
	height: 150px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
	gap: 20px;
	cursor: pointer;
`

const Name = styled.h1`
	font-size: 1.1rem;
	font-weight: bold;
	line-height: 1.3;

	@media ${device.sm} {
		font-size: 1.25rem;
	}
	@media ${device.lg} {
		font-size: 1.5rem;
	}
`

const ButtonText = styled.span`
	font-size: 1.25rem;
	border-bottom: 1px solid white;
`

type Props = {
	name: string
	link?: string
	downloadFile?: string
	downloadFileName?: string
}

export default function FileCard({
	name,
	link,
	downloadFile,
	downloadFileName,
}: Props) {
	const handleCardClick = () => {
		if (downloadFile) {
			const anchor = document.createElement('a')
			anchor.href = downloadFile
			anchor.download =
				downloadFileName || downloadFile.split('/').pop() || 'download'
			document.body.appendChild(anchor)
			anchor.click()
			document.body.removeChild(anchor)
		} else if (link) {
			console.warn(
				'Card: No download file specified, and link prop might need <Link> component for navigation.'
			)
		}
	}

	return (
		<MainContainer onClick={handleCardClick}>
			<Name>{name}</Name>
			<ButtonText>Скачать файл</ButtonText>
		</MainContainer>
	)
}
