'use client'
import Header from '@/components/WebSite/Header'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function LayoutWrapper({
	children,
}: {
	children: React.ReactNode
}) {
	const pathname = usePathname()

	const pagesWithoutHeader = ['/games/dnd/text/', '/games/dnd/interactive/']

	const showHeader = !pagesWithoutHeader.some(path => pathname.startsWith(path))

	return (
		<>
			{showHeader && <Header />}
			<main>{children}</main>
		</>
	)
}
