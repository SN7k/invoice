import Button from '@/components/ui/button';
import Input from '@/components/ui/input';

export default function LoginRoutePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <section className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-900">Login</h1>
        <p className="mt-1 text-sm text-slate-600">Sign in to your salon admin dashboard.</p>

        <form className="mt-6 space-y-4">
          <Input label="Email" type="email" name="email" placeholder="admin@salon.com" />
          <Input label="Password" type="password" name="password" placeholder="Enter password" />
          <Button type="submit" className="w-full">Sign In</Button>
        </form>
      </section>
    </div>
  );
}