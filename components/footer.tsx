export default function Footer() {
  return (
    <div className="w-full mt-20 flex py-8 bg-zinc-900">
      <div className="w-full m-auto justify-between flex max-w-[1440px]">
        <div className="flex flex-col gap-2">
          <span className="text-xl text-white font-semibold">Mstore</span>
          <div className="flex flex-col gap-2">
            <span className="text-zinc-400">Next + Shopify</span>
          </div>
        </div>
        <div>
          <span className="text-white">@Mateus Gustavo</span>
        </div>
      </div>
    </div>
  )
}
