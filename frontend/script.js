// Insert your code here

//POST
document.querySelector('#message').addEventListener("input", function () {
    console.log("inputValue", document.querySelector('#message').value);
    if (this.value === "") {
        //Background
        document.querySelector('body').style.backgroundColor = "#FFFFFF";
        //Emoticone
        document.querySelector('#sentiment').src = "./images/question-mark.png";
        //Description
        document.querySelector('#feeling').textContent = "";
        //Score
        document.querySelector('#score').textContent = 0;
        //We need a return, without that, the fetch will run
        return;
    }

    fetch(`http://localhost:3000/analyze`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: this.value })
    })
        .then(response => response.json())
        .then(data => {
            console.log("Backend data", data);
            if (data.result) {
                document.querySelector('#score').textContent = data.score;
                console.log("data result", data.score);
                if (data.score < 0) {
                    document.querySelector('body').style.backgroundColor = "#EC7C89";
                    document.querySelector('#sentiment').src = "./images/angry.png";
                    document.querySelector('#feeling').textContent = "ANGRY";
                    //Score

                } else if (data.score === 0) {
                    //Background
                    document.querySelector('body').style.backgroundColor = "#82C0CC";
                    document.querySelector('#sentiment').src = "./images/neutral.png";
                    document.querySelector('#feeling').textContent = "NEUTRAL";
                } else if (data.score > 0) {
                    //Background
                    document.querySelector('body').style.backgroundColor = "#F5DA7D";
                    document.querySelector('#sentiment').src = "./images/happy.png";
                    document.querySelector('#feeling').textContent = "HAPPY";
                }
            }
        });
});
