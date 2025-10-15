'use client'

import { title } from "@/utils/primitives";
import { useParams } from 'next/navigation'

export default function PricingPage() {
  const searchParams = useParams()
  console.log(searchParams);
  return (
    <div>
      <h1 className={title()}>Pricing</h1>
    </div>
  );
}
