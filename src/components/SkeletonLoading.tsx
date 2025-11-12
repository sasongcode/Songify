export default function SkeletonLoading() {
    return (
        <div className="space-y-16 py-10 px-4 sm:px-8">
        {/* Hero Skeleton */}
        <section className="animate-pulse bg-zinc-800/50 border border-zinc-700 rounded-2xl p-6 md:p-10 h-40 md:h-48 flex items-center justify-between">
          <div className="space-y-3 w-1/2">
            <div className="h-6 bg-zinc-700 rounded w-3/4" />
            <div className="h-4 bg-zinc-700 rounded w-1/2" />
          </div>
          <div className="w-32 h-32 bg-zinc-700 rounded-full" />
        </section>

        {/* Repeat Skeleton for sections */}
        {["Top Tracks", "Popular Artists", "New Releases"].map((title) => (
          <section key={title}>
            <h3 className="text-xl font-semibold mb-4 text-zinc-300">{title}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse flex flex-col space-y-3 bg-zinc-800/40 rounded-xl p-3"
                >
                  <div className="w-full aspect-square bg-zinc-700 rounded-lg" />
                  <div className="h-4 bg-zinc-700 rounded w-3/4 mx-auto" />
                  <div className="h-3 bg-zinc-700 rounded w-1/2 mx-auto" />
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    )
}