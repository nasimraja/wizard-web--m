export function API(variables, apiName, apiMethod) {
    const baseUrl="http://ec2-13-127-247-79.ap-south-1.compute.amazonaws.com:5000/";
    // const baseUrl="https://rallycoding.herokuapp.com/api/";
    var init = apiMethod == "GET" ? {
        method: "GET",
        headers: {
            'Content-Type': "application/json",
        },
    } :
        {
            method: apiMethod,
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify(variables)
        }

    return fetch(baseUrl + apiName, init)
        .then(response => response.json()
            .then(responseData => {
                // console.log(" apiRequest   =>"+JSON.stringify(responseData));
                return responseData;
            }))
        .catch(err => {
            return { responseMessage: "Something went wrong." }
        });
}

export default API;