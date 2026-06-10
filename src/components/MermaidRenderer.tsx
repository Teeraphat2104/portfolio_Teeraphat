import { useEffect, useRef } from 'react'
import mermaid from 'mermaid'

mermaid.initialize({ startOnLoad: false, theme: 'neutral' })

interface MermaidRendererProps {
  code: string
}

export const MermaidRenderer: React.FC<MermaidRendererProps> = ({ code }) => {
  const ref = useRef<HTMLDivElement>(null)
  const id = `mermaid-${Math.random().toString(36).slice(2, 9)}`

  useEffect(() => {
    if (ref.current) {
      ref.current.innerHTML = ''
      mermaid.render(id, code).then((result) => {
        if (ref.current) {
          ref.current.innerHTML = result.svg
        }
      })
    }
  }, [code])

  return <div ref={ref} className="flex justify-center my-8 [&_svg]:max-w-full" />
}
