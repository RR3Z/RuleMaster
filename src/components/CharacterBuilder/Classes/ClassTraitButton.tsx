import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

const ToggleButton = styled.button`
	padding: 0px;
	position: relative;
	cursor: pointer;
	width: 100%;
	min-height: 80px;
	aspect-ratio: 8/1;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`

const ButtonBackground = styled.div`
	position: absolute;
	inset: 0;
	z-index: 0;
`

const ButtonContent = styled.div`
	padding: 10px 20px;
	position: relative;
	z-index: 1;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	align-self: flex-start;
	box-sizing: border-box;
	font-size: 1.5rem;
`

const ButtonTitle = styled.span`
	font-size: 1.1rem;
`

const ButtonSubTitle = styled.span`
	font-size: 0.9rem;
`

const ButtonLeftSide = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
`

const DropDownContainer = styled.div<{ $isVisible: boolean; $height: number }>`
	background: #414d65;
	width: 97%;
	margin: -15px 0px;
	border-bottom-left-radius: 3px;
	border-bottom-right-radius: 3px;
	max-height: ${({ $isVisible, $height }) =>
		$isVisible ? `${$height}px` : '0'};
	padding: ${({ $isVisible }) => ($isVisible ? '5px 15px' : '0px 15px')};
	overflow: hidden;
`

export default function ClassTraitButton() {
	const [isDropDownVisible, setDropDownVisibility] = useState<boolean>(false)
	const [dropDownContentHeight, setDropDownContentHeight] = useState<number>(0)
	const dropDownContentRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (dropDownContentRef.current)
			setDropDownContentHeight(dropDownContentRef.current.scrollHeight)
	}, [isDropDownVisible])

	return (
		<ToggleButton onClick={() => setDropDownVisibility(!isDropDownVisible)}>
			<ButtonBackground>
				<Image
					src='/classFeatureButtonBackground.svg'
					alt='class-trait-button-background'
					fill
					style={{ objectFit: 'contain' }} // или 'contain', если не хочешь обрезания
					priority
				/>
			</ButtonBackground>
			<ButtonContent>
				<ButtonLeftSide>
					<ButtonTitle>Название</ButtonTitle>
					<ButtonSubTitle>С какого уровня</ButtonSubTitle>
				</ButtonLeftSide>
				{isDropDownVisible ? 'ᐱ' : 'ᐯ'}
			</ButtonContent>
			{isDropDownVisible ? (
				<DropDownContainer
					$isVisible={isDropDownVisible}
					$height={dropDownContentHeight}
					ref={dropDownContentRef}
				>
					<div>test1</div>
					<div>test2</div>
					<div>test</div>
					<div>test</div>
					<div>test</div>
					<div>test</div>
				</DropDownContainer>
			) : undefined}
		</ToggleButton>
	)
}
