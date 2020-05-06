export default {
    register : user =>{
        console.log(user);
        return fetch('/register',{
            method : "post",
            body : JSON.stringify(user),
            headers : {
                "Accept": "application/json",
                'Content-Type' : 'application/json'
            }
        }).then(res => res.json())
          .then(data => data);
         
    },
    
}