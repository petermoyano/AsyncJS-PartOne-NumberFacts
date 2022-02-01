const btn1 = document.getElementById('btn1');
const btn2 = document.getElementById('btn2');
const btn3 = document.getElementById('btn3');
const inp1 = document.querySelector('#userInput');
const inp2 = document.querySelector('#userInput2');
const inp3 = document.querySelector('#userInput3');
const inp4 = document.querySelector('#userInput4');
const facts = document.querySelector('div ul');

BASE_URL = 'http://numbersapi.com/';

btn1.addEventListener("click", function (e) {
    console.log(e);
    const number = e.target.parentElement.children[2].value;
    const prom = axios.get(BASE_URL + number + '/trivia?json');
    prom
        .then((res) => {
            let newLi = document.createElement("li");
            newLi.innerText = res.data.text
            facts.append(newLi)
            let newhr = document.createElement("hr");
            facts.append(newhr);
        })
        .catch(err => console.log(err));

});

btn2.addEventListener("click", function (e) {
    const number1 = e.target.parentElement.children[2].value;
    const number2 = e.target.parentElement.children[3].value;
    const prom = axios.get(BASE_URL + number1 + '..' + number2);
    prom
        .then(res => {
            console.log(res);
            for (let fact in res.data) {
                let newLi = document.createElement("li");
                newLi.innerText = res.data[fact];
                facts.append(newLi);
            }
            let newhr = document.createElement("hr");
            facts.append(newhr);
        })
        .catch(err => console.log(err))

});


btn3.addEventListener("click", function (e) {
    let fourNumberfacts = [];
    console.log(e.target.parentElement.children[2].value);
    const number = e.target.parentElement.children[2].value;
    for (let i = 1; i < 5; i++) {
        console.log(`${BASE_URL}${number}`)
        fourNumberfacts.push(axios.get(`${BASE_URL}${number}?json`))
    }

    Promise.all(fourNumberfacts)
        .then((factsArray) => {
            factsArray.forEach(p => {
                let newLi = document.createElement("li");
                newLi.innerText = p.data.text;
                facts.append(newLi);
            })

        })
        .catch(err => console.log(err));
    let newhr = document.createElement("hr");
    facts.append(newhr);

});