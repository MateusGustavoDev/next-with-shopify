import SpinnerLoading from './spinner-loading'

export function Button() {
  const loading = true
  return (
    <button
      //   onClick={handleAddToCardClick}
      data-loading={loading}
      className="w-full bg-blue-700 data-[loading=true]:cursor-none hover:bg-blue-800 uppercase p-2 text-sm py-3 text-white font-semibold rounded-lg"
    >
      {loading && <SpinnerLoading />}
      Adicionar ao carrinho
    </button>
  )
}
