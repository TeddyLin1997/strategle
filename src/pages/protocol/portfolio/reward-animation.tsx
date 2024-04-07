import { useSpring, animated } from '@react-spring/web'


interface RewardAnimationProps {
  amount: string
}

const RewardAnimation = ({ amount }: RewardAnimationProps) => {
  const springs = useSpring({
    from: { y: 0, opacity: 1 },
    to: { y: -100, opacity: 0 },
    config: { duration: 2000 }
  })

  return (
    <animated.div style={springs} className="absolute font-bold md:right-[10%] right-0 bottom-0 text-up drop-shadow-sm">+ ${amount} U</animated.div>
  )
}

export default RewardAnimation
