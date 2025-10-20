const payslips = [
  {
    id: '2024-06',
    periodo: 'Junio 2024',
    fechaDeposito: '30/06/2024',
    bruto: 1250000,
    neto: 986000,
    archivo: '#',
    asignaciones: [
      { concepto: 'Horas de aula', monto: 740000 },
      { concepto: 'Horas extraordinarias', monto: 120000 },
      { concepto: 'Bono desempeño PME', monto: 90000 }
    ],
    descuentos: [
      { concepto: 'AFP Habitat', monto: 105000 },
      { concepto: 'Salud Fonasa', monto: 74000 },
      { concepto: 'Seguro de cesantía', monto: 21000 }
    ],
    notas: 'Incluye retroactivo por ajuste salarial 3%.'
  },
  {
    id: '2024-05',
    periodo: 'Mayo 2024',
    fechaDeposito: '30/05/2024',
    bruto: 1225000,
    neto: 969500,
    archivo: '#',
    asignaciones: [
      { concepto: 'Horas de aula', monto: 740000 },
      { concepto: 'Horas extraprogramáticas', monto: 95000 },
      { concepto: 'Bono asignación excelencia', monto: 88000 }
    ],
    descuentos: [
      { concepto: 'AFP Habitat', monto: 104500 },
      { concepto: 'Salud Fonasa', monto: 73500 },
      { concepto: 'Colegiatura sindicato', monto: 14500 }
    ]
  },
  {
    id: '2024-04',
    periodo: 'Abril 2024',
    fechaDeposito: '30/04/2024',
    bruto: 1198000,
    neto: 948200,
    archivo: '#',
    asignaciones: [
      { concepto: 'Horas de aula', monto: 710000 },
      { concepto: 'Bono agno escolar', monto: 70000 },
      { concepto: 'Asignación locomoción', monto: 38000 }
    ],
    descuentos: [
      { concepto: 'AFP Habitat', monto: 103200 },
      { concepto: 'Salud Fonasa', monto: 72800 },
      { concepto: 'Mutualidad', monto: 21000 }
    ]
  },
  {
    id: '2023-12',
    periodo: 'Diciembre 2023',
    fechaDeposito: '22/12/2023',
    bruto: 1380000,
    neto: 1095000,
    archivo: '#',
    asignaciones: [
      { concepto: 'Horas de aula', monto: 720000 },
      { concepto: 'Bono de navidad', monto: 250000 },
      { concepto: 'Horas extra', monto: 125000 }
    ],
    descuentos: [
      { concepto: 'AFP Habitat', monto: 118000 },
      { concepto: 'Salud Fonasa', monto: 84000 },
      { concepto: 'Crédito social', monto: 37000 }
    ]
  },
  {
    id: '2023-11',
    periodo: 'Noviembre 2023',
    fechaDeposito: '30/11/2023',
    bruto: 1175000,
    neto: 933000,
    archivo: '#',
    asignaciones: [
      { concepto: 'Horas de aula', monto: 695000 },
      { concepto: 'Bono asignación excelencia', monto: 82000 },
      { concepto: 'Movilización', monto: 39000 }
    ],
    descuentos: [
      { concepto: 'AFP Habitat', monto: 101700 },
      { concepto: 'Salud Fonasa', monto: 72000 },
      { concepto: 'Caja de compensación', monto: 21500 }
    ]
  }
];

