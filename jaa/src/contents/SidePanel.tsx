import cssText from "data-text:~style.css"
import { useState } from "react"
import { sendToBackground } from "@plasmohq/messaging"


export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const parseJobContent = (jobContent) => {

}

const callAPI = async () => {
    
    chrome.runtime.sendMessage(null, "did you get this message?", (response) => {
        console.log("I'm from the send response function: " + response)
    }) ; 
    // const resp = await sendToBackground({
    //     name: "ping",
    //     body: {
    //         id:123
    //     }
    // })
    // const apiUrl = 'http://localhost:3000/api/userData' ; 
    // const resp = await fetch(apiUrl) ; 
    //console.log('resp: ' + resp) ; 
    //console.log('resp: ' + JSON.stringify(resp)) ; 
}

const getUserInfo = async (infoNeeded) => {
    console.log("infoNeeded: " + infoNeeded) ; 
    await callAPI()
    if(infoNeeded === "first_name"){
        return "Ashok"
    }else if(infoNeeded === "last_name"){
        return "Kamath"
    }else if(infoNeeded === "email"){
        return "ashok.kamath08@gmail.com"
    }else if(infoNeeded === "phone"){
        return "317-855-9090"
    }else {
        return ""
    }
}

const handleEducationSection = async () => {
    
}

const handleAutoFill = async () => {
    
    const jobContent = document.getElementById("content") ; 
    if(jobContent){
        parseJobContent(jobContent) ; 
        await handleEducationSection() ; 
    }
    
    const mainFields = document.getElementById("main_fields") ; 
    const fields = mainFields.getElementsByClassName("field") ; 
    const education_section = mainFields.getElementsByClassName("education") ; 
    if(education_section){
        console.log("found education section") ; 
    }

    for(let i = 0 ; i < fields.length ; i++){
        const inputs = fields[i].getElementsByTagName('input') ; 
        for(let j = 0 ; j < inputs.length ; j++){
            const input = inputs[j] ; 
            let userInfo = getUserInfo(input.id) ;
            console.log("input_id: " + input.id + " user_info: " + userInfo) ; 
            input.value = await getUserInfo(input.id) ; 
        }
    }
}
const SidePanel = () => {
    const [visible, setVisible] = useState<boolean>(true) ; 

    const handleOpenClose = () => {
        setVisible(!visible) ; 
    }

    const divClassname = "fixed right-0 bg-white" ; 
    return (
        <>
        <div className={visible ? (divClassname + "h-[40vh] flex flex-col w-1/6 justify-evenly border border-black-300 rounded-3xl p-4 m-8"):(divClassname + "h-[10vh] ") }>
            <button onClick={handleOpenClose} className="border border-black p-4 top-0 left-0">&gt;</button>
            {visible ? <>
                    <h2 className="text-black text-5xl text-center">ZenApply</h2>
                    <button
                        onClick={handleAutoFill}
                        className="bg-customPink text-black border border-black-300 p-8 rounded-xl text-2xl  m-4">
                        Autofill
                    </button>
                </> : <></>
            }
        </div>
        </>
  )
}

export default SidePanel
