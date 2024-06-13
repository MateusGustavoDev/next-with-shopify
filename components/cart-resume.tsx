import { formatPrice } from '@/utils/format-price'
import { Separator } from './ui/separator'

function CartSeparator() {
  return <Separator className="bg-zinc-800 w-full h-[0.063rem]" />
}

interface CartResumeProps {
  subtotal: string
}

export function CartResume({ subtotal }: CartResumeProps) {
  return (
    <div className="w-full">
      <CartSeparator />
      <div className="w-full flex items-center py-3 justify-between">
        <span className="text-sm text-white font-medium">Subtotal:</span>
        <span className="text-sm text-white font-medium">{formatPrice(Number(subtotal))}</span>
      </div>
      <CartSeparator />
      <div className="w-full flex items-center py-3 justify-between">
        <span className="text-sm text-white font-medium">Entrega:</span>
        <span className="text-sm text-white font-medium">GRÁTIS</span>
      </div>
      <CartSeparator />
      <div className="w-full flex items-center py-3 justify-between">
        <span className="text-sm text-white font-medium">Descontos:</span>
        <span className="text-sm text-white font-medium">- R$ 150,00</span>
      </div>
      <CartSeparator />
      <div className="w-full flex items-center py-3 justify-between">
        <span className="font-bold text-white">total:</span>
        <span className="font-bold text-white">R$ 5.100,00</span>
      </div>
    </div>
  )
}
