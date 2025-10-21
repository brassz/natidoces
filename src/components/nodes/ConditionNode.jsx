import { Handle, Position } from 'reactflow'
import { GitBranch } from 'lucide-react'

const ConditionNode = ({ data, selected }) => {
  return (
    <div className={`px-4 py-2 shadow-md rounded-lg bg-white border-2 border-stone-400 min-w-[200px] ${
      selected ? 'border-primary-500' : ''
    }`}>
      <Handle type="target" position={Position.Top} className="w-3 !bg-gray-400" />
      
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
          <GitBranch className="h-3 w-3 text-white" />
        </div>
        <div className="flex-1">
          <div className="text-xs font-medium text-gray-700">Condição Lógica</div>
          <div className="text-xs text-gray-500 mt-1">
            {data.condition || 'Se resposta = X'}
          </div>
        </div>
      </div>

      <Handle 
        type="source" 
        position={Position.Bottom} 
        id="true"
        className="w-3 !bg-green-500" 
        style={{ left: '25%' }}
      />
      <Handle 
        type="source" 
        position={Position.Bottom} 
        id="false"
        className="w-3 !bg-red-500" 
        style={{ left: '75%' }}
      />
    </div>
  )
}

export default ConditionNode