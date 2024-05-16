export function Header() {
  return (
    <div className="w-full p-5 shadow-xl sticky top-0 bg-black border-b border-zinc-800 ">
      <div className="w-full max-w-[1400px] m-auto h-full flex items-center justify-between">
        <span className="font-bold text-3xl text-blue-700">Mstore</span>
        <button className="font-semibold bg-blue-700 px-4 py-2 rounded-lg hover:bg-blue-800 text-white">
          Carrinho
        </button>
      </div>
    </div>
  )
}
