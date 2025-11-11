interface ArtistCardProps {
  name: string;
  image: string;
}

export default function ArtistCard({ name, image }: ArtistCardProps) {
  return (
    <div className="text-center hover:bg-zinc-900 rounded-xl p-3 transition">
      <img
        src={image}
        alt={name}
        className="rounded-full w-28 h-28 mx-auto mb-2 object-cover border border-zinc-800"
      />
      <p className="text-sm font-medium text-zinc-300">{name}</p>
    </div>
  );
}
