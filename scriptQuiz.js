let questions = []

fetch("./data.json")
	.then(response => response.json())
	.then(data => {
		questions = data;
		init();
	});


let currentQ = 0;
document.querySelector("#next").addEventListener("click", next);
document.querySelector("#prev").addEventListener("click", prev);
document.querySelector("#submit").addEventListener("click", submit);


function init()
{
	const quesElement = document.getElementById("questions");
	
	for(i=0; i<questions.length; i++)
	{
		const question = questions[i].question;
		const options = questions[i].options;
		
		const queElement = `
			<div class="qDetails hide">
				<div id="question">${question}</div>
				<ul id="options">
					<li><label><input type="radio" name="opt-${i}" value="0"><span class="option">${options[0]}</span></label></li>
					<li><label><input type="radio" name="opt-${i}" value="1"><span class="option">${options[1]}</span></label></li>
					<li><label><input type="radio" name="opt-${i}" value="2"><span class="option">${options[2]}</span></label></li>
					<li><label><input type="radio" name="opt-${i}" value="3"><span class="option">${options[3]}</span></label></li>
				</ul>
			</div>
		`;
		
		quesElement.innerHTML += queElement;
	}
	
	// showing first question details
	document.querySelector(".qDetails").classList.remove("hide");
	document.querySelector("#prev").classList.add("invisible");

}


function next()
{
	const qElements = document.querySelectorAll(".qDetails");
	qElements[currentQ].classList.add("hide");
	currentQ++;
	
	qElements[currentQ].classList.remove("hide");
	
	if(currentQ == questions.length-1)
	{
		document.querySelector("#next").classList.add("invisible");
	}
	
	document.querySelector("#prev").classList.remove("invisible");
	
	
}


function prev()
{
	const qElements = document.querySelectorAll(".qDetails");
	qElements[currentQ].classList.add("hide");
	currentQ--;
	
	qElements[currentQ].classList.remove("hide");
	
	if(currentQ == 0)
	{
		document.querySelector("#prev").classList.add("invisible")
	}
	document.querySelector("#next").classList.remove("invisible");
	
}


function submit()
{
	markedArr = []
	for(var i=0; i<questions.length; i++)
	{
		p = document.getElementsByName(`opt-${i}`);
		let marked = -1;
		for(t=0; t<4; t++)
		{
			if(p[t].checked)
				marked = t;
		}
		markedArr.push(marked);
	}
	
	window.sessionStorage.setItem("markedAns", JSON.stringify(markedArr));
	window.location = "result.html";
	
	
}