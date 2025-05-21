import styled from 'styled-components'

const StyledHR = styled.hr`
	height: 2px;
	width: 100%;
	border: none;
	background-color: #ff6400;
	box-shadow: 0 1px 12px rgba(255, 100, 0, 0.65);
	margin: 0;
	padding: 0;
`

export default function HR() {
	return <StyledHR />
}
