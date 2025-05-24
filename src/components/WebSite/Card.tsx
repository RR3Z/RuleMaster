import Link from 'next/link'
import styled from 'styled-components'

const MainContainer = styled(Link)`
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
`

const Name = styled.h1`
	font-size: 1.5rem;
	font-weight: bold;
`

const ButtonText = styled.span`
	font-size: 1.25rem;
	border-bottom: 1px solid white;
`

type Props = {
	name: string
	link?: string
}

export default function Card({ name, link }: Props) {
	return (
		<MainContainer href={link ? link : '/games'}>
			<Name>{name}</Name>
			<ButtonText>К изучению!</ButtonText>
		</MainContainer>
	)
}
