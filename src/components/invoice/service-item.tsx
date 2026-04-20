import Input from '@/components/ui/input';

interface ServiceItemProps {
  index: number;
}

export default function ServiceItem({ index }: ServiceItemProps) {
  return (
    <div className="grid gap-3 rounded-lg border border-slate-200 p-3 md:grid-cols-3">
      <Input label={`Service ${index + 1}`} name={`service-${index}`} placeholder="Service name" />
      <Input label="Qty" name={`qty-${index}`} type="number" placeholder="1" />
      <Input label="Price" name={`price-${index}`} type="number" placeholder="0" />
    </div>
  );
}