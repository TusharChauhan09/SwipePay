const { getDefaultConfig } = require('expo/metro-config')
const { withNativeWind } = require('nativewind/metro')

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname)

// Stop Metro from watching the Rust/Anchor build folder
config.resolver.blockList = [
  /apps\/contract\/target\/.*/,
  /apps\/api\/tmp\/.*/,
]

module.exports = withNativeWind(config, { input: './global.css' })