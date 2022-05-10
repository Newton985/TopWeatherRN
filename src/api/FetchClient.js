export const FetchClient = {
    GET : (url, onSuccess, onFailure) => {
        fetch(url,{
            method: "GET"})
        .then(response =>  response.json())
        .then(responseData => {
           onSuccess(responseData)
         })
        .catch(err => {
            console.log(err)
            onFailure(err)
        })
    }
}