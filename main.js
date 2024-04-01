// משתנים
let tarjetasDestapes = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimiento = 0;
let aciertos = 0;
let temporizador = false;
let timer = 30;
let timerInicial = 30;
let tiempoRegresivoID = null;

// HTML
let mostrermovimientos = document.getElementById('movimientos');
let mostrAciertos = document.getElementById('aciertos');
let mostrartiempo = document.getElementById('t-restante');

// סדר מספרים
let numeros = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
numeros = numeros.sort(() => Math.random() - 0.5);
console.log(numeros);

//פונקציות 
function contarTiempo(){
    tiempoRegresivoID = setInterval(() => {
      timer--;  
      mostrartiempo.innerHTML = `Tiempo: ${timer} segundos`;
      if(timer === 0){
        clearInterval(tiempoRegresivoID);
        bloquearTarjetas();
      }
    }, 1000);
}

function bloquearTarjetas(){
   for(let i = 0; i <= 15; i++){
    let tarjetaBloqueada = document.getElementById(i);
    tarjetaBloqueada.innerHTML = numeros[i];
    tarjetaBloqueada.disabled = true;
   } 
}

// פונקציה מרכזית
function destapar(id) {

    if(temporizador === false){
        contarTiempo();
        temporizador = true;
    }
    tarjetasDestapes++;

    if (tarjetasDestapes === 1) {
        // להראות מספר ראשון 
        tarjeta1 = document.getElementById(id);
        primerResultado = numeros[id];
        tarjeta1.innerHTML = primerResultado;

        // לבטל לחיצה ראשונה
        tarjeta1.disabled = true;
    } else if (tarjetasDestapes === 2) {
        // להראות מספר שני
        tarjeta2 = document.getElementById(id);
        segundoResultado = numeros[id];
        tarjeta2.innerHTML = segundoResultado;

        // לבטל לחיצה שניה
        tarjeta2.disabled = true;

        // לחשב תנועה
        movimiento++;
        mostrermovimientos.innerHTML = `movimientos: ${movimiento}`;

        if (primerResultado === segundoResultado) {
            tarjetasDestapes = 0;

            aciertos++;
            mostrAciertos.innerHTML = `aciertos: ${aciertos}`;

            if(aciertos === 8 ){
                clearInterval(tiempoRegresivoID);
                mostrAciertos.innerHTML = `aciertos: ${aciertos} 😱 `;
                mostrartiempo.innerHTML = `אליפות  🎉  🥵 ${timerInicial - timer}  שניות `;
                mostrermovimientos.innerHTML = `movimientos ${movimiento} 🤘😎`;
            }
        } else {
            // להראות מספר ולכסות
            setTimeout(() => {
                tarjeta1.innerHTML = '';
                tarjeta2.innerHTML = '';
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetasDestapes = 0;
            }, 800);
        }
    }
}


