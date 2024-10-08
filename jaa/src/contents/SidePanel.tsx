import cssText from "data-text:~style.css"
import { useState } from "react"

import { sendToBackground } from "@plasmohq/messaging"

import handleLinkedInEasyApply from "~easyapply"

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const parseJobContent = (jobContent) => {}

const callAPI = async () => {
  const response = await new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(
      null,
      "did you get this message?",
      (response) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError)
        } else {
          resolve(response)
        }
      }
    )
  })

  return response
}

const getUserInfo = async (userData, infoNeeded) => {
  console.log("infoNeeded: " + infoNeeded)
  //await callAPI()
  if (infoNeeded === "first_name") {
    return userData.profile.firstName
  } else if (infoNeeded === "last_name") {
    return userData.profile.lastName
  } else if (infoNeeded === "email") {
    return userData.profile.contactEmail
  } else if (infoNeeded === "phone") {
    return userData.profile.phoneNumber
  } else if (infoNeeded === "location_autocomplete_label") {
    return userData.profile.location
  } else {
    return ""
  }
}

const handleEducationSection = async () => {}

const handleMainFields = async (fields, userData) => {
  for (let i = 0; i < fields.length; i++) {
    const inputs = fields[i].getElementsByTagName("input")
    for (let j = 0; j < inputs.length; j++) {
      const input = inputs[j]
      input.value = await getUserInfo(userData, input.id)
    }
  }
}

const handleSelect = async (field, selectValue) => {
  const select = field.getElementsByTagName("select")
  console.log("handleSelect called for field: ", field)
  if (select) {
    console.log("field, select", field, select)
    select[0].value = selectValue
    select[0].dispatchEvent(new Event("change"))
  }
}

const handleCustomFields = async (fields, userData) => {
  console.log("handling custom fields")
  console.log("fields: ", fields)
  let disability = document.getElementById("job_application_disability_status")
  if (disability) {
    console.log("found disability")
    disability.value = "0"
  }
  for (let i = 0; i < fields.length; i++) {
    const label = fields[i].getElementsByTagName("label")
    console.log(label[0].textContent)

    if (
      label[0].textContent.includes(
        "Are you legally authorized to work in the United States?"
      )
    ) {
      console.log("legally authorized")
      await handleSelect(label[0], "1")
    }
    if (
      label[0].textContent.includes(
        "Do you require sponsorship for employment visa status?"
      )
    ) {
      console.log("sponsorship")
      await handleSelect(label[0], "0")
    }
  }
}

const handleEEOCSelect = async (field, selectElement, selectValue) => {
  console.log("handleSelect called for field: ", field)
  if (selectElement) {
    console.log("field, select", field, selectElement)
    selectElement.value = selectValue
    selectElement.dispatchEvent(new Event("change"))
  }
}

const handleEEOCFields = async (fields, userData) => {
  console.log("handling eeoc fields")
  console.log("fields: ", fields)

  for (let i = 0; i < fields.length; i++) {
    const label = fields[i].getElementsByTagName("label")
    const selectElement = fields[i].getElementsByTagName("select")[0]
    console.log(label[0].textContent)

    if (label[0].textContent.includes("Disability Status")) {
      console.log("disability status")
      await handleEEOCSelect(label[0], selectElement, "2")
    }
    if (label[0].textContent.includes("Are you Hispanic/Latino?")) {
      console.log("hispanic/latino")
      await handleEEOCSelect(label[0], selectElement, "No")
    }
    if (label[0].textContent.includes("Veteran Status")) {
      console.log("veteran status")
      await handleEEOCSelect(label[0], selectElement, "1")
    }
    if (label[0].textContent.includes("Gender")) {
      console.log("gender")
      await handleEEOCSelect(label[0], selectElement, "1")
    }
  }
}

const handleAutoFill = async () => {
  const currentUrl = window.location.href

  // Get the domain name
  const domain = window.location.hostname
  if (domain === "www.linkedin.com") {
    handleLinkedInEasyApply()
  } else {
    // Get the path of the URL
    const path = window.location.pathname

    console.log(`Current URL: ${currentUrl}`)
    console.log(`Domain: ${domain}`)
    console.log(`Path: ${path}`)
    const jobContent = document.getElementById("content")
    if (jobContent) {
      parseJobContent(jobContent)
      await handleEducationSection()
    }

    const userData = await callAPI()
    console.log("userData in handleAutofill: ", typeof userData)

    const mainFieldsDiv = document.getElementById("main_fields")
    const mainFields = mainFieldsDiv.getElementsByClassName("field")
    const education_section = mainFieldsDiv.getElementsByClassName("education")
    if (education_section) {
      console.log("found education section")
    }
    handleMainFields(mainFields, userData)

    const customFieldsDiv = document.getElementById("custom_fields")
    const customFields = customFieldsDiv.getElementsByClassName("field")
    handleCustomFields(customFields, userData)

    const eeocFieldsDiv = document.getElementById("eeoc_fields")
    const eeocFields = eeocFieldsDiv.getElementsByClassName("field")
    handleEEOCFields(eeocFields, userData)

    const demoFieldsDiv = document.getElementById("demographic_questions")
    const demoFields = demoFieldsDiv.getElementsByClassName("field")
    handleEEOCFields(demoFields, userData)
  }
}
const SidePanel = () => {
  const [visible, setVisible] = useState<boolean>(false)

  const handleOpenClose = () => {
    setVisible(!visible)
  }

  return (
    <>
      <div
        className={
          visible
            ? "fixed right-0 h-[40vh] flex flex-col bg-white w-1/6 justify-evenly border border-black-300 rounded-3xl p-4 m-8"
            : "fixed top-52 right-0 h-[10vh] "
        }>
        <button
          onClick={handleOpenClose}
          className="border border-black bg-white p-4 top-0 right-0 rounded-2xl">
          &gt;
        </button>
        {visible ? (
          <>
            <h2 className="text-black text-5xl text-center">ZenApply</h2>
            <button
              onClick={handleAutoFill}
              className="bg-customPink text-black border border-black-300 p-8 rounded-xl text-2xl  m-4">
              Autofill
            </button>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  )
}

export default SidePanel
