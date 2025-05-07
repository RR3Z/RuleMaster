import Image from 'next/image'
import styled from 'styled-components'

const Button = styled.button`
	min-width: 100%;
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

	&:hover {
		background: #0c1b35;
	}
`

const Container = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 20px;
`

type ClassButtonProps = {
	image: string
	imageAlt: string
	name: string
	onClick: () => void
}

export default function ClassButton({
	image,
	imageAlt,
	name,
	onClick,
}: ClassButtonProps) {
	return (
		<Button onClick={onClick}>
			<Container>
				<Image
					src={image}
					alt={imageAlt}
					width={42}
					height={42}
					style={{ objectFit: 'contain' }}
					priority
				/>
				<b>{name}</b>
			</Container>
			❯
		</Button>
	)
}
