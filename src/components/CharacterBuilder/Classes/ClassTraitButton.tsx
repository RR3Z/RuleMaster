import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

const ClassTrait = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`

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

const DropDownContent = styled.div<{ visible: boolean; height: number }>`
	overflow: hidden;
	transition: max-height 0.3s ease;
	max-height: ${({ visible, height }) => (visible ? `${height}px` : '0px')};
	opacity: ${({ visible }) => (visible ? 1 : 0)};
	transition: max-height 0.3s ease, opacity 0.2s ease;
	margin: -15px 0px 0px 0px;
	width: 98%;
`

const DropDownInner = styled.div`
	padding: 10px 20px;
	background-color: #f5f5f5;
	color: #333;
	font-size: 1rem;
	border-bottom-left-radius: 3px;
	border-bottom-right-radius: 3px;
`

export default function ClassTraitButton() {
	const [isDropDownVisible, setDropDownVisibility] = useState(false)
	const [dropDownContentHeight, setDropDownContentHeight] = useState(0)
	const dropDownContentRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (dropDownContentRef.current)
			setDropDownContentHeight(dropDownContentRef.current.scrollHeight)
	}, [isDropDownVisible])

	return (
		<ClassTrait>
			<ToggleButton onClick={() => setDropDownVisibility(!isDropDownVisible)}>
				<ButtonBackground>
					<Image
						src='/classTraitButtonBackground.svg'
						alt='class-trait-button-background'
						fill
						style={{ objectFit: 'contain' }}
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
			</ToggleButton>

			<DropDownContent
				ref={dropDownContentRef}
				visible={isDropDownVisible}
				height={dropDownContentHeight}
			>
				<DropDownInner>
					<p>Описание особенности класса или другая полезная информация.</p>
					<p>Описание особенности класса или другая полезная информация.</p>
					<p>Описание особенности класса или другая полезная информация.</p>
					<p>Описание особенности класса или другая полезная информация.</p>
					<p>Описание особенности класса или другая полезная информация.</p>
					<p>Описание особенности класса или другая полезная информация.</p>
					<p>Описание особенности класса или другая полезная информация.</p>
				</DropDownInner>
			</DropDownContent>
		</ClassTrait>
	)
}
