import { ChangeEvent } from 'react'
import styled from 'styled-components'
import { DEFAULT_NAME } from './CharacterBuilder'

const CharacterNameContainer = styled.div`
	display: flex;
	justify-content: left;
	flex-direction: column;
	align-items: left;
	width: 100%;
`

const InputField = styled.input`
	max-width: 200px;
	background: none;
	color: #ffffff;
	border-color: #494949;

	&:focus {
		border-color: #ffffff;
		outline: none;
	}
`

const Title = styled.h4`
	font-size: 1.2rem;
	font-weight: 600;
	margin-bottom: 5px;
`

const HorizontalLine = styled.hr`
	border: none;
	height: 1px;
	background-color: #2c2c2c;
	margin-top: 10px;
`

export default function CharacterName({
	value,
	onChange,
}: {
	value: string
	onChange: (val: string) => void
}) {
	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		onChange(e.target.value)
	}

	const handleBlur = () => {
		if (value.trim() === '') onChange(DEFAULT_NAME)
	}

	return (
		<CharacterNameContainer>
			<Title>Имя персонажа</Title>
			<InputField
				onChange={handleInputChange}
				onBlur={handleBlur}
				value={value}
			/>
			<HorizontalLine />
		</CharacterNameContainer>
	)
}
