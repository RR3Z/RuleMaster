import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'img.youtube.com',
				port: '',
				pathname: '/**',
			},
		],
	},
	compiler: {
		styledComponents: true,
	},
}

export default nextConfig
