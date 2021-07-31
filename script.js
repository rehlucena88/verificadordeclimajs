/*evento criando para tirar o dafault do formulario,evitando que ele envie as informaçoes, a variavel pega o valor do input e mostra o resultado*/

document.querySelector('.busca').addEventListener('submit', async (event)=>{ 
    event.preventDefault(); 

    let input = document.querySelector('#searchInput').value; 
    
    if(input !== '') {
          clearInfo();
         showWarning('Carregando...');

        let url =  `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=b3e6a568f1a3714d2818702f37eeb706&units=metric&lang=pt_br`;
        
        let results = await fetch(url); /*quando fazemos a requisiçao o await espera o resultado para mostrar atravez do json*/
        let json = await results.json(); /*json é um objeto com as informaçoes da requisiçao da api*/

       if(json.cod ===200) {
           showInfo({
               name: json.name,
               country: json.sys.country,
               temp: json.main.temp,
               tempIcon: json.weather[0].icon,
               windSpeed: json.wind.speed,
               windAngle: json.wind.deg 
           });
       } else {
           clearInfo();
           showWarning('Não encontramos essa localização.');
       }
    }else {
        clearInfo();
    }

});
/* funçao criada para mostrar as informaçao requisitadas que estas guardada no json */
function showInfo(json) {
    showWarning('');    

    document.querySelector('.titulo').innerHTML =`${json.name},  ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;


    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);

    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`;

    document.querySelector('.resultado').style.display = 'block';
}

/*funçao criada para apagar as informaçoes no display se estiverem e esconder a div rsultado.*/
function clearInfo(){
    showWarning('');
    document.querySelector('.resultado').style.display = 'none'
}

function showWarning(msg ) {
    document.querySelector('.aviso').innerHTML = msg;
}