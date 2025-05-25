import { TextData } from '@/types/CharacterLesson/TextData'
import sanitizeHtml from 'sanitize-html'
import styled from 'styled-components'

const MainContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-self: flex-start;
	width: 100%;
`

const Title = styled.h3`
	font-size: 1.5rem;
	font-weight: 600;
	margin-bottom: 10px;

	@media (max-width: 2560px) {
		font-size: 2.3rem;
	}

	@media (max-width: 1920px) {
		font-size: 1.5rem;
	}

	@media (max-width: 1280px) {
		font-size: 1.3rem;
	}

	@media (max-width: 1024px) {
		font-size: 1.2rem;
	}
`

const Text = styled.div`
	display: block;
	font-size: 1rem;
	font-weight: 400;

	ul {
		padding-left: 1.2em;
		list-style-type: disc;
	}

	@media (max-width: 2560px) {
		font-size: 1.7rem;
	}

	@media (max-width: 1920px) {
		font-size: 1rem;
	}

	@media (max-width: 1280px) {
		font-size: 1rem;
	}

	@media (max-width: 1024px) {
		font-size: 0.9rem;
	}
`

export type Props = {
	data: TextData
}

export default function TextSection({ data }: Props) {
	return (
		<MainContainer>
			<Title>{data.title}</Title>
			<Text dangerouslySetInnerHTML={{ __html: sanitizeHtml(data.text) }} />
		</MainContainer>
	)
}
