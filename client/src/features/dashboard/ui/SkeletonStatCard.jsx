const SkeletonStatCard = () => {
  return (
    <div className="relative rounded-3xl border border-white/5 
      bg-[#141414] h-60 w-full p-6 
      animate-pulse flex flex-col justify-between">

      <div className="h-3 w-24 bg-white/10 rounded" />

      <div className="space-y-3">
        <div className="h-8 w-32 bg-white/10 rounded" />
        <div className="h-4 w-40 bg-white/10 rounded" />
      </div>

      <div className="h-2 w-full bg-white/10 rounded" />
    </div>
  );
};

export default SkeletonStatCard;
