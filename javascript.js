var questionBase = ["Что из перечисленного не является языком программирования?", "Какие из перечисленных видов тестирования могут быть автоматизированы?", "Выберите вариант, соответствующий следующему предложению: Известно, что грымзик обязательно или полосат, или рогат, или то и другое вместе.", "Выберите типы алгоритмов, которых не существует.", "Какая из следующих конструкций используется для ветвления?"]
var answerBase = [["HTML", "Java", "Python", "DevOps"], ["UI тестирование", "Юзабилити тестирование", "Тестирование совместимости", "Unit тестирование"], ["Грымзик не может быть безрогим", "Грымзик не может быть однотонным и безрогим одновременно", "Грымзик не может быть полосатым и безрогим одновременно", "Грымзик не может быть однотонным и рогатым одновременно"], ["Алгоритм с ветвлением", "Циклический безусловный", "Циклический с параметром", "Алгоритм с углублением"], ["switch case", "if else", "do while", "for"]]
var answer = []
var correctAnswerBase = [[1, 4], [1, 3, 4], [2], [2, 4], [1, 2]]
var userAnswerBase = []
var userAnswer = []


// questionBase - массив, каждый элемент которого это вопрос теста
// answer - массив, каждый элемент которого это текст ответа одного вопроса
// answerBase - массив, каждый элемент которого это - это массив answer с ответами для соответсвующего вопроса
// correctAnswerBase - массив, каждый элемент которого - это массив с правильными ответами для соответствующего вопроса

function isValueValid(valueCheck) {       //проверка на пустое поле и нажатие кнопки отмена
	return valueCheck === "" || valueCheck === null
}


function isAnswerCorrectNum(valueCheck) {   //проверка на соответствие вариантов правильных ответов цифрам 1,2,3,4 и отсутствие других знаков
	return valueCheck != 1 && valueCheck != 2 && valueCheck != 3 && valueCheck != 4 || valueCheck === null
}


function isAnswerCorrectRepeat(arrayCheck) {  //проверка на отсутсвие повторяющихся вариантов правильных вариантов ответа
	var resultCheck = false
	for (var z = 0; z < arrayCheck.length; z = z + 1) { 
		for (var m = z + 1; m < arrayCheck.length; m = m + 1) {
			if (arrayCheck[z] == arrayCheck[m]) {
				resultCheck = true
				return resultCheck
			}
		}
	}
	return resultCheck
}


function isAnswerCorrectValid(answerCheck) {  //проверка на валидность вариантов правильных ответов
	for (var l = 1; l <= answerCheck.length; l = l + 1) {
			if (isAnswerCorrectNum(answerCheck[l-1]) || isAnswerCorrectRepeat(answerCheck)) {
				alert("Поле может содержать только уникальные цифры 1,2,3,4, разделенные запятой. Попробуйте добавить вопрос заново.")
				return true
			}
			}
}


function createQuestion() {
	var question = prompt("Введите текст вопроса")
	if (isValueValid(question)) {
		alert('Вы не ввели текст вопроса. Попробуйте добавить вопрос заново')
	} 	else {
			for (var j = 1; j < 5; j = j + 1) { 
			answer[j-1] = prompt("Введите текст " + j + " варианта ответа")
				if (isValueValid(answer[j-1])) {
				alert("Вы не ввели текст " + j + " варианта ответа. Попробуйте добавить вопрос заново")
				return
				} 	
			}
		var correctAnswer = prompt("Введите номера правильных ответов через запятую. Нумерация начинается с 1")
		if (isValueValid(correctAnswer)) {
		alert('Вы не ввели правильные варианты ответов. Попробуйте добавить вопрос заново')
		return
	}
		var correctAnswerFormated = correctAnswer.split(" ").join("").split(",")
		if (isAnswerCorrectValid(correctAnswerFormated)) {
			return
		}
		questionBase.push(question)
		answerBase.push(answer)
		correctAnswerBase.push(correctAnswerFormated)
		}
}


