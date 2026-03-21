console.log("quiz cargado 🔥");

const preguntas = [

{
from: "PayPal Support <support@paypaI.com>",
subject: "Urgent: Verify your account",
mensaje: "Hi, {correo}, Your account will be suspended due to unusual activity.",
link: "https://Temueasycheck.com",
respuesta: "phishing",
tipo: "link_falso",
explicacion: "Dominio falso que intenta imitar un servicio legítimo."
},

{
from: "Universidad <profesor@universidad.edu>",
subject: "Tarea de seguridad informática",
mensaje: "Adjunto encontrarás la tarea de esta semana.",
link: "https://universidad.edu/aula",
respuesta: "legitimo",
tipo: "legitimo",
explicacion: "El dominio coincide con la institución."
},

{
from: "Shein <promo@shein-ofertas.com>",
subject: "🔥 80% OFF solo hoy",
mensaje: "Descuentos exclusivos por tiempo limitado. Compra ahora.",
link: "https://shein-ofertas.com",
respuesta: "phishing",
tipo: "urgencia",
explicacion: "Uso de urgencia y presión para forzar decisiones rápidas."
},

{
from: "Microsoft Security <mfa@sadwd@2d-microsoft.com>",
subject: "MFA request approved?",
mensaje: "You received multiple authentication requests. If this wasn't you, verify immediately.",
link: "https://security-microsoft.com/mfa-check",
respuesta: "phishing",
tipo: "mfa",
explicacion: "Ataque de MFA fatigue + dominio no oficial."
},

{
from: "IT Support <soporte@it.universidad.edu>",
subject: "Actualización de contraseña requerida",
mensaje: "Debido a mantenimiento, debe actualizar su contraseña hoy.",
link: "https://it.universidad.edu/reset",
respuesta: "legitimo",
tipo: "legitimo",
explicacion: "Dominio institucional correcto."
},

{
from: "DHL Express <notificaciones@dhl-entregas.com>",
subject: "Entrega fallida - acción requerida",
mensaje: "No pudimos entregar tu paquete. Descarga el comprobante adjunto.",
link: "archivo.zip",
respuesta: "phishing",
tipo: "adjunto",
explicacion: "Archivo comprimido sospechoso, típico vector de malware."
},

{
from: "OXXO <promociones@oxxo.com>",
subject: "Gana premios con tu compra",
mensaje: "Participa en nuestra promoción registrando tu ticket.",
link: "https://oxxo.com/promos",
respuesta: "legitimo",
tipo: "legitimo",
explicacion: "Dominio oficial y promoción válida."
},

{
from: "Banco BBVA <alertas@bbva.seguridad-clientes.com>",
subject: "⚠️ Cuenta bloqueada",
mensaje: "Tu cuenta ha sido bloqueada. Ingresa en los próximos 10 minutos para evitar suspensión.",
link: "https://bbva.seguridad-clientes.com/login",
respuesta: "phishing",
tipo: "subdominio",
explicacion: "Subdominio engañoso que aparenta ser legítimo."
},

{
from: "LinkedIn <jobs@linkedin.com>",
subject: "You have 3 new job offers",
mensaje: "Hello! {correo}, Check out new opportunities tailored for you.",
link: "https://linkedin.com/jobs",
respuesta: "legitimo",
tipo: "legitimo",
explicacion: "Dominio oficial y comportamiento esperado."
},

{
from: "Admin <admin@empresa-login.com>",
subject: "Revisión de cuenta requerida",
mensaje: "Accede aquí para evitar desactivación de tu cuenta.",
link: "https://bit.ly/3XyPHisiLink",
respuesta: "phishing",
tipo: "acortador",
explicacion: "Uso de enlace acortado para ocultar el destino real."
}

];

let indice = 0;
let puntaje = 0;

let erroresPorTipo = {
    link_falso: 0,
    urgencia: 0,
    mfa: 0,
    adjunto: 0,
    subdominio: 0,
    acortador: 0
};

// GLOBAL
window.mostrarPregunta = function(){

    let p = preguntas[indice];

    document.getElementById("from").innerText = p.from;
    document.getElementById("subject").innerText = p.subject;

    // PERSONALIZACIÓN
    let mensajePersonalizado = p.mensaje.replace("{correo}", usuario.correo);
    document.getElementById("mensaje").innerText = mensajePersonalizado;

    // 👇 TEXTO BONITO DEL BOTÓN (puedes variar si quieres)
    if(p.link.includes("zip")){
        document.getElementById("btnLink").innerText = "Descargar archivo";
    }
    else if(p.link.includes("login")){
        document.getElementById("btnLink").innerText = "Iniciar sesión";
    }
    else{
        document.getElementById("btnLink").innerText = "Ver enlace";
    }

    // 👇 TOOLTIP CON URL REAL
    document.getElementById("tooltipLink").textContent = p.link;
}

