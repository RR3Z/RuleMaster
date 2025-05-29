'use client'
import styled from 'styled-components'
import FileCard from '../../FileCard'

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

export default function DNDTextsPageComponent() {
	return (
		<PageContainer>
			<PageTitle>Текстовые уроки по D&D (5 издание)</PageTitle>
			<ThemeContainer>
				<SubTitle>Создание персонажа</SubTitle>
				<GridWrapper>
					<FileCard
						name='Характеристики'
						downloadFile='/lessons/dnd/texts/characteristics.pdf'
					/>
					<FileCard
						name='Навыки'
						downloadFile='/lessons/dnd/texts/skills.pdf'
					/>
					<FileCard
						name='Раса, класс и предыстория'
						downloadFile='/lessons/dnd/texts/raceClassBackground.pdf'
					/>
				</GridWrapper>
			</ThemeContainer>
			<ThemeContainer>
				<SubTitle>Боевая система</SubTitle>
				<GridWrapper>
					<FileCard
						name='Порядок хода'
						downloadFile='/lessons/dnd/texts/runningOrder.pdf'
					/>
					<FileCard
						name='Атака оружием'
						downloadFile='/lessons/dnd/texts/weaponAttack.pdf'
					/>
					<FileCard
						name='Атака заклинанием'
						downloadFile='/lessons/dnd/texts/spellsAttack.pdf'
					/>
				</GridWrapper>
			</ThemeContainer>
		</PageContainer>
	)
}
