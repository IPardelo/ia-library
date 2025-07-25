(function () {

    "use strict";

    const select = (el, all = false) => {
        el = el.trim()
            if (all) {
                return [...document.querySelectorAll(el)]
            } else {
                return document.querySelector(el)
            }
    }

    const on = (type, el, listener, all = false) => {
        let selectEl = select(el, all)
            if (selectEl) {
                if (all) {
                    selectEl.forEach(e => e.addEventListener(type, listener))
                } else {
                    selectEl.addEventListener(type, listener)
                }
            }
    }

    const onscroll = (el, listener) => {
        el.addEventListener('scroll', listener)
    }

    let navbarlinks = select('#navbar .scrollto', true)
        const navbarlinksActive = () => {
        let position = window.scrollY + 200
            navbarlinks.forEach(navbarlink => {
                if (!navbarlink.hash)
                    return
                    let section = select(navbarlink.hash)
                        if (!section)
                            return
                            if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
                                navbarlink.classList.add('active')
                            } else {
                                navbarlink.classList.remove('active')
                            }
            })
    }
    window.addEventListener('load', navbarlinksActive)
    onscroll(document, navbarlinksActive)

    const scrollto = (el) => {
        let header = select('#header')
            let offset = header.offsetHeight

            let elementPos = select(el).offsetTop
            window.scrollTo({
                top: elementPos - offset,
                behavior: 'smooth'
            })
    }

    let selectHeader = select('#header')
        if (selectHeader) {
            const headerScrolled = () => {
                if (window.scrollY > 100) {
                    selectHeader.classList.add('header-scrolled')
                } else {
                    selectHeader.classList.remove('header-scrolled')
                }
            }
            window.addEventListener('load', headerScrolled)
            onscroll(document, headerScrolled)
        }

        let backtotop = select('.back-to-top')
        if (backtotop) {
            const toggleBacktotop = () => {
                if (window.scrollY > 100) {
                    backtotop.classList.add('active')
                } else {
                    backtotop.classList.remove('active')
                }
            }
            window.addEventListener('load', toggleBacktotop)
            onscroll(document, toggleBacktotop)
        }

        on('click', '.mobile-nav-toggle', function (e) {
            select('#navbar').classList.toggle('navbar-mobile')
            this.classList.toggle('bi-list')
            this.classList.toggle('bi-x')
        })

        on('click', '.navbar .dropdown > a', function (e) {
            if (select('#navbar').classList.contains('navbar-mobile')) {
                e.preventDefault()
                this.nextElementSibling.classList.toggle('dropdown-active')
            }
        }, true)

        on('click', '.scrollto', function (e) {
            if (select(this.hash)) {
                e.preventDefault()

                let navbar = select('#navbar')
                    if (navbar.classList.contains('navbar-mobile')) {
                        navbar.classList.remove('navbar-mobile')
                        let navbarToggle = select('.mobile-nav-toggle')
                            navbarToggle.classList.toggle('bi-list')
                            navbarToggle.classList.toggle('bi-x')
                    }
                    scrollto(this.hash)
            }
        }, true)

        window.addEventListener('load', () => {
            if (window.location.hash) {
                if (select(window.location.hash)) {
                    scrollto(window.location.hash)
                }
            }
        });

    let preloader = select('#preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.remove()
        });
    }

    window.addEventListener('load', () => {
        let categoriasContainer = select('#list.categorias');
        if (categoriasContainer) {
            let categoriasIsotope = new Isotope(categoriasContainer, {
                itemSelector: '.categorias-item'
            });

            let categoriasFilters = select('#filters li', true);

            on('click', '#filters li', function (e) {
                e.preventDefault();
                categoriasFilters.forEach(function (el) {
                    el.classList.remove('filter-active');
                });
                this.classList.add('filter-active');

                categoriasIsotope.arrange({
                    filter: this.getAttribute('data-filter')
                });
                document.getElementById("list").scrollIntoView({
                    behavior: 'smooth'
                });
            }, true);
        }

    });
	
	function generarFiltros(arrayFiltros) {
        const divPadre = document.getElementById('filters');

        for (let i = 0; i < arrayFiltros.length; i++) {
            const contenedor = document.createElement('li');
            contenedor.setAttribute('data-filter', "." + arrayFiltros[i][0]);
			contenedor.textContent = arrayFiltros[i][1];

            divPadre.appendChild(contenedor);
        }
    }

    function generarLinks(arrayLinks) {
        const divPadre = document.getElementById('list_container');

        for (let i = 0; i < arrayLinks.length; i++) {
            const contenedor = document.createElement('div');
            contenedor.className = "card categorias-item " + arrayLinks[i][0];

            const nombre = document.createElement('span');
            nombre.className = "card_title";
            nombre.textContent = arrayLinks[i][1];

            const descripcion = document.createElement('p');
            descripcion.className = "card__subtitle";
            descripcion.textContent = arrayLinks[i][2];

            const links = document.createElement('a');
            links.className = "button";
            links.textContent = "IR";
            links.setAttribute('target', '_blank');
            links.href = arrayLinks[i][3];

            contenedor.appendChild(nombre);
            contenedor.appendChild(descripcion);
            contenedor.appendChild(links);

            divPadre.appendChild(contenedor);
        }
    }

	// Informacion filtro de categoria
	// POS 0 CATEGORIA, POS 1 NOMBRE
	const arrayFiltros = [
		["redes", "Redes Sociales, Marketing, SEO"],
		["imagen", "Fotos y arte"],
		["textovoz", "Texto a voz"],
        ["voztexto", "Voz a texto"],
        ["textovideo", "Texto a video"],
		["multimedia", "Multimedia"],
		["asistente", "Asistente"],
		["automatizacion", "Automatización"],
		["programacion", "Programación"],
		["divertido", "Divertido"],
		["arquitectura", "Inmobiliaria/Arquitectura"],
		["productividad", "Productividad"],
		["datos", "Análisis de Datos"],
		["multimodal", "Multimodal"],
	];

    // Informacion webs
    // POS 0 CATEGORIA, POS 1 NOMBRE, POS 2 DESCRIPCION, POS 3 LINK WEB
    const arrayLinks = [
        ["programacion", "V0.dev", "Genera interfaces web mediante lenguaje humano", "https://www.v0.dev"],
        ["programacion", "Python tutor", "Ver comportamiento de código línea a línea", "https://pythontutor.com/"],
        ["automatizacion", "Make workflows", "Crear workflows gratis no code", "https://eu2.make.com/"],
        ["programacion", "Mixo", "Da unha idea e crea a web, logo etc.", "https://mixo.io/"],
        ["imagen", "Microsoft Designer", "Genera carteles, imagenes etc e pódense rediseñar", "https://designer.microsoft.com/"],
        ["multimodal", "Endless", "Convertir imagenes, texto, videos etc.", "https://endless.io/"],
        ["programacion", "UINiverse", "Biblioteca de diseños para webs", "https://uiverse.io/"],
        ["programacion", "Neumorphism", "Biblioteca y personalizador de diseños para web", "https://neumorphism.io/"],
        ["imagen", "Freepik pikaso", "Generador de imágenes con ia. (Marcar AI-promp)", "https://freepik.com/pikaso/"],
        ["imagen", "Perchance", "Generador de imágenes con ia.", "https://perchance.org/welcome/"],
        ["imagen", "Meshy", "Crear modelos 3D con lenguaje humano", "https://meshy.ai/"],
        ["programacion", "Get Lazy", "Crear programas web con lenguaje humano", "https://getlazy.ai/"],
        ["multimedia", "Jitter video", "Crea animaciones", "https://jitter.video/"],
        ["imagen", "Recraft", "Crea sets de iconos", "https://www.recraft.ai/"],
        ["textovoz", "TTS Maker", "Texto a voz", "https://ttsmaker.com/"],
        ["textovoz", "Uberduck", "Texto a voz", "https://www.uberduck.ai/"],
        ["voztexto multimedia", "Adobe Podcast", "Grabación y edición de audio impulsado por IA, todo en la web.", "https://podcast.adobe.com/"],
        ["productividad", "GPTionary", "Diccionario de sinónimos", "https://gptionary.com/"],
        ["productividad", "Chat gpt writer", "Extensión gratuita de Chrome que utiliza ChatGPT para resumir artículos en la web.", "https://chatgptwriter.ai/"],
        ["multimedia buscador", "Fathom.fm", "Recomendaciones, busque dentro de podcasts, lea transcripciones, navegue por episodios usando capítulos y mucho más. ¡Es una forma completamente nueva de experimentar los podcasts!", "https://hello.fathom.fm/"],
        ["productividad", "Neurospell", "Autocorrector ortográfico y gramatical basado en Deep Learning. Disponible en más de 30 idiomas. ", "https://neurospell.com/"],
        ["voztexto", "Steno", "Tus podcasts favoritos transcritos en su totalidad. Descubre, consulta y lee mientras los escuchas.", "https://www.steno.ai/"],
        ["textovoz buscador", "Ask my book", "Experimento de IA creado por Sahil Lavingia, para hacer que su libro sea más accesible. Puedes usar Ask My Book para hacer una pregunta y obtener una respuesta en su voz.", "https://askmybook.com"],
        ["textovideo", "Genmo AI", "Genmo ofrece generación de videos fantásticos con IA. También puedes ver videos generados por la comunidad.", "https://www.genmo.ai/"],
        ["productividad", "GPT Sheets", "Similar a ChatGPT, pero en Google Sheets. Obtén ayuda con la inspiración, categorización, traducción, corrección, resumen con la función GPT.", "https://workspace.google.com/marketplace/app/gpt_for_sheets/677318054654"],
        ["productividad redes", "ECommerce Prompt Gen.", "Recetas listas para usar de ChatGPT creadas por ingenieros rápidos para ayudarlo a configurar su tienda y campañas de marketing rápidamente", "https://www.ecommerceprompts.com/"],
        ["redes", "ProductBot", "Recomendador y experto en productos de IA que ayuda a los usuarios a tomar decisiones de compra. Los usuarios pueden especificar sus necesidades y la herramienta sugerirá productos relacionados.", "https://www.getproduct.help/"],
        ["imagen", "Tattoos AI", "Diseña tu tatuaje con IA", "https://www.tattoosai.com/"],
        ["productividad", "Wisdolia", "Una extensión de Chrome que usa IA para generar tarjetas didácticas (con preguntas y respuestas) para cualquier artículo/PDF para que puedas arraigar mejor lo que lees.", "https://jungleai.com/es/"],
        ["productividad", "Tutor AI", "Plataforma de aprendizaje impulsada por IA. Puedes ingresar cualquier tema y te proporcionará varias opciones que puedes usar para aprender sobre ese tema.", "https://tutorai.me/"],
        ["productividad", "Transvribe", "Diseñado para hacer que el aprendizaje en YouTube sea 10 veces más productivo.", "https://www.transvribe.com/"],
        ["productividad", "Teach Anything", "Encuentra rápidamente respuestas a preguntas sobre cualquier tema. Tienes que escribir tus preguntas, elegir un idioma y el nivel de dificultad. Después de eso, obtendrás la respuesta.", "https://www.teach-anything.com/"],
        ["productividad buscador", "PaperBrain", "Una plataforma para que pueda acceder y comprender los trabajos de investigación. Con resúmenes en papel y enlaces directos en pdf, nunca más tendrá que luchar con descargas tediosas.", "https://www.paperbrain.org/"],
        ["productividad", "Grammar GPT", "Una inteligencia artificial puede corregir los errores gramaticales de un texto de manera gratuita.", "https://www.grammar-gpt.com"],
        ["productividad", "GPTZero", "Detector de contenido de IA que puede clasificar textos humanos y generados por IA junto con contenido mixto. La herramienta ha aparecido en CNBC, CNN y más.", "https://gptzero.me/"],
        ["productividad", "Doctrina AI", "diseñado para ayudar a los estudiantes y niños a estudiar mejor y adaptarse a los nuevos desafíos del aprendizaje remoto y en línea.", "https://www.doctrina.ai/"],
        ["productividad", "VenturusAI", "herramienta para evaluar ideas de negocios y le brinda retroalimentación y análisis integral sobre cómo hacerlo exitoso", "https://venturusai.com/"],
        ["productividad", "Namy AI", "herramienta simple para generar algunas ideas de nombres de dominio para su negocio o marca. ", "https://namy.ai/"],
        ["productividad", "Naming Magic", "Deje que GPT-3 haga una lluvia de ideas sobre los nombres de su empresa o producto y encuentre los nombres de dominio disponibles.", "https://www.namingmagic.com/"],
        ["productividad", "NameWizard AI", "Permite crear un nombre generado por IA para su idea/proyecto/inicio.", "https://namewizard.ai/"],
        ["automatizacion", "Magic Form", "Capacite a su propio vendedor de IA en menos de 3 minutos para generar confianza y aumentar las conversiones de su sitio en un 20 % a través de conversaciones en tiempo real.", "https://www.magicform.ai/"],
        ["multimedia", "Songr.ai", "Hacer canciones", "https://www.songr.ai/"],
        ["multimedia", "Suno", "Hacer canciones", "https://suno.com/"],
        ["productividad", "Rephraser AI", "Reformule el texto usando AI,", "https://ahrefs.com/writing-tools/paraphrasing-tool"],
        ["automatizacion redes", "Optimo", "programa de marketing gratuito impulsado por IA que simplifica y acelera el proceso de marketing", "https://askoptimo.com/"],
        ["automatizacion productividad", "Harpa.ai", "Extensión de Chrome y una plataforma NoCode RPA impulsada por IA que ahorra tiempo y dinero al automatizar tareas en la web para usted.", "https://harpa.ai/"],
        ["productividad", "Finding Words", "Creador de obituarios de IA por Empathy. Crear un tributo significativo a su ser querido puede ser una tarea difícil y emotiva. Con Finding Words de Empathy, simplemente puede responder una serie de preguntas y nuestra IA redactará un obituario en su honor.", "https://www.empathy.com/"],
        ["productividad redes imagen", "Cowriter", "Generar publicaciones creativas en blogs, ensayos, titulares, imágenes o cualquier otro contenido en minutos, todo optimizado especialmente para el marketing y el uso creativo.", "https://cowriter.org/login"],
        ["productividad redes imagen", "Jounce AI", "Redacción de textos publicitarios y el material gráfico", "https://www.jounce.ai/"],
        ["multimodal", "Hugging face", "Página multiherramienta", "https://huggingface.co/"],
        ["multimodal", "Lecture", "Transform your PDFs, PowerPoints, YouTube videos, lectures, textbook, and class notes into trusted study tools.", "https://lecture.new"],
        ["multimodal", "TinyWow", "Herramientas de utilidad impulsadas por IA para hacer su vida más fácil. Las herramientas más comunes incluyen PDF, video, imagen, escritura AI y herramientas de conversión.", "https://tinywow.com/"],
        ["programacion datos", "OSS Insight", "herramienta de consulta impulsada por GPT para la exploración de datos en vivo de GitHub. Simplemente haga su pregunta en lenguaje natural y Data Explore generará SQL, consultará los datos y presentará los resultados visualmente.", "https://ossinsight.io/explore/"],
        ["programacion datos", "AI Data Sidekick", "Escribe SQL, documentación y más x10 veces más rápido con nuestra colección de potentes recetas. Gratis para individuos y pequeños equipos.", "https://www.airops.com/"],
        ["datos", "LAION", "Proporciona conjuntos de datos, herramientas y modelos para liberar la investigación del aprendizaje automático.", "https://laion.ai/"],
        ["imagen", "Artsmart.ai", "Generación de imágenes de arte de IA hasta avatares de IA", "https://artsmart.ai/"],
        ["divertido asistente", "Character AI", "Bots de chat superinteligentes que te escuchan, te entienden y te recuerdan", "[enlace sospechoso eliminado],"],
        ["imagen", "Caricaturer.io", "convertir sus imágenes regulares en caricaturaS", "https://www.caricaturer.io/"],
        ["imagen", "Creative Reality Studio", "convertirá tu visión en un avatar parlante en cuestión de segundos.", "https://studio.d-id.com/"],
        ["imagen", "Imagetocartoon", "creador de avatares que utiliza inteligencia artificial para convertir tus fotos en versiones de dibujos animados. ", "https://imagetocartoon.com/"],
        ["imagen", "Kinetix", "crear animaciones en 3D", "https://www.kinetix.tech/"],
        ["textovideo multimedia", "Vidext", "estudio de producción totalmente en línea que transforma textos y documentos en videos atractivos en todos los idiomas", "https://www.vidext.io/es"],
        ["imagen", "Vana Portrait", "crear autorretratos tuyos en infinitos estilos.", "https://portrait.vana.com/"],
        ["imagen", "Alethea", "Permite la creación de NFT interactivos e inteligentes (iNFT).", "https://alethea.ai/"],
        ["imagen", "Luma AI", "Captura en 3D realista. Fotorrealismo, reflejos y detalles inigualables. ¡El futuro de VFX es ahora, para todos!", "https://lumalabs.ai/dream-machine"],
        ["imagen", "Pixela AI", "Texturas de Juegos Generadas por IA. ¡Sube tu textura generada para compartir con la comunidad!", "https://pixela.ai/"],
        ["multimedia", "SplashMusic", "Crear musica", "https://www.splashmusic.com/"],
        ["imagen", "Pixelate", "Conversor de arte de imagen a píxelart", "https://www.scenario.com/features/pixelate"],
        ["divertido", "Booom.ai", "Genere un divertido juego de trivia que pueda jugar en torno a un tema ingresado. Puedes jugar solo o con amigos.", "https://joinplayroom.com/games/booom/"],
        ["imagen", "Unscreen", "Elimina el fondo de cualquier vídeo o GIF automáticamente.", "https://www.screen.com/"],
        ["multimedia", "Magisto", "Editor de vídeo inteligente que crea vídeos profesionales en minutos.", "https://www.magisto.com/"],
        ["multimedia", "Animoto", "Creador de vídeos online para fotos y videoclips.", "https://animoto.com/"],
        ["multimedia", "Adobe Enhance", "Mejora la calidad de audio y vídeo con inteligencia artificial.", "https://podcast.adobe.com/enhance"],
        ["multimodal", "Descript", "Edita audio y vídeo transcribiendo el contenido, como si fuera un documento de texto.", "https://www.descript.com/"],
        ["voztexto", "Krisp", "Elimina el ruido de fondo durante llamadas y reuniones.", "https://krisp.ai/"],
        ["multimedia", "Filmora", "Software de edición de vídeo para crear contenido de forma sencilla.", "https://filmora.wondershare.es/"],
        ["productividad datos", "GitMind AI", "Herramienta de mapas mentales y brainstorming con funciones de IA.", "https://gitmind.com/ai"],
        ["productividad", "CoCram", "Plataforma de estudio y aprendizaje colaborativo.", "https://cocram.com/"],
        ["textovoz", "Audioread", "Convierte artículos web, PDFs y otros documentos en audio.", "https://audiore,ad.com/"],
        ["textovoz", "Vowt", "Sintetizador de voz basado en IA para generar narraciones.", "https://vowt.ai/"],
        ["asistente", "Mayday", "Asistente personal con IA para gestionar tu calendario y tareas.", "https://www.mayday.ai/"],
        ["productividad datos", "Rewind", "Graba y busca todo lo que has visto, dicho o escuchado en tu ordenador.", "https://www.rewind.ai/"],
        ["productividad buscador", "What The AI", "Directorio y buscador de herramientas de inteligencia artificial.", "https://whattheai.xyz/"],
        ["productividad datos", "Fibery AI", "Plataforma de gestión de proyectos y colaboración con capacidades de IA.", "https://fibery.io/ai"],
        ["productividad voztexto", "Fireflies AI", "Asistente de reuniones con IA que transcribe, resume y analiza conversaciones.", "https://fireflies.ai/"],
        ["programacion", "AI Intern", "Asistente de codificación y desarrollo impulsado por IA.", "https://aiintern.io/"],
        ["multimodal", "Cecai", "Plataforma para interactuar con diferentes modelos de IA.", "https://cecaif.com/"],
        ["datos", "Nanonet", "Automatiza la extracción de datos de documentos con IA.", "https://nanonet.com/"],
        ["productividad", "Taskade", "Espacio de trabajo todo en uno para equipos que combina notas, tareas y chat.", "https://www.taskade.com/"],
        ["imagen", "Stable Diffusion", "Modelo de inteligencia artificial que genera imágenes a partir de descripciones de texto.", "https://stablediffusionweb.com/es"],
        ["textovideo", "Runway ML", "Plataforma de edición de vídeo impulsada por IA con funciones avanzadas.", "https://runwayml.com/"],
        ["textovideo", "Veedio", "Herramienta de edición de vídeo para crear contenido de forma rápida y sencilla.", "https://www.veed.io/"],
        ["textovideo", "Synthesia", "Generación de vídeos a partir de texto con avatares de IA.", "https://www.synthesia.io/"],
        ["automatizacion", "Sheethi app", "Automatización de tareas repetitivas y creación de flujos de trabajo.", "https://sheethi.com/"],
        ["buscador", "Futurepedia", "Directorio de herramientas y recursos de IA.", "https://www.futurepedia.io/"],
        ["productividad", "Beautiful.ai", "Creación de presentaciones impactantes con diseño asistido por IA.", "https://www.beautiful.ai/"],
        ["asistente", "Notya AlanAl", "Asistente personal con IA para organización y gestión de tareas.", "https://noty.ai/"],
        ["automatizacion", "QuestAI", "Herramienta de automatización y optimización de flujos de trabajo.", "https://quest.ai/"],
        ["automatizacion", "Xembly", "Automatización de tareas administrativas y de reuniones.", "https://xembly.com/"],
        ["productividad", "MagicalAI", "Automatización de texto y atajos para mejorar la productividad.", "https://www.getmagical.com/"],
        ["productividad", "Productivity", "Herramienta genérica de productividad (se asume un nombre de categoría).", "https://productivity.com/"],
        ["automatizacion", "Support Board", "Plataforma de soporte al cliente con IA para automatizar interacciones.", "https://supportboard.io/"],
        ["asistente", "Hints AI", "Asistente de escritura y creatividad basado en IA.", "https://hints.ai/"],
        ["productividad", "Grammarly", "Asistente de escritura para corrección gramatical y de estilo.", "https://www.grammarly.com/"],
        ["productividad", "Tome app", "Creación de presentaciones interactivas y visuales.", "https://tome.app/"],
        ["productividad", "Rytr", "Asistente de escritura con IA para generar contenido.", "https://rytr.me/"],
        ["productividad", "CopyAI", "Generación de textos de marketing y ventas con IA.", "https://www.copy.ai/"],
        ["productividad", "Dib", "Herramienta de escritura asistida por IA para generar ideas y contenido.", "https://dib.ai/"],
        ["seo", "CaniRank", "Análisis SEO y optimización de contenido.", "https://www.canirank.com/"],
        ["productividad", "Anyword", "Generación de textos de marketing y publicidad con IA.", "https://anyword.com/"],
        ["seo", "Keyword Tool", "Herramienta para la investigación de palabras clave.", "https://keywordtool.io/"],
        ["productividad", "Wordtune", "Herramienta de reescritura y mejora de textos.", "https://www.wordtune.com/"],
        ["productividad", "Simplified", "Plataforma todo en uno para diseño, escritura y marketing.", "https://simplified.com/"],
        ["productividad", "Jasper", "Asistente de escritura con IA para generar contenido creativo.", "https://www.jasper.ai/"],
        ["productividad", "Flick AI", "Generación de contenido para redes sociales.", "https://www.flick.tech/"],
        ["productividad", "Text Metrics", "Análisis y mejora de la calidad del texto.", "https://textmetrics.com/"],
        ["productividad", "Prowritingaid", "Asistente de escritura para mejorar gramática, estilo y legibilidad.", "https://prowritingaid.com/"],
        ["asistente", "ChatGPT", "Modelo de lenguaje conversacional de IA.", "https://chat.openai.com/"],
        ["productividad", "Writecream", "Generación de contenido de marketing y ventas con IA.", "https://www.writecream.com/"],
        ["productividad", "QuillBot", "Herramienta de parafraseo y resumen de texto.", "https://quillbot.com/"],
        ["traduccion", "DeepL", "Servicio de traducción automática de alta calidad.", "https://www.deepl.com/"],
        ["productividad", "Writesonic", "Generación de textos de marketing, blogs y descripciones de productos con IA.", "https://writesonic.com/"],
        ["productividad", "Smart Copy", "Generación de textos publicitarios y de marketing con IA.", "https://unbounce.com/smart-copy/"],
        ["productividad", "WordAI", "Herramienta de reescritura y parafraseo de texto.", "https://wordai.com/"],
        ["productividad", "Ink", "Editor de contenido con IA para optimización SEO y escritura.", "https://inkforall.com/"],
        ["seo", "SEO", "Categoría genérica para herramientas de SEO.", "https://seo.com/"],
        ["productividad", "Writing", "Categoría genérica para herramientas de escritura.", "https://writing.com/"],
        ["seo", "Scalenut", "Plataforma de contenido con IA para investigación y creación SEO.", "https://www.scalenut.com/"],
        ["seo", "Surfer SEO", "Optimización de contenido para motores de búsqueda.", "https://surferseo.com/"],
        ["textovideo", "Invideo", "Creación de vídeos online con plantillas y herramientas de edición.", "https://invideo.io/"],
        ["textovideo", "Pictory", "Creación de vídeos a partir de texto o imágenes.", "https://pictory.ai/"],
        ["textovideo", "DeepBrain AI", "Generación de vídeos con avatares de IA realistas.", "https://www.deepbrain.io/"],
        ["multimedia", "GetMunch", "Herramienta para crear clips de vídeo cortos y atractivos.", "https://www.getmunch.com/"],
        ["multimedia", "FlexClip", "Editor de vídeo online para crear vídeos de forma sencilla.", "https://www.flexclip.com/"],
        ["multimedia", "Opus Clips", "Creación de clips de vídeo a partir de contenido largo.", "https://www.opus.pro/"],
        ["automatizacion", "Sendinblue", "Plataforma de marketing por correo electrónico y automatización de marketing.", "https://www.sendinblue.com/"],
        ["automatizacion", "Marketing plano", "Herramienta de planificación y automatización de marketing.", "https://marketingplatform.io/"],
        ["automatizacion", "Cresta AI", "Automatización de la comunicación y el soporte al cliente.", "https://www.cresta.com/"],
        ["asistente", "Quickchat", "Plataforma para crear chatbots y asistentes virtuales.", "https://quickchat.ai/"],
        ["productividad", "Ferret", "Herramienta de investigación y análisis de personas y empresas.", "https://ferret.ai/"],
        ["automatizacion", "Xembly 3", "Automatización de tareas administrativas y de reuniones.", "https://xembly.com/"],
        ["productividad", "Qatalog", "Plataforma de gestión del conocimiento y colaboración.", "https://qatalog.com/"],
        ["productividad", "Scale", "Plataforma para el etiquetado de datos y anotación para IA.", "https://scale.com/"],
        ["productividad", "Summar AIze", "Herramienta de resumen de texto con IA.", "https://summarize.ai/"],
        ["asistente", "ElleAI", "Asistente de escritura y creatividad basado en IA.", "https://elle.ai/"],
        ["productividad", "Robin", "Plataforma de gestión de reuniones y calendarios.", "https://robinpowered.com/"],
        ["marketing", "Marketing", "Categoría genérica para herramientas de marketing.", "https://marketing.com/"],
        ["automatizacion", "Quicklines Contact", "Generación de líneas de apertura de correo electrónico personalizadas.", "https://quicklines.ai/"],
        ["productividad", "Reclaim", "Optimización de calendarios y gestión del tiempo.", "https://reclaim.ai/"],
        ["automatizacion", "Echowin", "Automatización de marketing y ventas.", "https://echowin.com/"],
        ["automatizacion", "Regie.ai", "Automatización de ventas y comunicaciones de marketing.", "https://regie.ai/"],
        ["automatizacion", "Unspam email", "Herramienta para la gestión y el envío de correos electrónicos.", "https://unspam.email/"],
        ["multimodal", "Adobe Sensei", "Plataforma de IA y aprendizaje automático para productos de Adobe.", "https://www.adobe.com/sensei.html"],
        ["automatizacion", "Smartwriter", "Generación de correos electrónicos fríos y mensajes personalizados.", "https://www.smartwriter.ai/"],
        ["asistente", "Chatboy", "Plataforma para crear chatbots y asistentes virtuales.", "https://chatboy.ai/"],
        ["asistente", "ChatOPT", "Modelo de lenguaje conversacional de IA.", "https://chatopt.com/"],
        ["automatizacion", "ConvertKit", "Plataforma de marketing por correo electrónico para creadores.", "https://convertkit.com/"],
        ["imagen", "Leonardo AI", "Generación de imágenes a partir de texto con IA.", "https://leonardo.ai/"],
        ["imagen", "Colormind", "Generador de paletas de colores basado en IA.", "http://colormind.io/"],
        ["imagen", "Midjourney", "Generación de imágenes artísticas a partir de texto con IA.", "https://www.midjourney.com/"],
        ["imagen", "Hotpot AI", "Herramientas de IA para edición de imágenes, arte y texto.", "https://hotpot.ai/"],
        ["imagen", "Microsoft Designer", "Herramienta de diseño gráfico con IA para crear imágenes y diseños.", "https://designer.microsoft.com/"],
        ["imagen", "Ando Studio", "Plataforma de diseño gráfico y edición de imágenes con IA.", "https://andostudio.com/"],
        ["imagen", "Visualeyes", "Análisis de la atención visual en diseños.", "https://visualeyes.design/"],
        ["imagen", "Font Joy", "Generador de combinaciones de fuentes con IA.", "https://fontjoy.com/"],
        ["productividad", "Content Forge", "Generación de contenido con IA para marketing y ventas.", "https://contentforge.ai/"],
        ["productividad", "Hypotenuse AI", "Generación de contenido de alta calidad con IA.", "https://www.hypotenuse.ai/"],
        ["imagen", "Stockimg AI", "Generación de imágenes de stock con IA.", "https://stockimg.ai/"],
        ["productividad", "Jasper", "Asistente de escritura con IA para generar contenido creativo.", "https://www.jasper.ai/"],
        ["asistente", "Chatsonic", "Modelo de lenguaje conversacional de IA con acceso a internet.", "https://writesonic.com/chatsonic"],
        ["imagen", "Blue Willow", "Generador de imágenes artísticas a partir de texto con IA.", "https://www.bluewillow.ai/"],
        ["imagen", "DALL-E", "Generación de imágenes a partir de texto con IA.", "https://openai.com/dall-e-2/"],
        ["asistente", "Google Bard", "Modelo de lenguaje conversacional de Google.", "https://bard.google.com/"],
        ["imagen", "Bing Image", "Generador de imágenes de Microsoft Bing.", "https://www.bing.com/images/create"],
        ["imagen", "MakeLogo.ai", "Creación de logotipos con IA.", "https://makelogo.ai/"],
        ["imagen", "Remove.bg", "Eliminación de fondos de imágenes.", "https://www.remove.bg/"],
        ["productividad", "Predict AI", "Análisis predictivo para decisiones empresariales.", "https://predict.ai/"],
        ["automatizacion", "PolyAI", "Creación de asistentes de voz impulsados por IA.", "https://poly.ai/"],
        ["imagen", "Trypencil", "Creación de ilustraciones y arte digital con IA.", "https://trypencil.com/"],
        ["productividad", "Rationale", "Herramienta para el pensamiento crítico y la toma de decisiones.", "https://rationale.ai/"],
        ["asistente", "Poe by Quora", "Plataforma para interactuar con diferentes modelos de lenguaje de IA.", "https://poe.com/"],
        ["asistente", "YouChat", "Asistente conversacional de IA con acceso a internet.", "https://you.com/chat"],
        ["asistente", "Bing AI", "Asistente conversacional de IA integrado en Bing.", "https://www.bing.com/chat"],
        ["programacion", "Hugging Face", "Plataforma para modelos de lenguaje y herramientas de IA de código abierto.", "https://huggingface.co/"],
        ["asistente", "Claude", "Modelo de lenguaje conversacional de Anthropic.", "https://www.anthropic.com/index/claude"],
        ["imagen", "Designs.ai", "Plataforma de diseño gráfico con IA para crear logotipos, vídeos y maquetas.", "https://designs.ai/"],
        ["imagen", "Blend AI", "Creación de imágenes y diseños con IA.", "https://blend.ai/"],
        ["diseño", "Figma AI", "Funcionalidades de IA para diseño de interfaces de usuario.", "https://www.figma.com/ai/"],
        ["asistente", "ChatSpot", "Asistente de IA para ventas y marketing.", "https://chatspot.ai/"],
        ["automatizacion", "Kommunicate", "Plataforma de chat en vivo y chatbots para atención al cliente.", "https://www.kommunicate.io/"],
        ["imagen", "Adobe Express", "Herramienta de diseño gráfico online con plantillas y funciones de IA.", "https://www.adobe.com/express/"],
        ["programacion asistente productividad", "v0.dev", "Una herramienta de Vercel que genera diseños de interfaz de usuario y código (React, Tailwind CSS) a partir de descripciones en lenguaje natural o imágenes, funcionando como un asistente de IA para el desarrollo front-end y el diseño.", "v0.dev"],
        ["programacion productividad", "RandomA11y", "Una herramienta que genera combinaciones de colores aleatorias y accesibles para diseño web, garantizando el cumplimiento de los estándares de contraste WCAG.", "https://randoma11y.com/"],
        ["imagen productividad", "Stills", "Una plataforma de licencia de fotografía con imágenes de alta calidad, seleccionadas de fotógrafos relevantes, orientada a diseñadores y creativos.", "https://www.stills.com/"],
        ["imagen multimedia", "Dupe Photos", "Una plataforma de imágenes y videos de stock libres de derechos, con un enfoque en contenido 'aesthetic' y socialmente identificable para la industria creativa.", "https://dupephotos.com/"],
        ["imagen productividad", "Typeverything", "Una fundición tipográfica especializada en el desarrollo de fuentes de visualización, que ofrece un catálogo de fuentes diseñadas por creadores independientes para diversos proyectos.", "https://typeverything.com/"],
        ["imagen multimedia divertido", "Type face animator", "Una herramienta para crear animaciones tipográficas personalizadas de forma rápida y sencilla, con plantillas y opciones para ajustar texto, tamaño y colores.", "https://typeverything.com/"],
        ["imagen productividad", "AreaMockups", "Ofrece mockups de alta calidad para presentar diseños de forma profesional.", "https://areamockups.com/"],
        ["imagen multimodal arquitectura", "3d hunyuan", "Una herramienta de Tencent Hunyuan AI que permite generar modelos 3D a partir de indicaciones o descripciones, transformando conceptos en objetos tridimensionales.", "https://3d.hunyuan.tencent.com/"]
    ];

	generarFiltros(arrayFiltros);
    generarLinks(arrayLinks);

})()
