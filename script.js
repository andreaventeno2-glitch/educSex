document.addEventListener("DOMContentLoaded", function () {

    // MENÚ PARA CELULARES

    const menuBtn = document.getElementById("menuBtn");
    const menu = document.getElementById("menu");

    menuBtn.addEventListener("click", function () {

        const abierto = menu.classList.toggle("abierto");

        menuBtn.textContent = abierto ? "✕" : "☰";

        menuBtn.setAttribute("aria-expanded", abierto);

    });


    document.querySelectorAll("#menu a").forEach(function (enlace) {

        enlace.addEventListener("click", function () {

            menu.classList.remove("abierto");

            menuBtn.textContent = "☰";

            menuBtn.setAttribute("aria-expanded", "false");

        });

    });


    // MITOS Y REALIDADES

    const preguntas = document.querySelectorAll(".pregunta");

    preguntas.forEach(function (boton) {

        boton.addEventListener("click", function () {

            const respuesta = boton.nextElementSibling;

            const estabaAbierta = boton.getAttribute("aria-expanded") === "true";

            respuesta.hidden = estabaAbierta;

            boton.setAttribute(
                "aria-expanded",
                String(!estabaAbierta)
            );

            const signo = boton.querySelector(".signo");

            signo.textContent = estabaAbierta ? "＋" : "−";

        });

    });


    // UBICACIÓN DE CENTROS DE SALUD

    const btnUbicacion = document.getElementById("btnUbicacion");

    const mensajeUbicacion = document.getElementById("mensajeUbicacion");

    btnUbicacion.addEventListener("click", function () {

        if (!navigator.geolocation) {

            mensajeUbicacion.textContent =
                "Tu navegador no permite consultar la ubicación. Puedes utilizar los enlaces de búsqueda de centros de salud.";

            return;

        }

        mensajeUbicacion.textContent =
            "Solicitando permiso para consultar tu ubicación...";

        navigator.geolocation.getCurrentPosition(

            function (posicion) {

                const latitud = posicion.coords.latitude;

                const longitud = posicion.coords.longitude;

                const url =
                    "https://www.google.com/maps/search/centros+de+salud/@" +
                    latitud + "," + longitud + ",14z";

                mensajeUbicacion.textContent =
                    "Se abrirá el mapa con una búsqueda de centros de salud cercanos.";

                window.open(url, "_blank", "noopener,noreferrer");

            },

            function () {

                mensajeUbicacion.textContent =
                    "No se pudo obtener la ubicación. Puedes buscar centros de salud de Villa Victoria con el enlace anterior.";

            },

            {
                enableHighAccuracy: false,
                timeout: 10000,
                maximumAge: 60000
            }

        );

    });


    // CHAT EDUCATIVO

    const chatForm = document.getElementById("chatForm");

    const chatInput = document.getElementById("chatInput");

    const chatMensajes = document.getElementById("chatMensajes");


    const respuestasChat = {

        embarazo:
            "Un embarazo puede ocurrir cuando los espermatozoides fecundan un óvulo. Si tienes dudas sobre un posible embarazo, una prueba de embarazo y la orientación de un profesional de salud pueden ayudarte. Si hubo una relación sin protección recientemente, consulta cuanto antes sobre las opciones disponibles.",

        anticonceptivos:
            "Existen distintos métodos anticonceptivos, como el condón, las pastillas, el implante y el DIU. No todos funcionan de la misma manera. El condón también ayuda a reducir el riesgo de muchas ITS. Un profesional de salud puede explicarte las opciones disponibles y ayudarte a elegir una adecuada para ti.",

        its:
            "Las infecciones de transmisión sexual (ITS) pueden transmitirse mediante diferentes tipos de contacto sexual. Algunas no producen síntomas. El uso correcto del condón reduce el riesgo de muchas ITS. Si crees que pudiste exponerte a una infección, busca orientación y pruebas en un servicio de salud.",

        ayuda:
            "Puedes buscar centros de salud y unidades médicas en Villa Victoria mediante la sección Centros de salud de esta página. Confirma los servicios y horarios con cada unidad. Si necesitas ayuda urgente por una situación que pone en riesgo tu seguridad, busca atención inmediata.",

        cuerpo:
            "Durante la adolescencia pueden ocurrir cambios físicos y emocionales. Cada persona se desarrolla a su propio ritmo. Si un cambio te preocupa, puedes hablar con un profesional de salud.",

        consentimiento:
            "El consentimiento significa que una persona acepta libremente y sin presión. Debe ser claro y puede retirarse en cualquier momento. Nadie tiene derecho a obligarte, amenazarte o presionarte para realizar una actividad sexual.",

        prevencion:
            "La prevención incluye recibir educación sexual integral, conocer los métodos anticonceptivos, utilizar correctamente el condón para reducir el riesgo de muchas ITS y acudir a profesionales de salud para recibir orientación personalizada.",

        confidencialidad:
            "Los servicios de salud pueden ofrecer orientación sobre salud sexual y reproductiva. Las condiciones de confidencialidad, los servicios para adolescentes y las normas aplicables pueden variar. Puedes preguntar directamente en la unidad médica sobre tus derechos y las condiciones de atención.",

        apoyo:
            "Si alguien te está presionando, amenazando o haciendo sentir inseguridad, recuerda que mereces respeto. Busca a una persona adulta de confianza o a un profesional que pueda ayudarte. Si existe peligro inmediato, acude a los servicios de emergencia.",

        general:
            "Puedo ofrecer información educativa general sobre embarazo adolescente, anticoncepción, infecciones de transmisión sexual, consentimiento y orientación médica. Intenta escribir una de esas palabras para encontrar información relacionada. Recuerda que no sustituyo a un profesional de salud."

    };


    function agregarMensaje(texto, tipo) {

        const mensaje = document.createElement("div");

        mensaje.classList.add("mensaje", tipo);

        mensaje.textContent = texto;

        chatMensajes.appendChild(mensaje);

        chatMensajes.scrollTop = chatMensajes.scrollHeight;

    }


    function obtenerRespuesta(texto) {

        const consulta = texto.toLowerCase().normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");


        if (
            consulta.includes("suicid") ||
            consulta.includes("hacerme dano") ||
            consulta.includes("hacer daño") ||
            consulta.includes("abus") ||
            consulta.includes("violencia") ||
            consulta.includes("me obliga") ||
            consulta.includes("me amenaza") ||
            consulta.includes("me presiona")
        ) {

            return "Lamento que estés pasando por una situación difícil. Mereces estar a salvo y recibir ayuda. Si alguien te está haciendo daño, amenazando o presionando, intenta contactar a una persona adulta de confianza o a un profesional que pueda ayudarte. Si estás en peligro inmediato, busca servicios de emergencia. Este chat no puede proporcionar atención de emergencia.";

        }


        if (
            consulta.includes("embarazo") ||
            consulta.includes("embarazada") ||
            consulta.includes("prueba de embarazo") ||
            consulta.includes("retraso")
        ) {

            return respuestasChat.embarazo;

        }


        if (
            consulta.includes("anticonceptivo") ||
            consulta.includes("condon") ||
            consulta.includes("pastilla") ||
            consulta.includes("implante") ||
            consulta.includes("diu") ||
            consulta.includes("metodo") ||
            consulta.includes("proteccion")
        ) {

            return respuestasChat.anticonceptivos;

        }


        if (
            consulta.includes("its") ||
            consulta.includes("infeccion") ||
            consulta.includes("enfermedad sexual") ||
            consulta.includes("vih") ||
            consulta.includes("sida")
        ) {

            return respuestasChat.its;

        }


        if (
            consulta.includes("centro de salud") ||
            consulta.includes("hospital") ||
            consulta.includes("doctor") ||
            consulta.includes("medico") ||
            consulta.includes("ayuda") ||
            consulta.includes("donde puedo acudir")
        ) {

            return respuestasChat.ayuda;

        }


        if (
            consulta.includes("consentimiento") ||
            consulta.includes("decir que no") ||
            consulta.includes("limites") ||
            consulta.includes("limites personales") ||
            consulta.includes("relacion")
        ) {

            return respuestasChat.consentimiento;

        }


        if (
            consulta.includes("cuerpo") ||
            consulta.includes("pubertad") ||
            consulta.includes("adolescencia") ||
            consulta.includes("cambios")
        ) {

            return respuestasChat.cuerpo;

        }


        if (
            consulta.includes("confidencial") ||
            consulta.includes("privacidad") ||
            consulta.includes("mis padres")
        ) {

            return respuestasChat.confidencialidad;

        }


        if (
            consulta.includes("prevenir") ||
            consulta.includes("prevencion") ||
            consulta.includes("evitar")
        ) {

            return respuestasChat.prevencion;

        }


        return respuestasChat.general;

    }


    function enviarPregunta(texto) {

        const pregunta = texto.trim();

        if (!pregunta) {
            return;
        }

        agregarMensaje(pregunta, "mensaje-usuario");

        const respuesta = obtenerRespuesta(pregunta);

        agregarMensaje(respuesta, "mensaje-bot");

    }


    chatForm.addEventListener("submit", function (evento) {

        evento.preventDefault();

        const pregunta = chatInput.value;

        if (pregunta.trim() === "") {
            return;
        }

        enviarPregunta(pregunta);

        chatInput.value = "";

        chatInput.focus();

    });


    // BOTONES DE PREGUNTAS RÁPIDAS

    document.querySelectorAll(".pregunta-rapida").forEach(function (boton) {

        boton.addEventListener("click", function () {

            const tema = boton.dataset.pregunta;

            const preguntasRapidas = {

                embarazo: "Quiero información sobre embarazo adolescente",

                anticonceptivos: "Quiero conocer los métodos anticonceptivos",

                its: "Quiero información sobre las ITS",

                ayuda: "¿Dónde puedo acudir para recibir orientación?"

            };

            enviarPregunta(preguntasRapidas[tema]);

        });

    });


    // CUESTIONARIO EDUCATIVO

    const formularioTest = document.getElementById("formularioTest");

    const resultadoTest = document.getElementById("resultadoTest");

    const resultadoTitulo = document.getElementById("resultadoTitulo");

    const resultadoTexto = document.getElementById("resultadoTexto");

    const resultadoEmoji = document.getElementById("resultadoEmoji");

    const reiniciarTest = document.getElementById("reiniciarTest");

    const progresoTexto = document.getElementById("progresoTexto");

    const progresoPorcentaje = document.getElementById("progresoPorcentaje");

    const barraProgreso = document.getElementById("barraProgreso");


    const respuestasCorrectas = {

        p1: "b",

        p2: "a",

        p3: "b",

        p4: "b",

        p5: "b"

    };


    const totalPreguntas = Object.keys(respuestasCorrectas).length;


    // ACTUALIZAR LA BARRA DE PROGRESO

    function actualizarProgreso() {

        let respondidas = 0;

        for (let i = 1; i <= totalPreguntas; i++) {

            const seleccionada = document.querySelector(
                'input[name="p' + i + '"]:checked'
            );

            if (seleccionada) {
                respondidas++;
            }

        }

        const porcentaje = Math.round(
            (respondidas / totalPreguntas) * 100
        );

        progresoTexto.textContent =
            "Preguntas respondidas: " +
            respondidas +
            " de " +
            totalPreguntas;

        progresoPorcentaje.textContent = porcentaje + "%";

        barraProgreso.style.width = porcentaje + "%";

    }


    formularioTest.addEventListener("change", function () {

        actualizarProgreso();

    });


    // CALCULAR RESULTADOS

    formularioTest.addEventListener("submit", function (evento) {

        evento.preventDefault();

        let puntuacion = 0;

        let respondidas = 0;


        for (let i = 1; i <= totalPreguntas; i++) {

            const seleccionada = document.querySelector(
                'input[name="p' + i + '"]:checked'
            );

            if (seleccionada) {

                respondidas++;

                if (seleccionada.value === respuestasCorrectas["p" + i]) {

                    puntuacion++;

                }

            }

        }


        if (respondidas < totalPreguntas) {

            alert(
                "¡Te faltan preguntas! Responde las " +
                totalPreguntas +
                " preguntas para ver tu resultado. 🌷"
            );

            return;

        }


        const porcentaje = Math.round(
            (puntuacion / totalPreguntas) * 100
        );


        if (puntuacion === 5) {

            resultadoEmoji.textContent = "🏆";

            resultadoTitulo.textContent = "¡Excelente trabajo!";

            resultadoTexto.textContent =
                "Obtuviste " +
                puntuacion +
                " de " +
                totalPreguntas +
                " respuestas correctas (" +
                porcentaje +
                "%). Demuestras un buen conocimiento de los temas. Sigue aprendiendo y consulta fuentes confiables.";

        } else if (puntuacion >= 3) {

            resultadoEmoji.textContent = "🌸";

            resultadoTitulo.textContent = "¡Vas muy bien!";

            resultadoTexto.textContent =
                "Obtuviste " +
                puntuacion +
                " de " +
                totalPreguntas +
                " respuestas correctas (" +
                porcentaje +
                "%). Ya conoces varios conceptos importantes. Puedes repasar los temas para seguir aprendiendo.";

        } else {

            resultadoEmoji.textContent = "📚";

            resultadoTitulo.textContent = "¡Sigamos aprendiendo!";

            resultadoTexto.textContent =
                "Obtuviste " +
                puntuacion +
                " de " +
                totalPreguntas +
                " respuestas correctas (" +
                porcentaje +
                "%). No te preocupes: este cuestionario es una oportunidad para aprender. Revisa las secciones educativas e inténtalo de nuevo.";

        }


        formularioTest.hidden = true;

        document.querySelector(".test-progreso-contenedor").hidden = true;

        resultadoTest.hidden = false;

        resultadoTest.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    });


    // REINICIAR EL CUESTIONARIO

    reiniciarTest.addEventListener("click", function () {

        formularioTest.reset();

        formularioTest.hidden = false;

        document.querySelector(".test-progreso-contenedor").hidden = false;

        resultadoTest.hidden = true;

        actualizarProgreso();

        document.getElementById("test").scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });


    // MENSAJE EN LA CONSOLA

    console.log("EducSex Villa Victoria está funcionando correctamente. 🌷");

});