export default function ProductCardSkeleton() {
  return (
    <div
      className="animate-pulse overflow-hidden rounded-lg border border-[#E4E6EB] bg-white"
      aria-hidden="true"
    >
      <div className="h-1 w-full bg-[#EDEEF1]" />
      <div className="aspect-[4/3] w-full bg-[#EEF0F3]" />
      <div className="flex flex-col gap-3 p-5">
        <div className="h-4 w-3/4 rounded bg-[#EEF0F3]" />
        <div className="h-3 w-full rounded bg-[#EEF0F3]" />
        <div className="h-3 w-2/3 rounded bg-[#EEF0F3]" />
        <div className="mt-2 flex items-center justify-between border-t border-[#EDEEF1] pt-3">
          <div className="h-4 w-16 rounded bg-[#EEF0F3]" />
          <div className="h-3 w-20 rounded bg-[#EEF0F3]" />
        </div>
        <div className="mt-1 h-9 w-full rounded-md bg-[#EEF0F3]" />
      </div>
    </div>
  );
}