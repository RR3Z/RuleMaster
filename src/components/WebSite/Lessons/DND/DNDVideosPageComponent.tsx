'use client'
import styled from 'styled-components'
import VideoCard from '../../VideoCard'

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

export default function DNDVideosPageComponent() {
	return (
		<PageContainer>
			<PageTitle>Видеоуроки по D&D (5 издание)</PageTitle>
			<ThemeContainer>
				<SubTitle>Создание персонажа</SubTitle>
				<GridWrapper>
					<VideoCard
						videoID='1M7H0DiCbPo'
						videoName='Подробно заполняем лист персонажа, разбираем механики! | ДнД пятая редакция'
						authorName='Sneaky Dice'
					/>
					<VideoCard
						videoID='7XEvcux3BHk'
						videoName='D&D: Как создать ПЕРСОНАЖА С НУЛЯ? Полный гайд для новичков!'
						authorName='Днд | Долина неведомых Даров'
					/>
				</GridWrapper>
			</ThemeContainer>
			<ThemeContainer>
				<SubTitle>Боевая система</SubTitle>
				<GridWrapper>
					<VideoCard
						videoID='h1sqphnQtEQ'
						videoName='ВСЁ про Битвы в ДнД | Как проходит БОЙ в D&D 5 редакции?'
						authorName='Sneaky Dice'
					/>
					<VideoCard
						videoID='Y2y4dAECOy0'
						videoName='D&D Подробно. Базовые механики, характеристики, навыки и сражения.'
						authorName='Castle Games'
					/>
				</GridWrapper>
			</ThemeContainer>
		</PageContainer>
	)
}
