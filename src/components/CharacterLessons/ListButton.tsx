import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import styled from 'styled-components'

const Button = styled.button`
	width: 100%;
	max-height: 60px;
	display: flex;
	box-sizing: border-box;
	justify-content: space-between;
	flex-direction: row;
	align-items: center;
	padding: 8px 10px;
	border: 1px solid whitesmoke;
	border-radius: 5px;
	background: #212d40;
	cursor: pointer;
	font-size: 1.5rem;
	transition: background 0.2s ease, opacity 0.2s ease;

	&:hover {
		background: #0c1b35;
	}

	&:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	&:disabled:hover {
		background: #212d40;
	}
`

const MainContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 20px;
`

const ImageContainer = styled.div`
	position: relative;
	min-width: 42px;
	min-height: 42px;
`

type Props = {
	image?: string
	imageAlt?: string
	text: string
	onClick?: () => void
	activity: boolean
}

export default function ListButton({
	image,
	imageAlt,
	text,
	onClick,
	activity,
}: Props) {
	return (
		<Button onClick={onClick} disabled={!activity}>
			<MainContainer>
				{image ? (
					<ImageContainer>
						<Image
							src={image}
							alt={imageAlt ? imageAlt : 'button-image'}
							fill
							sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
							style={{ objectFit: 'contain' }}
							priority
						/>
					</ImageContainer>
				) : undefined}

				<b>{text}</b>
			</MainContainer>
			<ChevronRight />
		</Button>
	)
}
