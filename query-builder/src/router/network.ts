const url = 'https://localhost:9000/insert';

let data = {
  tableName: "users",
  insertArray: [
    {id: 123, name: "avi", city:"Holon"},
    ]
}

let request = new Request(url, {
  method: 'POST',
  body: JSON.stringify(data),
  headers: new Headers({
    'Content-Type': 'application/json; charset=UTF-8'
  })
});

const insert = () => { fetch(url, request)
  .then(function() {
    // Handle response you get from the API
  })};