const loading = document.querySelector('.load');
const loadBtn = document.querySelector('.load-btn');
const pizza = document.querySelector('.circle');

loadBtn.addEventListener('click', loadPizza);

function loadPizza() {
    loading.innerText = 'Waiting...';
    if (pizza.children.length > 0) pizza.innerHTML = '';
    getUsers();
}

const getUsers = () => {
    fetch('https://gp-js-test.herokuapp.com/pizza')
        .then((res) => res.json())
        .then((users) => getAngle(users));
};

function getAngle(users) {
    if (users) {
        loading.style.display = 'none';
        document.querySelector('.circle').style.display = 'block';
    }
    const arr = users.party.map((item) => {
        return item.eatsPizza;
    });
    const trueArr = arr.filter((elem) => {
        return elem === true;
    });
    angle = 360 / trueArr.length;
    calcAngle(angle, arr, trueArr);
}


function calcAngle(arg, arr, users) {
    const initialArr = [];
    for (i = arg; i <= 360; i += arg) {
        const newAngle = i;
        const nth = document.createElement('li');
        nth.innerHTML = `<div class="text"></div>`;
        pizza.appendChild(nth);
        initialArr.push(nth);
        nth.style.transform = `rotate(${newAngle}deg) skewY(-${90 - arg}deg)`;
    }
    console.log(initialArr.length, users.length);
    if (initialArr.length === users.length) {
        const description = document.createElement('div');
        const dsc = document.querySelector('.description');
        if (dsc.children.length > 0) {
            dsc.innerHTML = '';
        }
        dsc.appendChild(description);
        description.innerHTML = `Number of party participants: <span class="descr">${arr.length}</span> </br>
    Pizza eaters: <span class="descr">${initialArr.length}</span>`;
    }
}
