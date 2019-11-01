function run_search(handle, sort_value) {

    $('#name').text(`${handle}'s repos`);

    fetch(`https://api.github.com/users/${handle}/repos?sort=${sort_value}&type=owner&direction=desc`)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            /*threw new Error(response.statusText);*/
        })
        .then(responseJson => displayResults(responseJson))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });
}

function displayResults(responseJson) {
    console.log('displayResults ran');

    for (let i = 0; i < responseJson.length; i++) {
        let created_date = new Date(`${responseJson[i].created_at}`);
        created_date = created_date.toDateString();

        let updated_date = new Date(`${responseJson[i].updated_at}`);
        updated_date = updated_date.toDateString();

        let pushed_date = new Date(`${responseJson[i].pushed_at}`);
        pushed_date = pushed_date.toDateString();

        $('#results-list').append(`<li><a href="${responseJson[i].html_url}" target="_blank">${responseJson[i].name}</a>
		<p>Description: ${responseJson[i].description}</p><p>Forks Count: ${responseJson[i].forks_count}</p><p>Created: ${created_date}</p><p>Updated: ${updated_date}</p><p>Pushed: ${pushed_date}</p>`);
    }
}

function watchForm() {
    $('#search').submit(event => {
        event.preventDefault();
        const handle = $('#handle').val();
        console.log(handle);
        const sort_value = $('input[type="radio"]').val();
        console.log(sort_value);
        run_search(handle, sort_value);
    });
}


$(watchForm);