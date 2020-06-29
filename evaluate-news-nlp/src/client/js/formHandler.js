function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let url = document.getElementById('name').value
    // Client.checkForName(formText)
    if (Client.checkURLValidation(url)) {
        console.log("::: Form Submitted :::")
        fetch('http://localhost:8081/sentiment?url=' + url)
            .then(res => res.json())
            .then((res) => {
                console.log("entered");
                console.log(res);
                document.getElementById('polarity').innerHTML = "polarity: " + res["polarity"]
                document.getElementById('polarity_confidence').innerHTML = "polarity_confidence: " + res["polarity_confidence"]
                document.getElementById('subjectivity').innerHTML = "subjectivity: " + res["subjectivity"]
                document.getElementById('subjectivity_confidence').innerHTML = "subjectivity_confidence: " + res["subjectivity_confidence"]
            })
    } else {
        alert("Please, Enter valid URL");
    }
}

export default handleSubmit;


