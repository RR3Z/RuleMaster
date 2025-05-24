'use client'
import Image from 'next/image'
import styled from 'styled-components'
import DefaultButton from '../../DefaultButton'

const MainContainer = styled.div`
	padding: 50px;
	min-height: calc(100vh - 80px);
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	justify-content: center;
`

const TextContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 20px;
	flex: 1;
	max-width: 70%;
`

const TopContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	gap: 20px;
	width: 100%;
`

const ButtonsContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	width: 100%;
`

const Logo = styled(Image)`
	object-fit: contain;
	max-width: 30%;
`

const Title = styled.h1`
	font-size: 2.5rem;
	font-weight: bold;
`

const Description = styled.h3`
	font-size: 1.5rem;
`

export default function DNDPageComponent() {
	return (
		<MainContainer>
			<TopContainer>
				<TextContainer>
					<Title>Dungeon & Dragons (5 издание)</Title>
					<Description>
						Dungeons & Dragons (Подземелья и драконы) — настольная ролевая игра
						в жанре фэнтези. Игровой мир, сюжет и существа в Dungeons & Dragons
						отсылают к Средневековью. В игровой партии участвует несколько
						человек, которые выступают за своих кастомизированных персонажей.
						Все вместе они отправляются в приключения, по ходу которых
						прокачивают своих героев, открывают новые способности и находят
						различные магические предметы.
					</Description>
				</TextContainer>
				<Logo src='/DNDLogo.svg' alt='dndLogo' width={500} height={400} />
			</TopContainer>
			<ButtonsContainer>
				<DefaultButton href='/games/dnd/text' text='Текстовые объяснения' />
				<DefaultButton href='/games/dnd/video' text='Видео объяснения' />
				<DefaultButton
					href='/games/dnd/interactive'
					text='Интерактивные уроки'
				/>
			</ButtonsContainer>
		</MainContainer>
	)
}
