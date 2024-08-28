import { json } from "stream/consumers"

export {}

console.log(
  "Live now; make now always the most precious time. Now will never come again."
)

// const apiUrl = 'http://localhost:3000/api/userData' ;
// const resp = await fetch(apiUrl) ;
// const jsonResp = resp.json() ;
// console.log("resp bg-sw: " + jsonResp) ;

chrome.runtime.onMessage.addListener(async (msg, sender, sendResponse) => {
  console.log('background script called')
  const apiUrl = "http://localhost:3000/api/user"
  // Fetch data from the API
  const userData = await fetch(apiUrl)
    .then((response) => {
      // Check if the response is ok (status code 200-299)
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      // Parse the response body as JSON
      return response.json()
    })
    // .then((data) => {
    //   // Log the JSON data to the console
    //   //console.log("Fetched data:", JSON.stringify(data))
    //   return JSON.stringify(data) 
    // })
    .catch((error) => {
      // Log any errors that occur during the fetch
      console.error("Fetch error:", error)
    })
  console.log("listener")
  console.log(msg)
  console.log(sender)
  sendResponse(userData)
})
