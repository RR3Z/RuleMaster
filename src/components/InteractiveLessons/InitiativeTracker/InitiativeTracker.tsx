// src/components/InteractiveLessons/InitiativeTrackerUI/InitiativeTrackerUI.tsx
'use client'

import DNDCharacter from '@/InteractiveLessons/Entities/Character/DND/DNDCharacter'
import DNDInitiativeManager from '@/InteractiveLessons/InitiativeManager/DND/DNDInitiativeManager'
import { ChevronUp } from 'lucide-react' // For the arrow icon
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import styled, { css } from 'styled-components'

const TrackerContainer = styled.div`
	position: absolute;
	top: 50px; /* Adjust as needed */
	left: 20px; /* Adjust as needed */
	width: 100px; /* Adjust based on token size */
	background-color: rgba(0, 0, 0, 0.5);
	border-radius: 8px;
	padding: 10px 5px;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 8px;
	z-index: 100; // Ensure it's above other elements
`

const TokenSlot = styled.div<{ $isActive: boolean; $isNext: boolean }>`
	width: 70px; /* Token image size */
	height: 70px; /* Token image size */
	border-radius: 50%;
	overflow: hidden;
	border: 3px solid transparent;
	position: relative;
	transition: all 0.3s ease-in-out;

	${({ $isActive }) =>
		$isActive &&
		css`
			border-color: #ff6400; /* Orange border for active */
			box-shadow: 0 0 15px #ff6400;
			transform: scale(1.1);
		`}

	${(
		{ $isNext } // Slightly smaller for non-active tokens
	) =>
		!$isNext && // Apply only if not the very next (which might be larger if you want a peek)
		css`
			width: 60px;
			height: 60px;
			opacity: 0.7;
		`}
`

const StyledTokenImage = styled(Image)`
	object-fit: cover;
	width: 100%;
	height: 100%;
`

const ActiveIndicator = styled(ChevronUp)`
	color: #ff6400;
	width: 30px;
	height: 30px;
	position: absolute;
	top: -35px; /* Position above the active token */
	left: 50%;
	transform: translateX(-50%);
`

const EmptyState = styled.div`
	color: #aaa;
	font-size: 0.9rem;
	text-align: center;
`

interface InitiativeTrackerProps {
	initiativeManager: DNDInitiativeManager | null
	characterTokenPaths: Map<string, string>
	maxVisibleTokens?: number
}

export default function InitiativeTracker({
	initiativeManager,
	characterTokenPaths,
	maxVisibleTokens = 5,
}: InitiativeTrackerProps) {
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

		// Set initial state
		setOrderedCombatants([...initiativeManager.turnsOrder])
		setActiveCombatant(initiativeManager.activeCharacter)

		const orderSub = initiativeManager.onTurnsOrderUpdate$.subscribe(order => {
			setOrderedCombatants([...order]) // Create new array to trigger re-render
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
		if (activeIndex === -1) return []

		const numCombatants = orderedCombatants.length
		const halfVisible = Math.floor((maxVisibleTokens - 1) / 2) // -1 for the active token

		let startRenderIndex =
			(activeIndex - halfVisible + numCombatants) % numCombatants

		const visible = []
		for (let i = 0; i < Math.min(numCombatants, maxVisibleTokens); i++) {
			const combatantIndex = (startRenderIndex + i) % numCombatants
			visible.push(orderedCombatants[combatantIndex])
		}

		const reorderedForDisplay: DNDCharacter[] = []
		reorderedForDisplay.push(activeCombatant)

		let nextIndex = (activeIndex + 1) % numCombatants
		while (
			reorderedForDisplay.length < Math.min(numCombatants, maxVisibleTokens) &&
			nextIndex !== activeIndex
		) {
			reorderedForDisplay.push(orderedCombatants[nextIndex])
			nextIndex = (nextIndex + 1) % numCombatants
		}
		return reorderedForDisplay
	}, [orderedCombatants, activeCombatant, maxVisibleTokens])

	if (!initiativeManager || displayedTokens.length === 0) {
		return (
			<TrackerContainer>
				<EmptyState>Initiative not set.</EmptyState>
			</TrackerContainer>
		)
	}

	return (
		<TrackerContainer>
			{displayedTokens.map((combatant, index) => {
				const tokenPath =
					characterTokenPaths.get(combatant.name) || '/noImage.webp'
				const isActive = combatant === activeCombatant
				return (
					<TokenSlot
						key={combatant.name + index}
						$isActive={isActive}
						$isNext={index === 0}
					>
						{isActive && index === 0 && <ActiveIndicator />}
						<StyledTokenImage
							src={tokenPath}
							alt={combatant.name}
							width={55}
							height={55}
							priority={isActive}
						/>
					</TokenSlot>
				)
			})}
		</TrackerContainer>
	)
}
