
import Link from 'next/link'

const members = [
    {
        name: 'Ayush Indapure',
        role: 'Frontend Developer',
        avatar: 'https://avatars.githubusercontent.com/u/119341956?v=4',
        link: 'https://www.linkedin.com/in/ayushindapure/',
    },
    {
        name: 'Parth Vaghela',
        role: 'Full Stack Developer',
        avatar: 'https://media.licdn.com/dms/image/v2/C4E03AQHy6q3JiSiISw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1643548538095?e=1762992000&v=beta&t=zZr04werMslLgm5dZmju9SFBe4OXsAjD2ac5qgPRTFY',
        link: 'https://www.linkedin.com/in/parth-vaghela-0b1a1b1a3/',
    },
    {
        name: 'Joseph Saji',
        role: 'Backend Developer',
        avatar: 'https://avatars.githubusercontent.com/u/77894439?v=4',
        link: 'https://www.linkedin.com/in/josephsaji/',
    },
    {
        name: 'Gaurav Myana',
        role: 'Full Stack Developer',
        avatar: 'https://avatars.githubusercontent.com/gauravmyana',
        link: 'https://www.linkedin.com/in/gauravmyana/',
    },
]

export default function TeamSection() {
    return (
        <section className="bg-gray-50 py-16 md:py-32 dark:bg-transparent">

            <div className="mx-auto max-w-5xl border-t px-6">
                <span className="text-caption -ml-6 -mt-3.5 block w-max bg-gray-50 px-6 dark:bg-neutral-900">Team</span>
                <div className="mt-12 gap-4 sm:grid sm:grid-cols-2 md:mt-24">
                    <div className="sm:w-2/5">
                        <p className="text-3xl font-bold sm:text-4xl ">Our dream team</p>
                    </div>
                    <div className="mt-6 sm:mt-0">
                        <p>Call us a group of 4 uni students — but we’ve got the skills and shipped work to prove we’re ready for anything.</p>
                    </div>
                </div>
                <div className="mt-12 md:mt-24">
                    <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                        {members.map((member, index) => (
                            <div key={index} className="group overflow-hidden">
                                <img className="h-96 cursor-pointer w-full rounded-md object-cover object-top grayscale transition-all duration-500 hover:grayscale-0 group-hover:h-[22.5rem] group-hover:rounded-xl" src={member.avatar} alt="team member" width="826" height="1239" />
                                <div className="px-2 cursor-pointer pt-2 sm:pb-0 sm:pt-4">
                                    <div className="flex justify-between">
                                        <h3 className="text-title text-base font-medium transition-all duration-500 group-hover:tracking-wider">{member.name}</h3>
                                        <span className="text-xs">_0{index + 1}</span>
                                    </div>
                                    <div className="mt-1 flex items-center justify-between">
                                        <span className="text-muted-foreground inline-block translate-y-6 text-sm opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">{member.role}</span>
                                        <Link href={member.link} className="group-hover:text-primary-600 dark:group-hover:text-primary-400 inline-block translate-y-8 text-sm tracking-wide opacity-0 transition-all duration-500 hover:underline group-hover:translate-y-0 group-hover:opacity-100">
                                            {' '}
                                            LinkedIn
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
        </section>
    )
}