// GLOBAL
window.responder = function(opcion){

let p = preguntas[indice];
let resultado = document.getElementById("resultado");

if(opcion === p.respuesta){
    resultado.innerText = "Correcto 👍";
    puntaje++;
}
else{
    resultado.innerText = "Incorrecto ❌";

    // ERROR
    if(p.tipo !== "legitimo"){
        erroresPorTipo[p.tipo]++;
    }
}

resultado.innerText += " " + p.explicacion;

document.getElementById("puntaje").innerText = "Puntaje: " + puntaje;

// ocultar botones
document.getElementById("botonesRespuesta").style.display = "none";
document.getElementById("botonSiguiente").style.display = "block";

let pElement = document.getElementById("puntaje");

pElement.innerText = "Puntaje: " + puntaje;

// animación
pElement.classList.add("actualizado");

setTimeout(() => {
    pElement.classList.remove("actualizado");
}, 200);

}
// GLOBAL
window.siguiente = function(){

indice++;

if(indice < preguntas.length){

    mostrarPregunta();
    document.getElementById("resultado").innerText = "";

    document.getElementById("botonesRespuesta").style.display = "flex";
    document.getElementById("botonSiguiente").style.display = "none";

}
else{

    // guardar datos
    guardarPuntaje(usuario, puntaje, erroresPorTipo);

    // generar análisis
    let analisis = generarAnalisis();

    // cargar ranking correctamente
    cargarRanking().then(rankingHTML => {

        let html = `
            <h2>🎉 Quiz terminado</h2>

            <p><strong>Usuario:</strong> ${usuario.nombre}</p>
            <p><strong>Puntaje:</strong> ${puntaje}/${preguntas.length}</p>

            <div class="analisis">
                ${analisis}
            </div>

            <hr>

            ${rankingHTML}
        `;

        document.getElementById("ranking").innerHTML = html;
    });

    // ocultar quiz
    document.getElementById("quizContainer").style.display = "none";

    // mostrar pantalla final
    document.getElementById("finalContainer").style.display = "block";
}

}

// IMPORTANTE: esperar a que cargue el DOM
document.addEventListener("DOMContentLoaded", function(){
    mostrarPregunta();
});

window.irInicio = function(){
    window.location.href = "/PR02";
}

let usuario = {
    nombre: "",
    correo: ""
};

document.addEventListener("DOMContentLoaded", function(){

    document.getElementById("btnIniciar")
        .addEventListener("click", iniciarQuiz);

    // 🔥 CARGAR RANKING SIEMPRE
    if(typeof cargarRanking === "function"){
        cargarRanking();
    }

});

window.iniciarQuiz = function(){

    console.log("CLICK DETECTADO 🔥");

    usuario.nombre = document.getElementById("nombreUser").value;
    usuario.correo = document.getElementById("correoUser").value;

    if(usuario.nombre === "" || usuario.correo === ""){
        alert("Completa los datos");
        return;
    }

  // ocultar formulario
    document.getElementById("inicioQuiz").style.display = "none";

    // 🔥 MOSTRAR QUIZ (ESTO FALTABA)
    document.getElementById("quizContainer").style.display = "block";

    // opcional: mostrar puntaje si lo tienes oculto
    document.getElementById("puntaje").style.display = "block";

    mostrarPregunta();
}

function generarAnalisis(){

    let peor = Object.keys(erroresPorTipo).reduce((a, b) =>
        erroresPorTipo[a] > erroresPorTipo[b] ? a : b
    );

    let mensajes = {
        link_falso: "⚠️ Tiendes a confiar en enlaces falsos. Revisa siempre el dominio antes de hacer clic.",
        urgencia: "⚠️ Eres vulnerable a mensajes de urgencia. No te dejes presionar, tómate tu tiempo.",
        mfa: "⚠️ Cuidado con el MFA fatigue. No apruebes solicitudes que no iniciaste.",
        adjunto: "⚠️ Evita descargar archivos sospechosos. Podrían contener malware.",
        subdominio: "⚠️ Los subdominios pueden engañar. Verifica bien la URL completa.",
        acortador: "⚠️ Los enlaces acortados pueden ocultar destinos peligrosos.",
    };

    // si no falló en nada
    if(Object.values(erroresPorTipo).every(v => v === 0)){
        return "🛡️ Excelente, no caíste en ningún ataque. Tienes muy buen criterio de seguridad.";
    }

    return mensajes[peor];
}

