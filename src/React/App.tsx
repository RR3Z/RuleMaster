import React from 'react'
import MessageBox from './MessageBox/MessageBox.tsx'
import { Overlay } from './Overlay.tsx'

export default function App() {
	return (
		<>
			<Overlay />
			<MessageBox />
		</>
	)
}
