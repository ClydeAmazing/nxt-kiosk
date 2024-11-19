import { useOrderContext } from "../context/OrderContext";

export default function Header() {
  const { orderType } = useOrderContext();

  return (
    <header className="sticky top-0 z-40 bg-teal-600 text-white shadow-md">
      <div className="px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold">nxt-kiosk</h1>
            {orderType && (
              <span className="bg-teal-500 px-3 py-1 rounded-full text-sm font-medium">
                {orderType}
              </span>
            )}
          </div>
          <div className="text-sm">
            {new Date().toLocaleString('en-US', { 
              hour: 'numeric',
              minute: '2-digit',
              hour12: true,
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
        </div>
      </div>
    </header>
  );
} 