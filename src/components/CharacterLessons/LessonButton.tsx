import styled from 'styled-components'

const ButtonWrapper = styled.div`
	position: relative;

	&:hover::after {
		content: attr(data-tooltip);
		position: absolute;
		top: 100%;
		left: 50%;
		transform: translateX(-50%);
		background: none;
		color: #dd1f42;
		background: #364156;
		padding: 5px;
		border-radius: 4px;
		white-space: nowrap;
		font-size: 1rem;
		font-weight: bold;
		margin-top: 6px;
		z-index: 10;
	}
`

const Button = styled.button`
	background: #364156;
	font-size: 1.15rem;
	font-weight: 500;
	line-height: 1;
	vertical-align: middle;
	padding: 7px 9px;
	cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
	opacity: ${props => (props.disabled ? 0.4 : 1)};
`

type Props = {
	id: string
	text: string
	onClick: () => void
	activity: boolean
	errorMessage: string
}

export default function LessonButton({
	id,
	text,
	onClick,
	activity,
	errorMessage,
}: Props) {
	return !activity ? (
		<ButtonWrapper data-tooltip={errorMessage}>
			<Button id={id} onClick={onClick} disabled>
				{text}
			</Button>
		</ButtonWrapper>
	) : (
		<Button id={id} onClick={onClick}>
			{text}
		</Button>
	)
}
