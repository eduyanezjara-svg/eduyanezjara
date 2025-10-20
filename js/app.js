const pasos = [
  {
    titulo: 'Crear un nuevo proyecto',
    descripcion:
      'Inicia ETS5 y genera un archivo de proyecto vacío definiendo su nombre, ubicación y topología inicial.',
    imagen: {
      src: 'img/ets5-nuevo-proyecto.svg',
      alt: 'Ventana de ETS5 mostrando la creación de un nuevo proyecto con campos de nombre y ruta.',
      caption: 'La ventana “Nuevo proyecto KNX” permite definir nombre, carpeta de trabajo e importar plantillas.'
    },
    tareas: [
      'Abrir ETS5 y seleccionar "Archivo &gt; Nuevo".',
      'Asignar un nombre descriptivo y la carpeta donde se guardará el proyecto.',
      'Elegir la plantilla básica o importar desde un proyecto existente si corresponde.'
    ],
    notas: [
      'ETS5 guarda automáticamente copias de respaldo en la carpeta del usuario. Aún así, realiza respaldos manuales tras cada sesión.',
      'Utiliza un nombre de proyecto que incluya cliente, ubicación y fecha (por ejemplo: "Residencial_Lira_2024").'
    ]
  },
  {
    titulo: 'Configurar la topología',
    descripcion:
      'Define áreas, líneas y direcciones individuales de cada dispositivo conforme al diseño eléctrico y a las reglas KNX.',
    imagen: {
      src: 'img/ets5-topologia.svg',
      alt: 'Vista de topología de ETS5 con áreas, líneas y dispositivos organizados.',
      caption: 'En la vista Topología organiza áreas, líneas y dispositivos antes de asignar direcciones.'
    },
    tareas: [
      'En la vista Topología, agregar áreas y líneas según la estructura planificada.',
      'Para cada línea, establecer la fuente de alimentación y el repetidor si corresponde.',
      'Crear los dispositivos virtuales asignando direcciones individuales únicas (formato A.L.D).'
    ],
    notas: [
      'Respeta la regla de un máximo de 64 dispositivos por línea (sin repetidor).',
      'Si trabajas con routers IP, configura sus direcciones físicas consecutivas para facilitar el diagnóstico.'
    ]
  },
  {
    titulo: 'Importar catálogos y añadir dispositivos',
    descripcion:
      'Carga en ETS5 los productos KNX necesarios y arrástralos a la topología del proyecto.',
    imagen: {
      src: 'img/ets5-catalogo.svg',
      alt: 'Catálogo de ETS5 con el botón para importar archivos .knxprod y varios dispositivos listados.',
      caption: 'Utiliza el catálogo para importar archivos .knxprod y tener disponibles los equipos del fabricante.'
    },
    tareas: [
      'En la vista Catálogo, importar los archivos .knxprod de cada fabricante.',
      'Arrastrar los dispositivos desde el catálogo a la línea correspondiente en la topología.',
      'Configurar parámetros básicos (tensión de alimentación, número de canales, modo de funcionamiento).'
    ],
    notas: [
      'Mantén actualizadas las versiones de catálogo para evitar incompatibilidades.',
      'Usa la función de búsqueda del catálogo para localizar rápidamente actuadores o pulsadores específicos.'
    ]
  },
  {
    titulo: 'Crear direcciones de grupo',
    descripcion:
      'Organiza la comunicación entre sensores y actuadores mediante direcciones de grupo jerárquicas.',
    imagen: {
      src: 'img/ets5-direcciones.svg',
      alt: 'Vista de direcciones de grupo en ETS5 con estructura jerárquica de tres niveles.',
      caption: 'La vista Direcciones de grupo muestra la jerarquía de comunicación entre sensores y actuadores.'
    },
    tareas: [
      'Cambiar a la vista Direcciones de grupo y crear la estructura de 3 niveles (principal, medio, subgrupo).',
      'Nombrar cada dirección según la función (ej. "Iluminación / Planta baja / Sala estar").',
      'Relacionar objetos de comunicación de los dispositivos con las direcciones correspondientes.'
    ],
    notas: [
      'Aplica prefijos o códigos para identificar el tipo de función (ILU, PER, CLI).',
      'Utiliza comentarios en los objetos de grupo para describir escenarios o condiciones especiales.'
    ]
  },
  {
    titulo: 'Configurar parámetros y asociaciones',
    descripcion:
      'Ajusta los parámetros de cada equipo y vincula los objetos de comunicación con las direcciones de grupo.',
    imagen: {
      src: 'img/ets5-parametros.svg',
      alt: 'Ventana de parámetros de un actuador en ETS5 con asociaciones destacadas.',
      caption: 'Edita parámetros y asociaciones para cada canal asegurando que todos los objetos estén vinculados.'
    },
    tareas: [
      'Abrir la ventana de parámetros de cada dispositivo y seleccionar el modo de funcionamiento adecuado.',
      'Relacionar entradas (pulsadores, sensores) con las direcciones de grupo de salida deseadas.',
      'Verificar que no existan objetos sin dirección asignada utilizando el filtro "Objetos no asociados".'
    ],
    notas: [
      'Aprovecha las funciones de copiar/pegar parámetros para equipos iguales.',
      'Activa la opción "Mostrar objetos" en la vista de direcciones para detectar configuraciones incompletas.'
    ]
  },
  {
    titulo: 'Realizar chequeos y compilar',
    descripcion:
      'Valida el proyecto antes de programar, corrigiendo advertencias y generando informes si es necesario.',
    imagen: {
      src: 'img/ets5-chequeo.svg',
      alt: 'Pantalla de comprobación del proyecto en ETS5 mostrando advertencias resueltas.',
      caption: 'La herramienta Comprobar proyecto detecta inconsistencias y genera informes antes de la programación.'
    },
    tareas: [
      'Ejecutar "Proyecto &gt; Comprobar" para detectar direcciones duplicadas o parámetros incompletos.',
      'Revisar el diagnóstico de la vista "Journal" y solucionar mensajes críticos.',
      'Generar un informe PDF para documentar la configuración final antes de la puesta en marcha.'
    ],
    notas: [
      'Utiliza etiquetas de color para marcar las líneas ya revisadas.',
      'Guarda una copia del proyecto en formato .knxproj antes de pasar a la programación.'
    ]
  },
  {
    titulo: 'Descargar programación a los dispositivos',
    descripcion:
      'Conecta la interfaz de programación y transfiere la configuración a cada equipo de la instalación KNX.',
    imagen: {
      src: 'img/ets5-descarga.svg',
      alt: 'Progreso de descarga hacia un dispositivo KNX dentro de ETS5.',
      caption: 'Supervisa el progreso de descarga y confirma que cada dispositivo recibe su programación.'
    },
    tareas: [
      'Seleccionar la interfaz KNX/IP o USB desde el menú desplegable de la barra superior.',
      'Entrar en modo programación en cada dispositivo (botón de programación físico) y pulsar "Descargar".',
      'Verificar el resultado de la descarga y repetir en caso de errores de comunicación.'
    ],
    notas: [
      'Mantén la tensión de bus estable durante la descarga para evitar interrupciones.',
      'Utiliza la descarga parcial cuando solo se modifican algunos dispositivos.'
    ]
  }
];

