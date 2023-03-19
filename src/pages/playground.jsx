import Layout from "@/layout/Layout";
import {useEffect, useState} from "react";
import CheckApiModal from "@/components/CheckApiModal";
import {AiOutlineReload} from "react-icons/ai";



const Playground = () => {

    const [poemDescription, setPoemDescription] = useState("");
    const [hasApiKey, setHasApiKey] = useState(false);
    const [tone, setTone] = useState("");
    const [poem, setPoem] = useState("");
    const [loading, setLoading] = useState(false);

    const generatePoem = async (e) => {
        e.preventDefault()
        setLoading(true);

        const api_key = localStorage.getItem("apiKey");

        if (api_key) {

            if (poemDescription !== '' && tone !== '') {

                const poem_data = await fetch("/api/generatepoem", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        tone: tone,
                        description: poemDescription,
                        apiKey: api_key
                    })
                }).then(res => res.json()).then(data => {
                    setLoading(false);
                    setPoem(JSON.stringify(data.response.content))
                }).catch((err) => {
                    console.log(err)
                })
            }
        } else {
            setHasApiKey(false)
        }
    }


    useEffect(() => {
        const apiKey = localStorage.getItem("apiKey");
        if (apiKey) {
            setHasApiKey(true);
        }
    }, [])

    return <Layout>
        <div className="flex flex-col items-center justify-center pt-48 pb-20 min-h-screen">
            {!hasApiKey ?
                <CheckApiModal setHasApiKey={setHasApiKey}/>
                :

                <>
                    <h1 className={"text-4xl font-semibold text-center"}>Let's create a poem together!</h1>
                    <div className="md:w-[480px] w-10/12">

                        <form onSubmit={generatePoem} className={"mt-16 w-full flex flex-col gap-10"}>
                            <div>
                                <p className={"mb-2"}>What would be the tone of the poem?</p>
                                <input
                                    value={tone}
                                    onChange={(e) => setTone(e.target.value)}
                                    required
                                    className={"bg-transparent border border-black/50 p-3 rounded-sm placeholder:text-slate-600 outline-none w-full"}
                                    type="text" placeholder={"Type poem tone"}/>
                            </div>
                            <div>
                                <p className={"mb-2"}>Description about the poem or simply paste your old poem</p>
                                <textarea
                                    value={poemDescription}
                                    onChange={(e) => setPoemDescription(e.target.value)}
                                    required
                                    className={"bg-transparent border border-black/50  p-3 rounded-sm placeholder:text-slate-600 outline-none w-full"}
                                    name="" id="" cols="30"
                                    placeholder={"Description about the poem / paste your old poem"}
                                    rows="10"></textarea>
                            </div>

                            <button disabled={loading}
                                    className={`p-3 bg-black ${loading ? "bg-black/90" : "bg-black"} justify-center flex items-center gap-4 text-white`}>Generate
                                Poem {loading && <AiOutlineReload className={"animate-spin"}/>}</button>
                        </form>

                        {
                            poem !== "" && <div className="mt-10 pt-6 border-t border-dashed border-black/80 flex flex-col items-center gap-7">
                                <h1 className={"text-2xl font-medium border-b border-black/80"}>Poem is generated!</h1>

                            {/*from poem enter new line and spaces finding \n*/}
                            <p className={"text-center whitespace-pre-line"}>{poem.replace(/\\n/g, "\n")}</p>
                            </div>
                        }

                    </div>
                </>
            }


        </div>
    </Layout>
}

export default Playground