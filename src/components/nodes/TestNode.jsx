import { Handle, Position } from 'reactflow'

const TestNode = ({ data, selected }) => {
  return (
    <div className={`px-4 py-2 shadow-md rounded-lg bg-white border-2 border-stone-400 min-w-[200px] ${
      selected ? 'border-primary-500' : ''
    }`}>
      <Handle type="target" position={Position.Top} className="w-3 !bg-gray-400" />
      
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-bold">T</span>
        </div>
        <div className="flex-1">
          <div className="text-xs font-medium text-gray-700">Teste</div>
          <div className="text-xs text-gray-500 truncate max-w-[150px]">
            {data.label || 'Nó de teste'}
          </div>
        </div>
      </div>

      <Handle type="source" position={Position.Bottom} className="w-3 !bg-gray-400" />
    </div>
  )
}

export default TestNode