import styled from 'styled-components'

const MainContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	width: auto;
`

const Label = styled.label`
	font-size: 1.2rem;
	font-weight: bold;
`

const Input = styled.input`
	border: 1px solid #8b8b8b;
	width: 200px;
	color: white;
	transition: all 0.2s ease;

	&:focus {
		border: 1px solid #ffffff;
		outline: none;
	}
`

type Props = {
	placeholder: string
	value: string
	changeValue: (value: string) => void
}

export default function CharacterName({
	placeholder,
	value,
	changeValue,
}: Props) {
	return (
		<MainContainer>
			<Label>Имя персонажа</Label>
			<Input
				type='text'
				value={value}
				onChange={e => changeValue(e.target.value)}
				placeholder={placeholder}
			/>
		</MainContainer>
	)
}
