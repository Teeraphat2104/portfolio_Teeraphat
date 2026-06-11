import { useEffect, useRef, useState } from 'react'
import mermaid from 'mermaid'

interface MermaidRendererProps {
 code: string
}

export const MermaidRenderer: React.FC<MermaidRendererProps> = ({ code }) => {
 const [error, setError] = useState<string | null>(null)
 const [svg, setSvg] = useState<string | null>(null)
 const initialized = useRef(false)

 useEffect(() => {
 if (!initialized.current) {
 initialized.current = true
 mermaid.initialize({ startOnLoad: false, theme: 'neutral' })
 }

 const id = `mermaid-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`

 mermaid.render(id, code).then((result) => {
 setSvg(result.svg)
 }).catch((err) => {
 setError(String(err))
 })
 }, [code])

 if (error) {
 return (
 <div className="my-8 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 font-mono whitespace-pre overflow-x-auto">
 <p className="font-semibold mb-1">Diagram Error:</p>
 {error}
 </div>
 )
 }

 if (!svg) {
 return (
 <div className="flex justify-center my-8 p-4 bg-white border border-neutral-200 rounded-xl">
 <p className="text-neutral-400 text-sm font-mono">Loading diagram...</p>
 </div>
 )
 }

 return (
 <div
 className="flex justify-center my-8 p-4 bg-white border border-neutral-200 rounded-xl [&_svg]:max-w-full"
 dangerouslySetInnerHTML={{ __html: svg }}
 />
 )
}
