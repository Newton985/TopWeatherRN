export const FetchClient = {
    GET : (url, onSuccess, onFailure) => {
        console.log("REQUEST", url)
        fetch(url,{
            method: "GET"})
        .then(response =>  response.json())
        .then(responseData => {
           console.log("RESPPPPP")
           onSuccess(responseData)
         })
        .catch(err => {
            console.log(err)
            onFailure(err)
        })
    }
}