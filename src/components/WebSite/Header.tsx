'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styled from 'styled-components'

const StyledHeader = styled.header`
	display: flex;
	align-items: center;
	background: #00000065;
	width: 100%;
	height: 80px;
	padding: 0 30px;
	font-size: 1.35rem;
	position: relative;
	z-index: 10;
`

const NavLinks = styled.nav`
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
	display: flex;
	gap: 40px;
	align-items: center;
`

const StyledLink = styled(Link)<{ $active: boolean }>`
	text-decoration: none;
	border-bottom: 1px solid
		${({ $active }) => ($active ? 'white' : 'transparent')};
	padding-bottom: 2px;
	color: white;
`

export default function Header() {
	const pathname = usePathname()

	return (
		<StyledHeader>
			<Link href='/' style={{ display: 'flex', alignItems: 'center' }}>
				<Image
					src='/SiteLogoName.svg'
					alt='siteLogo'
					width={200}
					height={100}
				/>
			</Link>
			<NavLinks>
				<StyledLink href='/games' $active={pathname === '/games'}>
					Список игр
				</StyledLink>
			</NavLinks>
		</StyledHeader>
	)
}
