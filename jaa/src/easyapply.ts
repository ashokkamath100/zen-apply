export default async function handleLinkedInEasyApply() {
  const jobs = document.getElementsByClassName("jobs-search-results-list")
  console.log(jobs)

  const container = document.getElementsByClassName(
    "scaffold-layout__list-container"
  )[0]

  container.scrollTop = container.scrollHeight

  const listItems = container.getElementsByTagName("li")

  // Iterate over the HTMLCollection using a for loop
  for (let i = 0; i < listItems.length; i++) {
    console.log(listItems[i].textContent) // or listItems[i].innerText
    const job = listItems[i]
    await clickJob(job)
    //    setTimeout(() => clickJob(job), 3000)
  }
}

const clickJob = async (job) => {
  job.scrollIntoView({ behavior: "smooth", block: "center" })
  job.click()
  await fillEasyApplyForm()
  return new Promise((resolve) => setTimeout(resolve, 1000))
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const fillEasyApplyForm = async () => {
  const button = document.querySelector("button.jobs-apply-button")

  if (button) {
    button.click()
    console.log("delay execution of fillEasyApplyForm")
    await delay(3000)
    console.log("delay finished")
    const formDiv = document.getElementsByClassName(
      "jobs-easy-apply-content"
    )[0]

    await handleForm(formDiv)
  }
}

const handleForm = async (formDiv) => {
  while (true) {
    console.log("formDiv: ", formDiv)
    const nextButton = await getButtonByText(formDiv, "Next")
    if (nextButton) {
      console.log("found next button")
      nextButton.click()
      await delay(1000) // Add a delay to allow the next page to load
      const feedback = await checkForFeedback(formDiv)
      if (feedback) {
        await handleInputFields(formDiv)
      }
    } else {
      const reviewButton = await getButtonByText(formDiv, "Review")

      if (reviewButton) {
        console.log("review button found")
        await delay(1000)
        reviewButton.click()
        await delay(1000)
        // Add a delay to allow the next page to load
        const feedback = await checkForFeedback(formDiv)
        if (feedback) {
          await handleInputFields(formDiv)
        }
      } else {
        const submitButton = await getButtonByText(formDiv, "Submit application")

        await delay(1000) // Add a delay to allow the next page to load

        if (submitButton) {
          console.log("submit button found")
          submitButton.scrollIntoView({ behavior: "smooth", block: "center" })


          submitButton.click()
          await delay(5000)
          const button = document.querySelector('button[aria-label="Dismiss"]');
          button.click() 
          break
        } else {
          console.log("no more buttons to click")
          break
        }
      }
    }
  }
}
// data-test-form-builder-radio-button-form-component
const handleInputFields = async (formDiv) => {
  const sections = formDiv.getElementsByClassName(
    "jobs-easy-apply-form-section__grouping"
  )

  for (let i = 0; i < sections.length; i++) {
    const currSection = sections[i]
    console.log(currSection.textContent)

    const inputField = currSection.getElementsByTagName("input")[0]
    console.log("inputField in handleInputFields: ", inputField)
    if (inputField.type === "text") {
      // Confirm the input is of type text
      // Step 4: Check if the input is already filled
      if (!inputField.value) {
        // If the input is empty
        inputField.value = 5 // Example value to fill
        inputField.dispatchEvent(new Event('input', { bubbles: true }));
        inputField.dispatchEvent(new Event('change', { bubbles: true }));
        console.log(
          "Input field was empty and is now filled with value:",
          inputField.value
        )
      } else {
        console.log(
          "Input field is already filled with value:",
          inputField.value
        )
      }
    }

    await delay(1000)
  }
}

async function getButtonByText(element, text) {
  const buttons = element.querySelectorAll("button")
  return Array.from(buttons).find(
    (button) => button.textContent.trim() === text
  )
}

async function checkForFeedback(formDiv) {
  const feedback = formDiv.getElementsByClassName(
    "artdeco-inline-feedback__message"
  )

  if (feedback) {
    console.log("part needs to be filled")
    return "feedback"
  } else {
  }
}
