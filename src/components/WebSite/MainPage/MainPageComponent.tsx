'use client'
import Image from 'next/image'
import styled from 'styled-components'
import DefaultButton from '../DefaultButton'

const ContentContainer = styled.div`
	background-image: url('/MainPageBackground.png');
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
	position: relative;
	width: 100%;
	min-height: 100vh;
	margin-top: -80px;
	padding-top: 80px;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`

const HandImage = styled(Image)`
	position: absolute;
	right: 0;
	bottom: 0;
`

const ServiceName = styled.h1`
	font-size: 5rem;
	font-weight: bold;
`

const ServiceSubtitle = styled.h2`
	font-size: 2rem;
	color: #e7d1b1;
`

export default function MainPageComponent() {
	return (
		<>
			<ContentContainer>
				<HandImage
					src='/MainPageHand.png'
					alt='mainPageHand'
					width={500}
					height={500}
				/>
				<ServiceName>Rule Master</ServiceName>
				<ServiceSubtitle>
					Компаньон в мире настольных ролевых игр
				</ServiceSubtitle>
				<DefaultButton href='/games' text='Приступить к изучению!' />
			</ContentContainer>
		</>
	)
}
