'use client'
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
		color: #ff0000;
		background: #364156;
		padding: 5px;
		border-radius: 4px;
		white-space: nowrap;
		font-size: 0.9rem;
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
	cursor: ${props => (props.disabled ? 'auto' : 'pointer')};
	opacity: ${props => (props.disabled ? 0.4 : 1)};
`

type BuilderButtonProps = {
	name: string
	id: string
	activity: boolean
	errorMsg: string
	onClick: () => void
}

export default function BuilderButton({
	name,
	id,
	activity,
	errorMsg,
	onClick,
}: BuilderButtonProps) {
	return !activity ? (
		<ButtonWrapper data-tooltip={errorMsg}>
			<Button id={id} onClick={onClick} disabled>
				{name}
			</Button>
		</ButtonWrapper>
	) : (
		<Button id={id} onClick={onClick}>
			{name}
		</Button>
	)
}
