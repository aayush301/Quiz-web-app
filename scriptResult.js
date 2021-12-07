markedArr = JSON.parse(window.sessionStorage.getItem("markedAns"));
let questions = [];

fetch("./data.json")
	.then(response => response.json())
	.then(data => {
		questions = data;
		showResults()
	});


function showResults()
{
	// console.log(questions)
	// console.log(markedArr)
	
	showQuestions();
	showAndColorAnswers();
	document.querySelectorAll("input:not(:checked)").forEach(element => element.disabled=true);
	calculateAndShowScore();
	
	
	
}

function showQuestions()
{
	const solsElement = document.getElementById("solutions");
	
	for(i=0; i<questions.length; i++)
	{
		const question = questions[i].question;
		const options = questions[i].options;
		
		const solElement = `
			<div class="solDetails">
				<div id="question">${question}</div>
				<ul id="options">
					<li><input type="radio" name="opt-${i}" value="0"><span class="option">${options[0]}</span><span class="marker"></span></li>
					<li><input type="radio" name="opt-${i}" value="1"><span class="option">${options[1]}</span><span class="marker"></span></li>
					<li><input type="radio" name="opt-${i}" value="2"><span class="option">${options[2]}</span><span class="marker"></span></li>
					<li><input type="radio" name="opt-${i}" value="3"><span class="option">${options[3]}</span><span class="marker"></span></li>
				</ul>
			</div>
		`;
		
		solsElement.innerHTML += solElement;
	}
	
}

function showAndColorAnswers()
{
	const solElements = document.querySelectorAll(".solDetails")
	for(i=0;i<questions.length;i++)
	{
		const markedAns = markedArr[i];
		const correctAns = questions[i].answer;
		
		correctLi = solElements[i].querySelectorAll("li")[correctAns];
		correctLi.classList.add("correct");
		
		
		if(markedAns == -1)
			continue;
		
		markedLi = solElements[i].querySelectorAll("li")[markedAns];
		markedLi.querySelector("input").checked = true;
		
		if(markedAns == correctAns)
		{
			markedLi.querySelector(".marker").innerHTML = "&check;" //✓
		}
		else if(markedAns != -1)
		{
			markedLi.classList.add("incorrect");
			markedLi.querySelector(".marker").innerHTML = "&#10008;" //X
		}
		
		
	}
}


function calculateAndShowScore()
{
	let score = 0;
	const maxScore = questions.length;
	for(i=0;i<questions.length;i++)
	{
		const markedAns = markedArr[i];
		const correctAns = questions[i].answer;
		if(markedAns == correctAns)
			score++;
	}
	
	document.getElementById("score").innerHTML = score;
	document.getElementById("max-score").innerHTML = maxScore;
	
}