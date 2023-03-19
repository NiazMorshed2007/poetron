import {Lora} from "@next/font/google";
import Link from "next/link";
import {motion} from "framer-motion";
import Layout from "@/layout/Layout";
import {useState, useEffect} from "react";
import Head from "next/head";

const lora = Lora({subsets: ['latin']});

export default function Home() {

    const [stars, setStars] = useState(0);

    const initial_nav_left = {
        opacity: 0,
        scale: 1.3,
        x: 30
    }

    const anim_nav_left = {
        opacity: 1,
        scale: 1,
        x: 0
    }
    const duration = .25


    useEffect(() => {
        fetch("https://api.github.com/repos/NiazMorshed2007/poetron")
            .then(res => res.json())
            .then(data => {
                setStars(data.stargazers_count)
            })

    },[])


    return <Layout stars={stars}>
        <Head>
            <title>Poetron | Verse creativity</title>
        </Head>
        <section className="hero overflow-hidden w-screen flex-col h-screen flex items-center justify-center relative">

            <motion.img initial={{opacity: 0}} animate={{opacity: 1}} transition={{delay: 1}}
                        className={"absolute lg:block hidden top-30 -left-6 w-[470px] -z-10"} src="/hero-svg.svg"
                        alt=""/>

            <motion.h1 initial={{
                opacity: 0,
                scale: 2,
                y: 30
            }} animate={{
                opacity: 1,
                scale: 1,
                y: 0
            }} transition={{
                duration: .4,
            }} className={"text-3xl md:text-5xl text-center font-medium mb-5"}>Verse your way into creativity
            </motion.h1>
            <motion.p
                initial={{
                    opacity: 0,
                    y: 30
                }} animate={{
                opacity: 1,
                y: 0
            }} transition={{
                duration: .5,
                delay: .4
            }} className={"md:w-1/2 w-8/12 md:text-base text-sm text-center"}>Are you struggling with writer's block and
                need a boost of inspiration?
                Look no further than our app, which uses the gpt-3.5-turbo api to generate personalized poems that
                capture your thoughts and feelings.
            </motion.p>

            <div className="mt-10 flex items-center gap-7">
                <Link href={"/playground"}>
                    <motion.button initial={initial_nav_left} animate={anim_nav_left} transition={{duration, delay: .4}}
                                   className={"md:p-3 md:px-6 p-2 md:text-base text-sm shadow-xl shadow-black/30 px-3 bg-black text-white rounded-full"}>Go
                        to Playground
                    </motion.button>
                </Link>
                <a rel="stylesheet" href="https://github.com/NiazMorshed2007/poetron" target={"_blank"}>
                    <motion.button initial={initial_nav_left} animate={anim_nav_left} transition={{duration, delay: .4}}
                                   className={"border md:p-3 md:px-6 p-2 md:text-base text-sm border-dashed border-black rounded-full px-3 text-sm"}>Star
                        on
                        Github ({stars})
                    </motion.button>
                </a>
            </div>

            <p className={"absolute bottom-2 -translate-x-1/2 left-1/2"}>Created with ❤️ by <a href={"github.com/NiazMorshe2007"} target={"_blank"}>Niaz Morshed</a></p>
        </section>


    </Layout>
}