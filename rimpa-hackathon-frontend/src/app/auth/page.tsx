import Link from 'next/link'

export default function Page() {
  return (
    <div>
      <h1>Admin</h1>
      <Link href="/auth">Go to auth</Link>
    </div>
  )
}
