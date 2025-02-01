// ==UserScript==
// @name         LiveWorksheets Solver
// @license      GNU GPLv3
// @namespace    https://github.com/danucosukosuko/livesolver
// @version      1.0.2
// @description  Muestra un botón en la parte superior del DOM de LiveWorksheets y te permite pulsarlo, revelando así las respuestas. Si no se pulsa en 5 segundos, el botón desaparece.
// @author       danucosukosuko
// @match        *://www.liveworksheets.com/*/w/*
// @match        *://www.liveworksheets.com/w/*
// @grant        none
// @updateURL    https://github.com/danucosukosuko/livesolver/raw/main/LiveWorksheets-Solver.user.js
// @downloadURL  https://github.com/danucosukosuko/livesolver/raw/main/LiveWorksheets-Solver.user.js
// ==/UserScript==

(function() {
    'use strict';

    // Verificar si la URL contiene "/w/" independientemente de cualquier subdirectorio anterior
    const pathname = window.location.pathname;
    if (pathname.match(/\/[^\/]+\/w\//)) {
        let btn = document.createElement("button");
        btn.innerText = "Mostrar Respuestas";
        Object.assign(btn.style, {
            position: "fixed",
            top: "20px",
            right: "20px",
            zIndex: "9999",
            padding: "10px 20px",
            fontSize: "16px",
            background: "red",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            boxShadow: "0px 0px 5px rgba(0,0,0,0.3)"
        });
        document.body.appendChild(btn);

        let timeout = setTimeout(() => btn.remove(), 5000);

        btn.onclick = function() {
            clearTimeout(timeout);
            btn.remove();

            setTimeout(() => {
                jQuery("#worksheet-preview").worksheetPreview("validation", {
                    clicked: false,
                    showAnswers: true,
                    showRightAnswers: true
                });
            }, 1000);
        };
    }
})();
