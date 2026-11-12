import { motion } from 'motion/react'

/** Learner bubble, aligned to the end side. */
export function UserMessage({ text }: { text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-end"
    >
      <p className="max-w-[85%] rounded-2xl rounded-ee-sm bg-blue px-4 py-2.5 text-white shadow-sm whitespace-pre-line">
        {text}
      </p>
    </motion.div>
  )
}
