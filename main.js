

document.addEventListener('DOMContentLoaded', function () {
    var userform = document.getElementById('flikartdetails');
    var allkeys = JSON.parse(localStorage.getItem('allkeys')) || [];

    userform.addEventListener('submit', function (event) {
        event.preventDefault();
        var chooseprice = document.getElementById('price').value;
        var chooseitems = document.getElementById('name').value;
        var choosetables = document.getElementById('category').value;

        var newobj = {
            chooseitems: chooseitems,
            chooseprice: chooseprice,
            choosetables: choosetables,
        };

        axios.post("https://crudcrud.com/api/e2254751b952404d8a9b2d098e80c3d6/flipkart", newobj)
            .then((response) => {
                var key = response.data._id; // Use the correct property name (e.g., _id)
                
                // Store the key in localStorage
                allkeys.push(key);
                localStorage.setItem('allkeys', JSON.stringify(allkeys));

                displayalldetails(key);
                console.log(response);
            })
            .catch((err) => {
                console.error(err);
            });
    });

    function displayalldetails(key) {
        axios.get("https://crudcrud.com/api/e2254751b952404d8a9b2d098e80c3d6/flipkart/" + key)
            .then((response) => {
                var information = response.data;

                var tableContainer = document.getElementById(information.choosetables + '-container');
                if (!tableContainer) {
                    tableContainer = document.createElement('div');
                    tableContainer.id = information.choosetables + '-container';
                    tableContainer.classList.add('table-container');

                    var tableHeader = document.createElement('h2');
                    tableHeader.textContent = information.choosetables;
                    tableContainer.appendChild(tableHeader);
                    document.body.appendChild(tableContainer); 
                }

                var displayingdetails = document.createElement('div');
                displayingdetails.classList.add('displayallthedetailsoftheperson');

                var combine = information.chooseitems + '-' + information.chooseprice;

                var output = document.createElement('span');
                output.textContent = combine;

                var del = document.createElement('button');
                del.textContent = 'delete';
                del.addEventListener('click', function () {
                    axios.delete("https://crudcrud.com/api/e2254751b952404d8a9b2d098e80c3d6/flipkart/"+key)
                        .then((response) => console.log(response))
                        .catch((err) => console.error(err));

                    localStorage.removeItem(key);

                    var index = allkeys.indexOf(key);
                    if (index !== -1) {
                        allkeys.splice(index, 1);
                        localStorage.setItem('allkeys', JSON.stringify(allkeys));
                    }

                    displayingdetails.remove();
                });

                displayingdetails.appendChild(output);
                displayingdetails.appendChild(del);

                tableContainer.appendChild(displayingdetails);
            })
            .catch((err) => {
                console.error(err);
            });
    }

 
    for (let i = 0; i < allkeys.length; i++) {
        displayalldetails(allkeys[i]);
    }
});




