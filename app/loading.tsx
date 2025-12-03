export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-products-bg z-[100]">
      <div className="noise-overlay" />
      <div className="flex space-x-2">
        <div
          className="h-3 w-3 animate-bounce rounded-full bg-custom-orange/80"
          style={{ animationDelay: '0s' }}
        />
        <div
          className="h-3 w-3 animate-bounce rounded-full bg-custom-orange/80"
          style={{ animationDelay: '0.1s' }}
        />
        <div
          className="h-3 w-3 animate-bounce rounded-full bg-custom-orange/80"
          style={{ animationDelay: '0.2s' }}
        />
      </div>
    </div>
  );
}