function addQuestion(num, text) {
	var p = document.createElement("p")
	var textP = document.createTextNode(num + 1 + ". " + text)
	p.appendChild(textP)
	document.body.appendChild(p)
}


function addLabel(text) {
	var label = document.createElement("label")
	var textLabel = document.createTextNode(text)
	label.appendChild(textLabel)
	document.body.appendChild(label)
}


function addCheckbox(i, j) {   // при создании чекбокса сразу присваиваем его значению данные о номере вопроса и номере ответа
	var checkbox = document.createElement("input")
	checkbox.type = "checkbox"
	checkbox.className = "check"
	checkbox.value = [i, j]
	document.body.appendChild(checkbox)
}


function addBr() {
	var br = document.createElement("br")
	document.body.appendChild(br)
}


function addAnswer(text, i, j) {
	addCheckbox(i, j)
	addLabel(text)
	addBr()
}


function addButton() {
	var button = document.createElement("button")
	var textButton = document.createTextNode("Отправить")
	button.appendChild(textButton)
	button.onclick = result
	document.body.appendChild(button)
}


function startTest() {
	document.getElementById("BtnQuestion").disabled = true;
	document.getElementById("BtnTest").disabled = true;
		for (var i = 0; i < questionBase.length; i = i +1)	{
			addQuestion(i, questionBase[i])
			for (var j = 0; j < 4; j = j +1) {
				addAnswer(answerBase[i][j], i, j)
			}
	}
	addBr()
	addButton()
}


function result() {
  var sumQuestion = questionBase.length
  createUserAnswerBase() 
  if (userAnswerBase.length != sumQuestion) {     
  	alert("Все вопросы должны иметь хотя бы один выбранный вариант ответа. Проверьте правильность заполнения")
  	userAnswerBase = []   // очищаем массив ответов пользователя, чтобы была возможность ответить на неотвеченные вопросы и завершить тест
  	userAnswer = []
  	return
  }
  var score = 0
  var errorAnswerText = ""   // строковая переменная, в которую будем добавлять все неправильно отвеченные вопросы
    for (var i = 0; i < sumQuestion; i = i + 1) {
  	if ((userAnswerBase[i].length == correctAnswerBase[i].length) && checkAnswer(correctAnswerBase[i], userAnswerBase[i])) {
  		score = score + 1
  	}
  	else {
  		var errorAnswerText = errorAnswerText + (i+1) + ". " + questionBase[i] + "\n"
  	}
  }
  finish(score, sumQuestion, errorAnswerText)
}


function checkAnswer(correct, user) {    // к сожалению не смог разобраться почему у меня не работал метод includes, поэтому пришлось проверять каждый ответ пользователя с правильными ответами
	var result
	for (var i = 0; i < user.length; i = i + 1) {
		for (var j = 0; j < user.length; j = j + 1) {
			if ((correct[j] - 1) == user[i]) {
				result = true
				break
			} else {
				result = false
			} 
		}
		if (result == false) {
			return result
		}
	}
	return result
}


function finish(quantity, max, text) {
  if (quantity == max) {
  	alert("Ваш результат " + quantity + " из " + max + ". Вы молодец!")
  } else {
  	alert("Вы неправильно ответили на вопросы:\n" + text + "\n Ваш результат " + quantity + " из " + max)
  }
}


function createUserAnswerBase() {     
  var checkboxes = document.getElementsByClassName("check")  
  var numberQuestion = 0
  for (var index = 0; index < checkboxes.length; index++) {
     if (checkboxes[index].checked) {
     	if (numberQuestion == checkboxes[index].value[0]) { // каждому чекбоксу мы присвоили номер вопроса и номер ответа, здесь мы заполняем массив userAnswer ответами одного вопроса, затем этот массив добавляем в userAnswerBase
     		userAnswer.push(checkboxes[index].value[2])
     	} else {
     		numberQuestion = checkboxes[index].value[0]
     		userAnswerBase.push(userAnswer)
     		userAnswer = []
     		userAnswer.push(checkboxes[index].value[2])
     	}
     }
  }
  userAnswerBase.push(userAnswer)
  return userAnswerBase
}


