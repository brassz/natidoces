import { Handle, Position } from 'reactflow'
import { Volume2, Play } from 'lucide-react'

const AudioNode = ({ data, selected }) => {
  return (
    <div className={`px-4 py-2 shadow-md rounded-lg bg-white border-2 border-stone-400 min-w-[200px] ${
      selected ? 'border-primary-500' : ''
    }`}>
      <Handle type="target" position={Position.Top} className="w-3 !bg-gray-400" />
      
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
          <Volume2 className="h-3 w-3 text-white" />
        </div>
        <div className="flex-1">
          <div className="text-xs font-medium text-gray-700">Mensagem de Áudio</div>
          <div className="flex items-center gap-1 mt-1">
            <div className="w-3 h-3 bg-green-500 rounded-full flex items-center justify-center">
              <Play className="h-2 w-2 text-white" />
            </div>
            <div className="text-xs text-gray-500">
              {data.duration || '00:30'}
            </div>
          </div>
        </div>
      </div>

      <Handle type="source" position={Position.Bottom} className="w-3 !bg-gray-400" />
    </div>
  )
}

export default AudioNode