import React from 'react'
import ActionsPanel from './ActionsPanel/ActionsPanel.tsx'
import MessageBox from './MessageBox/MessageBox.tsx'
import RightSideMenu from './RightSideMenu/RightSideMenu.tsx'

export default function App() {
	return (
		<>
			<MessageBox />
			<RightSideMenu />
			<ActionsPanel />
		</>
	)
}