const renderTimeline = () => {
  const template = document.querySelector('#paso-template');
  const list = document.querySelector('#timeline');
  const fragment = document.createDocumentFragment();

  pasos.forEach((paso, index) => {
    const node = template.content.cloneNode(true);
    node.querySelector('.timeline__step').textContent = `Paso ${index + 1}`;
    node.querySelector('.timeline__title').textContent = paso.titulo;
    const description = node.querySelector('.timeline__description');
    description.textContent = paso.descripcion;

    if (paso.imagen) {
      const figure = document.createElement('figure');
      figure.className = 'timeline__media';

      const img = document.createElement('img');
      img.src = paso.imagen.src;
      img.alt = paso.imagen.alt;
      img.loading = 'lazy';
      figure.append(img);

      if (paso.imagen.caption) {
        const caption = document.createElement('figcaption');
        caption.textContent = paso.imagen.caption;
        figure.append(caption);
      }

      description.insertAdjacentElement('afterend', figure);
    }

    const tasksList = node.querySelector('.timeline__tasks');
    paso.tareas.forEach((tarea) => {
      const li = document.createElement('li');
      li.innerHTML = tarea;
      tasksList.append(li);
    });

    const notesBody = node.querySelector('.timeline__notes-body');
    paso.notas.forEach((nota) => {
      const p = document.createElement('p');
      p.textContent = nota;
      notesBody.append(p);
    });

    fragment.append(node);
  });

  list.append(fragment);
};

renderTimeline();
