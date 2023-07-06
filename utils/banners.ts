const defaultBanner =
  'Create-Element-Plus-App - The Fast Cli Was Created By Yaoziyi<852373851@qq.com>'

// generated by the following code:
const gradientBanner = require('gradient-string')([
  { color: '#42d392', pos: 0 },
  { color: '#42d392', pos: 0.1 },
  { color: '#647eff', pos: 1 }
])(defaultBanner)

const stdoutBanner = () => {
  console.log()
  console.log(
    process.stdout.isTTY && process.stdout.getColorDepth() > 8 ? gradientBanner : defaultBanner
  )
  console.log()
}

export { defaultBanner, gradientBanner, stdoutBanner }