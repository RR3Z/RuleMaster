import { CONFIG } from '@/app/config'
import { CharacterData } from '@/types/CharacterData'
import { ArmourType } from '@/types/CharacterLesson/ArmourType'
import { Characteristic } from '@/types/CharacterLesson/Characteristics/Characteristic'
import { Instrument } from '@/types/CharacterLesson/Instruments/Instrument'
import { Skill } from '@/types/CharacterLesson/Skills/Skill'
import { WeaponType } from '@/types/CharacterLesson/WeaponType'
import fontkit from '@pdf-lib/fontkit'
import { PDFCheckBox, PDFDocument, PDFTextField } from 'pdf-lib'
import { useState } from 'react'
import styled from 'styled-components'

const ExportButton = styled.button`
	border-radius: 3px;
	background: #364156;
	min-width: 50%;
	min-height: 50px;

	&:hover:enabled {
		cursor: pointer;
		background: #4b5974;
	}

	&:disabled {
		cursor: not-allowed;
		opacity: 0.8;
	}
`

type Props = {
	characterData: CharacterData
}

export default function ExportCharacterButton({ characterData }: Props) {
	const [isLoading, setLoading] = useState<boolean>(false)

	const weaponTypeTranslations: Record<WeaponType, string> = {
		[WeaponType.SIMPLE]: 'Простое оружие',
		[WeaponType.RAPIERS]: 'Рапиры',
		[WeaponType.LONG_SWORDS]: 'Длинные мечи',
		[WeaponType.SHORT_SWORDS]: 'Короткие мечи',
		[WeaponType.HAND_CROSSBOWS]: 'Арбалеты (ручные)',
	}

	const instrumentTranslations: Record<Instrument, string> = {
		[Instrument.DRUM]: 'Барабан',
		[Instrument.VIOLA]: 'Виола',
		[Instrument.BAGPIPE]: 'Волынка',
		[Instrument.LYRE]: 'Лира',
		[Instrument.LUTE]: 'Лютня',
		[Instrument.HORN]: 'Рог',
		[Instrument.WHISTLE]: 'Свисток',
		[Instrument.FLUTE]: 'Флейта',
		[Instrument.CYMBALS]: 'Цымбалы',
		[Instrument.SHALMEI]: 'Шалмей',
		[Instrument.MAKEUP_KIT]: 'Набор для грима',
		[Instrument.REPAIRMANS_TOOLS]: 'Инструменты ремонтника',
	}

	const fillPDF = async () => {
		const pdfRes = await fetch(`${CONFIG.siteURL}/DNDCharacterSheet.pdf`)
		const pdfBytes = await pdfRes.arrayBuffer()
		const fontRes = await fetch(`${CONFIG.siteURL}/Fonts/Roboto-Regular.ttf`)
		const fontBytes = await fontRes.arrayBuffer()

		const pdfDoc = await PDFDocument.load(pdfBytes)
		pdfDoc.registerFontkit(fontkit)
		const pdfFont = await pdfDoc.embedFont(fontBytes)

		const form = pdfDoc.getForm()
		form.getTextField('name').setText(characterData.name)
		form.getTextField('origin').setText(characterData.originName)
		form.getTextField('class').setText(characterData.className)
		form.getTextField('race').setText(characterData.raceName)
		form.getTextField('level').setText(characterData.level.toString())
		form.getTextField('maxHp').setText(characterData.maxHP.toString())
		form
			.getTextField('bonusMastery')
			.setText(characterData.bonusMastery.toString())
		form
			.getTextField('INTMod')
			.setText(
				characterData.characteristicMods
					.get(Characteristic.INTELLIGENCE)!
					.toString()
			)
		form
			.getTextField('INTVal')
			.setText(
				characterData.characteristicVals
					.get(Characteristic.INTELLIGENCE)!
					.toString()
			)
		form
			.getTextField('STRMod')
			.setText(
				characterData.characteristicMods
					.get(Characteristic.STRENGTH)!
					.toString()
			)
		form
			.getTextField('STRVal')
			.setText(
				characterData.characteristicVals
					.get(Characteristic.STRENGTH)!
					.toString()
			)
		form
			.getTextField('DEXMod')
			.setText(
				characterData.characteristicMods.get(Characteristic.AGILITY)!.toString()
			)
		form
			.getTextField('DEXVal')
			.setText(
				characterData.characteristicVals.get(Characteristic.AGILITY)!.toString()
			)
		form
			.getTextField('WISMod')
			.setText(
				characterData.characteristicMods.get(Characteristic.WISDOM)!.toString()
			)
		form
			.getTextField('WISVal')
			.setText(
				characterData.characteristicVals.get(Characteristic.WISDOM)!.toString()
			)
		form
			.getTextField('CONMod')
			.setText(
				characterData.characteristicMods
					.get(Characteristic.CONSTITUTION)!
					.toString()
			)
		form
			.getTextField('CONVal')
			.setText(
				characterData.characteristicVals
					.get(Characteristic.CONSTITUTION)!
					.toString()
			)
		form
			.getTextField('CHMod')
			.setText(
				characterData.characteristicMods
					.get(Characteristic.CHARISMA)!
					.toString()
			)
		form
			.getTextField('CHVal')
			.setText(
				characterData.characteristicVals
					.get(Characteristic.CHARISMA)!
					.toString()
			)

		characterData.armourMasteries.forEach(mastery => {
			switch (mastery) {
				case ArmourType.LIGHT:
					form.getCheckBox('LAMastery').check()
					break
				case ArmourType.MEDIUM:
					form.getCheckBox('MAMastery').check()
					break
				case ArmourType.HEAVY:
					form.getCheckBox('HAMastery').check()
					break
				case ArmourType.SHIELDS:
					form.getCheckBox('SMastery').check()
					break
			}
		})

		// Saving Throws (Mastery And Value)
		Object.values(Characteristic).forEach(characteristic => {
			switch (characteristic) {
				case Characteristic.AGILITY:
					form
						.getTextField('DEXSavingThrowValue')
						.setText(
							characterData.savingThrowsVals.get(characteristic)!.toString()
						)
					if (characterData.savingThrowsMasteries.includes(characteristic))
						form.getCheckBox('DEXSavingThrowMastery').check()
					break
				case Characteristic.STRENGTH:
					form
						.getTextField('STRSavingThrowValue')
						.setText(
							characterData.savingThrowsVals.get(characteristic)!.toString()
						)
					if (characterData.savingThrowsMasteries.includes(characteristic))
						form.getCheckBox('STRSavingThrowMastery').check()
					break
				case Characteristic.WISDOM:
					form
						.getTextField('WISSavingThrowValue')
						.setText(
							characterData.savingThrowsVals.get(characteristic)!.toString()
						)
					if (characterData.savingThrowsMasteries.includes(characteristic))
						form.getCheckBox('WISSavingThrowMastery').check()
					break
				case Characteristic.CHARISMA:
					form
						.getTextField('CHSavingThrowValue')
						.setText(
							characterData.savingThrowsVals.get(characteristic)!.toString()
						)
					if (characterData.savingThrowsMasteries.includes(characteristic))
						form.getCheckBox('CHSavingThrowMastery').check()
					break
				case Characteristic.CONSTITUTION:
					form
						.getTextField('CONSavingThrowValue')
						.setText(
							characterData.savingThrowsVals.get(characteristic)!.toString()
						)
					if (characterData.savingThrowsMasteries.includes(characteristic))
						form.getCheckBox('CONSavingThrowMastery').check()
					break
				case Characteristic.INTELLIGENCE:
					form
						.getTextField('INTSavingThrowValue')
						.setText(
							characterData.savingThrowsVals.get(characteristic)!.toString()
						)
					if (characterData.savingThrowsMasteries.includes(characteristic))
						form.getCheckBox('INTSavingThrowMastery').check()
					break
			}
		})

		// Skills
		characterData.skillsVals.forEach((val, skill) => {
			switch (skill) {
				case Skill.ACROBATICS:
					if (characterData.skillsMasteries.includes(skill))
						form.getCheckBox('AcrobaticsMastery').check()
					form.getTextField('AcrobaticsValue').setText(val.toString())
					break
				case Skill.ANIMAL_HANDLING:
					if (characterData.skillsMasteries.includes(skill))
						form.getCheckBox('AnimalHandlingMastery').check()
					form.getTextField('AnimalHandlingValue').setText(val.toString())
					break
				case Skill.ARCANA:
					if (characterData.skillsMasteries.includes(skill))
						form.getCheckBox('ArcanaMastery').check()
					form.getTextField('ArcanaValue').setText(val.toString())
					break
				case Skill.ATHLETICS:
					if (characterData.skillsMasteries.includes(skill))
						form.getCheckBox('AthleticMastery').check()
					form.getTextField('AthleticValue').setText(val.toString())
					break
				case Skill.DECEPTION:
					if (characterData.skillsMasteries.includes(skill))
						form.getCheckBox('DeceptionMastery').check()
					form.getTextField('DeceptionValue').setText(val.toString())
					break
				case Skill.HISTORY:
					if (characterData.skillsMasteries.includes(skill))
						form.getCheckBox('HistoryMastery').check()
					form.getTextField('HistoryValue').setText(val.toString())
					break
				case Skill.INSIGHT:
					if (characterData.skillsMasteries.includes(skill))
						form.getCheckBox('InsightMastery').check()
					form.getTextField('InsightValue').setText(val.toString())
					break
				case Skill.INTIMIDATION:
					if (characterData.skillsMasteries.includes(skill))
						form.getCheckBox('IntimidationMastery').check()
					form.getTextField('IntimidationValue').setText(val.toString())
					break
				case Skill.INVESTIGATION:
					if (characterData.skillsMasteries.includes(skill))
						form.getCheckBox('InvestigationMastery').check()
					form.getTextField('InvestigationValue').setText(val.toString())
					break
				case Skill.MEDICINE:
					if (characterData.skillsMasteries.includes(skill))
						form.getCheckBox('MedicineMastery').check()
					form.getTextField('MedicineValue').setText(val.toString())
					break
				case Skill.NATURE:
					if (characterData.skillsMasteries.includes(skill))
						form.getCheckBox('NatureMastery').check()
					form.getTextField('NatureValue').setText(val.toString())
					break
				case Skill.PERCEPTION:
					if (characterData.skillsMasteries.includes(skill))
						form.getCheckBox('PerceptionMastery').check()
					form.getTextField('PerceptionValue').setText(val.toString())
					break
				case Skill.PERFORMANCE:
					if (characterData.skillsMasteries.includes(skill))
						form.getCheckBox('PerformanceMastery').check()
					form.getTextField('PerformanceValue').setText(val.toString())
					break
				case Skill.PERSUASION:
					if (characterData.skillsMasteries.includes(skill))
						form.getCheckBox('PersuasionMastery').check()
					form.getTextField('PersuasionValue').setText(val.toString())
					break
				case Skill.RELIGION:
					if (characterData.skillsMasteries.includes(skill))
						form.getCheckBox('ReligionMastery').check()
					form.getTextField('ReligionValue').setText(val.toString())
					break
				case Skill.SLEIGHT_OF_HAND:
					if (characterData.skillsMasteries.includes(skill))
						form.getCheckBox('SleightOfHandsMastery').check()
					form.getTextField('SleightOfHandsValue').setText(val.toString())
					break
				case Skill.STEALTH:
					if (characterData.skillsMasteries.includes(skill))
						form.getCheckBox('StealthMastery').check()
					form.getTextField('StealthValue').setText(val.toString())
					break
				case Skill.SURVIVAL:
					if (characterData.skillsMasteries.includes(skill))
						form.getCheckBox('SurvivalMastery').check()
					form.getTextField('SurvivalValue').setText(val.toString())
					break
			}
		})

		const weapons = characterData.weaponMasteries
			.map(type => weaponTypeTranslations[type])
			.join(', ')
		form.getTextField('WeaponMastery').setText(weapons)

		const instruments = characterData.instrumentsMasteries
			.map(type => instrumentTranslations[type])
			.filter(Boolean)
			.join(', ')
		form.getTextField('ToolsMastery').setText(instruments)

		form.getTextField('speed').setText(characterData.speed!.toString())

		for (const field of form.getFields()) {
			if (field instanceof PDFTextField) {
				field.updateAppearances(pdfFont)
			} else if (field instanceof PDFCheckBox) {
				// Эти поля тоже можно обновить, но без шрифта
				field.updateAppearances()
			}
		}

		// TODO: form.getTextField('subclass').setText()
		return await pdfDoc.save()
	}

	const handleClick = async () => {
		setLoading(true)

		const filledPDFDoc = await fillPDF()

		const blob = new Blob([filledPDFDoc], { type: 'application/pdf' })
		const link = document.createElement('a')
		const objectURL = URL.createObjectURL(blob)
		link.href = objectURL
		link.download = 'modified_character_sheet.pdf'
		link.click()

		link.remove()
		URL.revokeObjectURL(objectURL)

		setLoading(false)
	}

	return (
		<ExportButton onClick={handleClick} disabled={isLoading}>
			{isLoading ? 'Перенос информации в PDF...' : 'Лист персонажа (PDF)'}
		</ExportButton>
	)
}
