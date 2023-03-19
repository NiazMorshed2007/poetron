import {useState} from "react";
import {AiOutlineReload} from "react-icons/ai";

const CheckApiModal = (props) => {
    const {setHasApiKey} = props;
    const [apiKey, setApiKey] = useState("");
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState("")

    const testApi = async (e) => {
        e.preventDefault()
        setLoading(true);
        console.log(JSON.stringify({apiKey: apiKey}))
        const isValidApi = fetch("/api/testApi", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({apiKey: apiKey})
        }).then(res => res.json()).then(data => {
            localStorage.setItem("apiKey", apiKey)
            setErr("")
            setHasApiKey(true)
            setLoading(false)
        }).catch(err => {
            setErr("Invalid Api Key")
            setLoading(false)
        })
    }

    return <>
        <div
            className={"fixed top-0 left-0 z-40 modal-wrapper w-screen h-screen flex items-center justify-center bg-black/40"}>
            <div className="modal w-[600px] p-8 bg-secondary rounded-xl">
                <h1 className={"text-3xl mb-1 font-semibold"}>Before you start!</h1>
                <p>To use this tool you need to put your openai api key as it is a free and open source tool. No
                    worries your data are not stored anywhere, it's only in your localStorage which will automatically be cleared</p>

                <form className={"mt-5"} onSubmit={testApi}>
                    <input value={apiKey} onChange={
                        (e) => {
                            setApiKey(e.target.value)
                        }
                    } type="text"
                           className={"bg-transparent border border-black/50 p-3 rounded-sm placeholder:text-slate-600 outline-none w-full"}
                           placeholder={"Api Key"}/>
                    {err !== "" &&
                    <p className="text-red-500 mt-3">{err}</p>
                    }
                    <button disabled={loading} className={`p-3 mt-7 w-full ${loading ? "bg-black/90" : "bg-black"} justify-center flex items-center gap-4 text-white`}>Submit {loading && <AiOutlineReload className={"animate-spin"} />}</button>
                </form>
            </div>
        </div>
    </>
}

export default CheckApiModal