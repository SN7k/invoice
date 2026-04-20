interface ServiceCardProps {
  name: string;
  price: number;
}

export default function ServiceCard({ name, price }: ServiceCardProps) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4 dark:border-[#282828] dark:bg-[#1f1f1f]">
      <h3 className="text-base font-semibold text-slate-900 dark:text-white">{name}</h3>
      <p className="mt-1 text-sm text-slate-600 dark:text-[#a3a3a3]">Rs. {price}</p>
    </article>
  );
}