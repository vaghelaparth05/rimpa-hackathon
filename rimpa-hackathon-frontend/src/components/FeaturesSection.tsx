import { Button } from '@/components/ui/button'
import { Card } from './ui/card'
import Image from 'next/image'
import { ArrowUp, CalendarCheck, GlassWaterIcon, Globe, Play, Plus, Signature, Sparkles, Sun, Target, Waves, WavesIcon, Wind } from 'lucide-react'

const MESCHAC_AVATAR = 'https://avatars.githubusercontent.com/u/47919550?v=4'
const BERNARD_AVATAR = 'https://avatars.githubusercontent.com/u/31113941?v=4'
const THEO_AVATAR = 'https://avatars.githubusercontent.com/u/68236786?v=4'
const GLODIE_AVATAR = 'https://avatars.githubusercontent.com/u/99137927?v=4'

export default function FeaturesSection() {
    return (
        <section>
            <div className="py-24">
                <div className="mx-auto w-full max-w-5xl px-6">
                    <div>
                        <h2 className="text-foreground max-w-2xl text-balance text-4xl font-semibold">Empowering developers with AI-driven solutions</h2>
                    </div>
                    <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <Card
                            
                            className="overflow-hidden p-6 bg-neutral-100">
                            <Wind className="text-primary size-5" />
                            <h3 className="text-foreground mt-5 text-lg font-semibold">Solar Power</h3>
                            <p className="text-muted-foreground mt-3 text-balance">Solar energy powers data centers with 90% less carbon than coal alternatives</p>

                            <MeetingIllustration />
                        </Card>

                        <Card
                            className="group overflow-hidden px-6 pt-6 bg-neutral-100">
                            <Sun className="text-primary size-5" />
                            <h3 className="text-foreground mt-5 text-lg font-semibold">Wind Energy</h3>
                            <p className="text-muted-foreground mt-3 text-balance">Wind-powered servers reduce carbon emissions by 99% compared to fossil fuels</p>

                            <CodeReviewIllustration />
                        </Card>
                        <Card
                            
                            className="group overflow-hidden px-6 pt-6 bg-neutral-100">
                            <WavesIcon className="text-primary size-5" />
                            <h3 className="text-foreground mt-5 text-lg font-semibold">Hydropower</h3>
                            <p className="text-muted-foreground mt-3 text-balance">Hydroelectricity produces 50x less greenhouse gas than natural gas plants.</p>

                            <div className="mask-b-from-50 -mx-2 -mt-2 px-2 pt-2">
                                <AIAssistantIllustration />
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    )
}

const MeetingIllustration = () => {
    return (
        <Card>
            
            
            <Image src="/windmill.png" width={300} height={50} alt={''} />
        </Card>
    )
}

const CodeReviewIllustration = () => {
    return (
        <div>
            <Card>
            
            
            <Image src="/solar.png" width={300} height={50} alt={''} />
        </Card>
        </div>
    )
}

const AIAssistantIllustration = () => {
    return (
        <div>
            <Card>
            
            
            <Image src="/hydro.png" width={250} height={50} alt={''} />
        </Card>
        </div>
    )
}