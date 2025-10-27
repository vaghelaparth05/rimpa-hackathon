import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { BookOpen } from 'lucide-react'
import { cn } from '@/lib/utils'
import Navbar from '@/components/Navbar'

export default function HeroSection() {
    return (
      <>
        <Navbar />
        <section className="py-20">
            <div className="relative z-10 mx-auto w-full max-w-2xl px-6 lg:px-0">
                <div className="relative text-center">
                    <MistKitLogo className="mx-auto" />
                    <h1 className="mx-auto mt-16 border-none max-w-xl text-balance text-5xl font-medium">Work Smart. <br/>Help the Planet.</h1>

                    <p className="text-muted-foreground mx-auto mb-6 mt-4 text-balance text-xl">Do your digital tasks when clean energy is high and reduce CO₂ at the same time.</p>

                    <div className="flex flex-col items-center gap-2 *:w-full sm:flex-row sm:justify-center sm:*:w-auto">
                        <Button
                            asChild
                            variant="default">
                            <Link href="#link">
                                <span className="text-nowrap bg-black px-5 py-2 text-white rounded-3xl">Green Upload</span>
                            </Link>
                        </Button>
                        <Button
                            asChild
                            variant="ghost">
                            <Link href="#link">
                                <span className="text-nowrap">View Demo</span>
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="relative mt-12 overflow-hidden rounded-3xl bg-black/10 md:mt-16">
                    <img
                        src="https://images.unsplash.com/photo-1547623641-d2c56c03e2a7?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt=""
                        className="absolute inset-0 size-full object-cover"
                    />

                    <div className="bg-background rounded-(--radius) relative m-4 overflow-hidden  border-transparent shadow-xl shadow-black/15  sm:m-8 md:m-12">
                        <Image
                            src="/dashboard copy.png"
                            alt="Our dashboard!"
                            width="2880"
                            height="1842"
                            className="object-top-left rounded-2xl size-full object-cover"
                        />
                    </div>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                    <p className="text-muted-foreground text-center">Trusted by teams at :</p>
                    <div className="flex flex-wrap items-center justify-center gap-8">
                        <div className="flex">
                            <img
                                className="mx-auto h-10 w-fit"
                                src="https://www.rimpa.com.au/assets/img/logo.svg"
                                alt="RMIPA"
                                height="20"
                                width="auto"
                            />
                        </div>

                       
                    </div>
                </div>
            </div>
        </section>
      </>
    )
}

const MistKitLogo = ({ className }: { className?: string }) => (
    <div
        aria-hidden
        className={cn('border-background bg-linear-to-b  relative flex size-9 translate-y-0.5 items-center justify-center rounded-lg border-white from-green-200 to-green-400 shadow-lg shadow-black/20 ring-1 ring-black/10', className)}>
        <Image src="/facetime.png" alt="logo" width={36} height={36} />
        <div className="z-1 h-4.5 absolute inset-2 m-auto w-px translate-y-px rounded-full bg-black/10"></div>
    </div>
)