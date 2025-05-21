import Image from 'next/image'
import styled from 'styled-components'
import DiceRollerTabButton from './DiceRollerTabButton'

const MainContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 5px;
`

const ImageContainer = styled.div`
	position: relative;
	aspect-ratio: 1 / 1;
	height: 125px;
`

const BottomContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	gap: 5px;
	width: 100%;
`

const Span = styled.span`
	width: 28px;
	text-align: center;
	display: inline-block;
	flex-shrink: 0;
`

type Props = {
	onIncrease: () => void
	onDecrease: () => void
	image: string
	value: number
	valuePlaceholder: string
}

export default function DiceCard({
	onIncrease,
	onDecrease,
	image,
	value,
	valuePlaceholder,
}: Props) {
	return (
		<MainContainer>
			<ImageContainer>
				<Image
					src={image}
					alt='diceImage'
					fill
					style={{ objectFit: 'contain' }}
					sizes='(max-width: 800px) 80px, (max-width: 1366px) 100px, (max-width: 1920px) 125px, 200px'
				/>
			</ImageContainer>
			<BottomContainer>
				<DiceRollerTabButton onClick={onDecrease} name='-' />
				<Span>{value > 0 ? value : valuePlaceholder}</Span>
				<DiceRollerTabButton onClick={onIncrease} name='+' />
			</BottomContainer>
		</MainContainer>
	)
}
