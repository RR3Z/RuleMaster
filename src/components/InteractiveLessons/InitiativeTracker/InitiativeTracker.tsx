'use client'
import DNDCharacter from '@/InteractiveLessons/Entities/Character/DND/DNDCharacter'
import DNDInitiativeManager from '@/InteractiveLessons/InitiativeManager/DND/DNDInitiativeManager'
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import styled, { css } from 'styled-components'

const TrackerContainer = styled.div`
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	width: 75px;
	background-color: rgba(0, 0, 0, 0.65);
	border-radius: 3px;
	padding: 10px 5px;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 8px;
	z-index: 50;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
`

const TokenSlot = styled.div<{ $isDisplayedFirst: boolean }>`
	border-radius: 50%;
	overflow: hidden;
	position: relative;
	transition: all 0.3s ease-in-out;
	display: flex;
	justify-content: center;
	align-items: center;

	${({ $isDisplayedFirst }) =>
		$isDisplayedFirst
			? css`
					width: 55px;
					height: 55px;
					border: 3px solid #ff6400;
					box-shadow: 0 0 15px #ff6400;
					transform: scale(1.1);
					z-index: 2;
			  `
			: css`
					width: 45px;
					height: 45px;
					border: 2px solid rgba(100, 100, 100, 0.5);
					opacity: 0.75;
					transform: scale(1);
			  `}
`

const StyledTokenImage = styled(Image)`
	object-fit: cover;
`

const EmptyState = styled.div`
	color: #ccc;
	font-size: 0.9rem;
	text-align: center;
	padding: 10px;
`

type Props = {
	initiativeManager: DNDInitiativeManager | null
	characterTokenPaths: Map<string, string> | undefined
	maxVisibleTokens?: number
}

export default function InitiativeTracker({
	initiativeManager,
	characterTokenPaths,
	maxVisibleTokens = 5,
}: Props) {
	const [orderedCombatants, setOrderedCombatants] = useState<DNDCharacter[]>([])
	const [activeCombatant, setActiveCombatant] = useState<DNDCharacter | null>(
		null
	)

	useEffect(() => {
		if (!initiativeManager) {
			setOrderedCombatants([])
			setActiveCombatant(null)
			return
		}

		setOrderedCombatants([...initiativeManager.turnsOrder])
		setActiveCombatant(initiativeManager.activeCharacter)

		const orderSub = initiativeManager.onTurnsOrderUpdate$.subscribe(order => {
			setOrderedCombatants([...order])
		})
		const activeSub = initiativeManager.onActiveCharacterChanged$.subscribe(
			active => {
				setActiveCombatant(active)
			}
		)

		return () => {
			orderSub.unsubscribe()
			activeSub.unsubscribe()
		}
	}, [initiativeManager])

	const displayedTokens = useMemo(() => {
		if (!activeCombatant || orderedCombatants.length === 0) {
			return []
		}

		const activeIndex = orderedCombatants.findIndex(c => c === activeCombatant)
		if (activeIndex === -1) return [] // Активный персонаж должен быть в списке

		const numCombatants = orderedCombatants.length
		const reorderedForDisplay: DNDCharacter[] = []

		reorderedForDisplay.push(activeCombatant)

		let nextCombatantIndex = (activeIndex + 1) % numCombatants
		while (
			reorderedForDisplay.length < Math.min(numCombatants, maxVisibleTokens) &&
			nextCombatantIndex !== activeIndex // Условие остановки, чтобы не добавлять активного дважды
		) {
			reorderedForDisplay.push(orderedCombatants[nextCombatantIndex])
			nextCombatantIndex = (nextCombatantIndex + 1) % numCombatants
		}
		return reorderedForDisplay
	}, [orderedCombatants, activeCombatant, maxVisibleTokens])

	if (
		!initiativeManager ||
		!characterTokenPaths ||
		displayedTokens.length === 0
	) {
		return (
			<TrackerContainer>
				<EmptyState>
					{initiativeManager && characterTokenPaths
						? 'No one in combat.'
						: 'Loading...'}
				</EmptyState>
			</TrackerContainer>
		)
	}

	return (
		<TrackerContainer>
			{displayedTokens.map((combatant, index) => {
				const tokenPath =
					characterTokenPaths.get(combatant.name) || '/noImage.webp'
				const isDisplayedFirst = index === 0

				return (
					<TokenSlot
						key={`${combatant.name}-${index}`}
						$isDisplayedFirst={isDisplayedFirst}
					>
						<StyledTokenImage
							src={tokenPath}
							alt={combatant.name}
							width={isDisplayedFirst ? 70 : 60}
							height={isDisplayedFirst ? 70 : 60}
							priority={isDisplayedFirst}
						/>
					</TokenSlot>
				)
			})}
		</TrackerContainer>
	)
}
