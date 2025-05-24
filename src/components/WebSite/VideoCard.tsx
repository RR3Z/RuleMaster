import Image from 'next/image'
import styled from 'styled-components'

const Wrapper = styled.a`
	width: 350px;
	height: auto;
	display: flex;
	flex-direction: column;
	background: #364156;
	border-radius: 8px;
	overflow: hidden;
`

const ImageContainer = styled.div`
	position: relative;
	width: 100%;
	aspect-ratio: 4 / 3;
`

const TextContent = styled.div`
	font-size: 1.1rem;
	padding: 10px 7px;
	margin: 0;
	line-height: 1.4;
	display: flex;
	flex-direction: column;
	justify-content: start;
	flex-grow: 1;
`

const AuthorLine = styled.span`
	display: block;
	margin-bottom: 8px;
`

const VideoNameLine = styled.span`
	display: block;
`

type Props = {
	videoID: string
	videoName: string
	authorName: string
}

export default function VideoCard({ videoID, videoName, authorName }: Props) {
	return (
		<Wrapper
			href={`https://www.youtube.com/watch?v=${videoID}`}
			target='_blank'
			rel='noopener noreferrer'
		>
			<ImageContainer>
				<Image
					src={`https://img.youtube.com/vi/${videoID}/hqdefault.jpg`}
					alt={videoName || 'YouTube video thumbnail'}
					fill
					style={{ objectFit: 'cover' }}
				/>
			</ImageContainer>
			<TextContent>
				<AuthorLine>
					<b>Автор:</b> {authorName}
				</AuthorLine>
				<VideoNameLine>
					<b>Название:</b> {videoName}
				</VideoNameLine>
			</TextContent>
		</Wrapper>
	)
}
