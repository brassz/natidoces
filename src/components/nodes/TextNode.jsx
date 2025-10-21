import { Handle, Position } from 'reactflow'
import { MessageSquare } from 'lucide-react'

const TextNode = ({ data, selected }) => {
  return (
    <div className={`px-4 py-2 shadow-md rounded-lg bg-white border-2 border-stone-400 min-w-[200px] ${
      selected ? 'border-primary-500' : ''
    }`}>
      <Handle type="target" position={Position.Top} className="w-3 !bg-gray-400" />
      
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
          <MessageSquare className="h-3 w-3 text-white" />
        </div>
        <div className="flex-1">
          <div className="text-xs font-medium text-gray-700">Mensagem de Texto</div>
          <div className="text-xs text-gray-500 truncate max-w-[150px]">
            {data.text || 'Clique para editar...'}
          </div>
        </div>
      </div>

      <Handle type="source" position={Position.Bottom} className="w-3 !bg-gray-400" />
    </div>
  )
}

export default TextNode