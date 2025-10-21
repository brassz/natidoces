import { Handle, Position } from 'reactflow'
import { Play } from 'lucide-react'

const StartNode = ({ data, selected }) => {
  return (
    <div className={`px-4 py-3 shadow-lg rounded-xl bg-gradient-to-r from-green-500 to-green-600 border-2 min-w-[200px] ${
      selected ? 'border-white' : 'border-green-700'
    }`}>
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
          <Play className="h-4 w-4 text-green-600" />
        </div>
        <div>
          <div className="text-sm font-semibold text-white">Início</div>
          <div className="text-xs text-green-100">
            {data.label || 'Ponto de entrada'}
          </div>
        </div>
      </div>

      <Handle type="source" position={Position.Bottom} className="w-3 !bg-white" />
    </div>
  )
}

export default StartNode