import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore, addDoc, collection, getDocs, query, orderBy, limit } 
from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

console.log("Firebase cargado 🔥");

const firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "phishingquiz-92b38.firebaseapp.com",
    projectId: "phishingquiz-92b38",
    storageBucket: "phishingquiz-92b38.firebasestorage.app",
    messagingSenderId: "132737148242",
    appId: "1:132737148242:web:c6d2f1ce736a2f7237c68b"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// GUARDAR
window.guardarPuntaje = async function(usuario, puntaje, errores){
    try{
        await addDoc(collection(db, "ranking"), {
            nombre: usuario.nombre,
            puntaje: puntaje,
            errores: errores, // NUEVO
            fecha: new Date()
        });
    }catch(e){
        console.error("Error guardando:", e);
    }
}

// CARGAR
window.cargarRanking = async function(){

    const q = query(
        collection(db, "ranking"),
        orderBy("puntaje", "desc"),
        limit(10)
    );

    const querySnapshot = await getDocs(q);

    let html = `
        <h3>🏆</h3>
        <div class="ranking-container">
    `;

    let i = 1;

    querySnapshot.forEach((doc) => {

        let user = doc.data();

        // 🔥 clases para top 3
        let claseTop = "";
        if(i === 1) claseTop = "top1";
        else if(i === 2) claseTop = "top2";
        else if(i === 3) claseTop = "top3";

        html += `
            <div class="ranking-item ${claseTop}">
                <span class="ranking-nombre">
                    ${i}. ${user.nombre}
                </span>
                <span class="ranking-puntaje">
                    ${user.puntaje}
                </span>
            </div>
        `;

        i++;
    });

    html += `</div>`;

    return html;
}