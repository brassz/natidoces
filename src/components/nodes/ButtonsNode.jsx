import { Handle, Position } from 'reactflow'
import { MousePointer } from 'lucide-react'

const ButtonsNode = ({ data, selected }) => {
  const buttons = data.buttons || ['Opção 1', 'Opção 2', 'Opção 3']
  
  return (
    <div className={`px-4 py-2 shadow-md rounded-lg bg-white border-2 border-stone-400 min-w-[200px] ${
      selected ? 'border-primary-500' : ''
    }`}>
      <Handle type="target" position={Position.Top} className="w-3 !bg-gray-400" />
      
      <div className="flex items-start gap-2">
        <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center mt-1">
          <MousePointer className="h-3 w-3 text-white" />
        </div>
        <div className="flex-1">
          <div className="text-xs font-medium text-gray-700 mb-2">Botões de Opção</div>
          <div className="space-y-1">
            {buttons.slice(0, 3).map((button, index) => (
              <div key={index} className="text-xs bg-gray-100 rounded px-2 py-1 truncate">
                {button}
              </div>
            ))}
            {buttons.length > 3 && (
              <div className="text-xs text-gray-400">
                +{buttons.length - 3} mais
              </div>
            )}
          </div>
        </div>
      </div>

      <Handle type="source" position={Position.Bottom} className="w-3 !bg-gray-400" />
    </div>
  )
}

export default ButtonsNode