import {motion} from "framer-motion";
import Link from "next/link";
import {Lora} from "@next/font/google";

const lora = Lora({subsets: ['latin']});

const Layout = ({children}) => {

    return <main className={`${lora.className}`}>

        <header className={"flex fixed z-50 top-0 w-full left-0 items-center justify-between px-[7%] py-4"}>
            <h1 className={"text-2xl font-bold"}>Poetron</h1>
            <nav className="sm:flex hidden items-center gap-8">
                <Link className={"md:text-base text-sm"} href={"/playground"}>
                    Playground
                </Link>
                <button className={"border md:p-3 md:px-6 p-2 md:text-base text-xs border-dashed border-black p-3 rounded-full px-6 text-sm"}>Star on
                    Github
                </button>
            </nav>
        </header>

        <div className="children-wrapper">{children}</div>
    </main>
}


export default Layout