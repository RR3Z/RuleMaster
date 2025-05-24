import Link from 'next/link'
import styled from 'styled-components'

const Button = styled(Link)`
	border: 1px solid white;
	border-radius: 5px;
	font-size: 1.7rem;
	margin-top: 100px;
	padding: 5px 10px;
	background: #364156da;
	transition: background 0.1s ease;

	&:hover {
		background: #45536dda;
	}
`

type Props = {
	text: string
	href: string
}

export default function DefaultButton({ text, href }: Props) {
	return <Button href={href}>{text}</Button>
}
