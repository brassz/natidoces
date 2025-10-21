const LoadingScreen = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-primary-600 rounded-lg flex items-center justify-center animate-bounce">
          <span className="text-white font-bold text-xl">BF</span>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
          BotFlow Studio
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Carregando aplicação...
        </p>
        <div className="mt-4 flex justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600"></div>
        </div>
      </div>
    </div>
  )
}

export default LoadingScreen