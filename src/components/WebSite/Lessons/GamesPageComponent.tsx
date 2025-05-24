'use client'
import styled from 'styled-components'
import Card from '../Card'

const ContentContainer = styled.div`
	margin: 50px;
	display: flex;
	flex-direction: column;
	gap: 40px;
`

const H1 = styled.h1`
	font-size: 2rem;
	font-weight: bold;
`

const CardsContainer = styled.div`
	display: grid;
	gap: 20px;
	grid-template-columns: repeat(5, 1fr);
	width: 100%;
`

export default function GamesPageComponent() {
	return (
		<>
			<ContentContainer>
				<H1>Список игр доступных для изучения</H1>
				<CardsContainer>
					<Card name='Dungeon & Dragons (5e)' link='/games/dnd' />
				</CardsContainer>
			</ContentContainer>
		</>
	)
}
