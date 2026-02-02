import type { Easing } from 'motion'

import { animate, useMotionValue, useMotionValueEvent } from 'motion/react'
import { useEffect, useState } from 'react'

interface CountToProps {
  startValue?: number
  endValue?: number
  duration?: number
  autoplay?: boolean
  decimals?: number
  prefix?: string
  suffix?: string
  separator?: string
  decimal?: string
  useEasing?: boolean
  transition?: Easing | Easing[]
  className?: string
}

export default function CountTo({
  startValue = 0,
  endValue = 1000,
  duration = 1500,
  autoplay = true,
  decimals = 0,
  prefix = '',
  suffix = '',
  separator = ',',
  decimal = '.',
  useEasing = true,
  transition = 'linear',
  className,
}: CountToProps) {
  // 创建动画值
  const motionValue = useMotionValue(startValue)

  // 状态保存格式化后的值
  const [value, setValue] = useState(() => formatValue(startValue))

  // 格式化数字
  function formatValue(num: number) {
    let number = num.toFixed(decimals)
    number = String(number)

    const x = number.split('.')
    let x1 = x[0]
    const x2 = x.length > 1 ? decimal + x[1] : ''
    const rgx = /(\d+)(\d{3})/

    if (separator) {
      while (rgx.test(x1)) {
        x1 = x1.replace(rgx, `$1${separator}$2`)
      }
    }

    return prefix + x1 + x2 + suffix
  }

  // 启动动画
  function start() {
    animate(
      motionValue,
      endValue,
      {
        type: 'tween',
        duration: duration / 1000, // 秒为单位
        ease: useEasing ? transition : undefined,
        onComplete: () => {
          setValue(formatValue(endValue))
        },
      },
    )
  }

  // 监听动画值变化
  useMotionValueEvent(motionValue, 'change', (latest) => {
    setValue(formatValue(latest))
  })

  // 处理自动播放和属性变化
  useEffect(() => {
    if (autoplay) {
      const timer = setTimeout(() => {
        start()
      }, 0)

      return () => clearTimeout(timer)
    }
  }, [startValue, endValue, duration, useEasing, transition, autoplay])

  return <span className={className}>{value}</span>
}
