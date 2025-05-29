'use client'
import { device } from '@/components/InteractiveLessons/breakpoints'
import styled from 'styled-components'
import Card from '../Card'

const ContentContainer = styled.div`
	padding: 20px;
	margin: 0 auto;
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 30px;
`

const H1 = styled.h1`
	font-size: 1.8rem;
	font-weight: bold;
	text-align: center;

	@media ${device.sm} {
		font-size: 2rem;
		text-align: left;
	}

	@media ${device.lg} {
		font-size: 2.2rem;
	}
`

const CardsContainer = styled.div`
	display: grid;
	gap: 15px;
	grid-template-columns: 1fr;

	@media ${device.sm} {
		grid-template-columns: repeat(3, 1fr);
		gap: 20px;
	}

	@media ${device.lg} {
		grid-template-columns: repeat(4, 1fr);
	}

	@media ${device.xl} {
		grid-template-columns: repeat(5, 1fr);
	}

	@media ${device.xxl} {
		grid-template-columns: repeat(7, 1fr);
	}
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
