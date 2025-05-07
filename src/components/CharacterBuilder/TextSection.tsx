'use client'
import sanitizeHtml from 'sanitize-html'
import styled from 'styled-components'

const StyledDescription = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
`

const Title = styled.h3`
	font-size: 1.5rem;
	font-weight: 600;
	margin-bottom: 10px;
`

const Text = styled.p`
	font-size: 1rem;
	font-weight: 400;
`

type DescriptionProps = {
	title: string
	text: string
}

export default function TextSection({ title, text }: DescriptionProps) {
	return (
		<StyledDescription>
			<Title>{title}</Title>
			<Text dangerouslySetInnerHTML={{ __html: sanitizeHtml(text) }} />
		</StyledDescription>
	)
}