const formatCurrency = (value) =>
  value.toLocaleString('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 });

const tableBody = document.querySelector('#payslip-body');
const filterAnio = document.querySelector('#filter-anio');
const searchInput = document.querySelector('#search');
const emptyState = document.querySelector('#empty-state');

const totalAcumuladoEl = document.querySelector('#total-acumulado');
const ultimoPeriodoEl = document.querySelector('#ultimo-periodo');
const ultimoMontoEl = document.querySelector('#ultimo-monto');
const promedioEl = document.querySelector('#promedio');

const detalleTemplate = document.querySelector('#detalle-template');
const detalleContenedor = document.querySelector('#detalle-contenido');

const obtenerAnios = () => {
  const years = new Set(payslips.map(({ periodo }) => periodo.split(' ')[1]));
  return Array.from(years).sort((a, b) => b.localeCompare(a));
};

const renderFiltros = () => {
  const years = obtenerAnios();
  const fragment = document.createDocumentFragment();

  const optionTodas = document.createElement('option');
  optionTodas.value = 'todas';
  optionTodas.textContent = 'Todos los años';
  fragment.append(optionTodas);

  years.forEach((year) => {
    const option = document.createElement('option');
    option.value = year;
    option.textContent = year;
    fragment.append(option);
  });

  filterAnio.append(fragment);
};

const renderTabla = (data) => {
  tableBody.innerHTML = '';

  if (!data.length) {
    emptyState.hidden = false;
    return;
  }

  emptyState.hidden = true;

  const fragment = document.createDocumentFragment();

  data.forEach((item) => {
    const row = document.createElement('tr');
    row.dataset.id = item.id;

    row.innerHTML = `
      <td>
        <span class="periodo">${item.periodo}</span>
        <p class="badge">${item.notas ? 'Con novedades' : 'Disponible'}</p>
      </td>
      <td>${item.fechaDeposito}</td>
      <td>${formatCurrency(item.bruto)}</td>
      <td>${formatCurrency(item.neto)}</td>
      <td>
        <button class="download-button" type="button" aria-label="Descargar liquidación de ${item.periodo}">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M7.5 12 12 16.5m0 0 4.5-4.5M12 16.5V3" />
          </svg>
          PDF
        </button>
      </td>
    `;

    row.addEventListener('click', () => mostrarDetalle(item.id));
    fragment.append(row);
  });

  tableBody.append(fragment);
};

const renderResumen = (data) => {
  if (!data.length) {
    totalAcumuladoEl.textContent = '$0';
    ultimoPeriodoEl.textContent = '—';
    ultimoMontoEl.textContent = '$0';
    promedioEl.textContent = '$0';
    return;
  }

  const netos = data.map(({ neto }) => neto);
  const total = netos.reduce((acc, value) => acc + value, 0);
  const promedio = Math.round(total / data.length);

  const [ultima] = [...data].sort((a, b) => b.id.localeCompare(a.id));

  totalAcumuladoEl.textContent = formatCurrency(total);
  ultimoPeriodoEl.textContent = ultima.periodo;
  ultimoMontoEl.textContent = formatCurrency(ultima.neto);
  promedioEl.textContent = formatCurrency(promedio);
};

const renderDetalle = (payslip) => {
  const templateContent = detalleTemplate.content.cloneNode(true);

  templateContent.querySelector('#detalle-periodo').textContent = payslip.periodo;
  templateContent.querySelector('#detalle-fecha').textContent = `Depósito el ${payslip.fechaDeposito}`;
  templateContent.querySelector('#detalle-bruto').textContent = formatCurrency(payslip.bruto);
  templateContent.querySelector('#detalle-neto').textContent = formatCurrency(payslip.neto);

  const asignacionesList = templateContent.querySelector('#detalle-asignaciones');
  const descuentosList = templateContent.querySelector('#detalle-descuentos');

  const createListItems = (items) => {
    if (!items.length) {
      const li = document.createElement('li');
      li.textContent = 'Sin registros';
      return [li];
    }

    return items.map(({ concepto, monto }) => {
      const li = document.createElement('li');
      const spanConcepto = document.createElement('span');
      spanConcepto.textContent = concepto;
      const spanMonto = document.createElement('span');
      spanMonto.textContent = formatCurrency(monto);
      li.append(spanConcepto, spanMonto);
      return li;
    });
  };

  createListItems(payslip.asignaciones).forEach((li) => asignacionesList.append(li));
  createListItems(payslip.descuentos).forEach((li) => descuentosList.append(li));

  const link = templateContent.querySelector('#detalle-descarga');
  link.href = payslip.archivo;
  link.setAttribute('aria-label', `Descargar PDF de ${payslip.periodo}`);

  detalleContenedor.replaceChildren(templateContent);
};

const mostrarDetalle = (id) => {
  const payslip = payslips.find((item) => item.id === id);
  if (!payslip) return;

  renderDetalle(payslip);
};

const aplicarFiltros = () => {
  const yearSelected = filterAnio.value;
  const searchTerm = searchInput.value.trim().toLowerCase();

  const filtered = payslips.filter((item) => {
    const [, year] = item.periodo.split(' ');
    const matchesYear = yearSelected === 'todas' || year === yearSelected;

    const textoBuscado = [
      item.periodo,
      item.notas ?? '',
      ...item.asignaciones.map((a) => a.concepto),
      ...item.descuentos.map((d) => d.concepto)
    ]
      .join(' ')
      .toLowerCase();

    const matchesSearch = searchTerm === '' || textoBuscado.includes(searchTerm);

    return matchesYear && matchesSearch;
  });

  renderTabla(filtered);
  renderResumen(filtered);

  if (filtered.length) {
    mostrarDetalle(filtered[0].id);
  } else {
    detalleContenedor.innerHTML = '<p>Modifica los filtros para ver tus liquidaciones.</p>';
  }
};

const init = () => {
  renderFiltros();
  filterAnio.value = 'todas';
  renderTabla(payslips);
  renderResumen(payslips);
  mostrarDetalle(payslips[0].id);

  filterAnio.addEventListener('change', aplicarFiltros);
  searchInput.addEventListener('input', aplicarFiltros);
};

init();
