import type { ReactNode } from 'react'

interface ContainerProps {
 children: ReactNode
 className?: string
}

export const Container: React.FC<ContainerProps> = ({ children, className = '' }) => (
 <div className={`max-w-7xl mx-auto px-6 md:px-12 ${className}`}>
 {children}
 </div>
)
