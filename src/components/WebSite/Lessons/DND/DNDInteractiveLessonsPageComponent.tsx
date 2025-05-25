'use client'
import styled from 'styled-components'
import Card from '../../Card'

const PageContainer = styled.div`
	padding: 30px;
	min-height: calc(100vh - 80px);
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`

const PageTitle = styled.h1`
	font-size: 2.5rem;
	font-weight: bold;
`

const SubTitle = styled.h2`
	font-size: 2rem;
	margin: 20px 0;
`

const GridWrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 30px;
`

const ThemeContainer = styled.div`
	display: flex;
	flex-direction: column;
`

export default function DNDInteractiveLessonsPageComponent() {
	return (
		<PageContainer>
			<PageTitle>Интерактивные уроки по D&D (5 издание)</PageTitle>
			<ThemeContainer>
				<SubTitle>Создание персонажа</SubTitle>
				<GridWrapper>
					<Card
						name='Создание персонажа первого уровня'
						link='/games/dnd/interactive/character/1'
					/>
				</GridWrapper>
			</ThemeContainer>
			<ThemeContainer>
				<SubTitle>Боевая система</SubTitle>
				<GridWrapper>
					<Card name='Порядок хода' link='/games/dnd/interactive/battle/1' />
					<Card
						name='Возможные действия'
						link='/games/dnd/interactive/battle/2'
					/>
				</GridWrapper>
			</ThemeContainer>
		</PageContainer>
	)
}
