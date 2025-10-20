const API_URL = 'http://localhost:3000/api/mascotas';

document.addEventListener('DOMContentLoaded', () => {
  const formulario = document.getElementById('form-mascota');
  const tabla = document.querySelector('#tabla-mascotas tbody');

  const idmascota = document.getElementById('idmascota');
  const nombre = document.getElementById('nombre');
  const edad = document.getElementById('edad');

  const btnGuardar = document.getElementById('btnGuardar');
  const btnCancelar = document.getElementById('btnCancelar');

  btnCancelar?.addEventListener('click', () => {
    if (window.location.pathname.includes('/mascotas/editar')) {
      window.location.href = '/mascotas';
    } else {
      btnGuardar.innerText = 'Guardar';
      formulario.reset();
    }
  });

  async function obtenerMascotas() {
    if (!tabla) return;
    try {
      const response = await fetch(API_URL);
      const mascotas = await response.json();

      tabla.innerHTML = '';

      mascotas.forEach(mascota => {
        const row = tabla.insertRow();

        row.insertCell().textContent = mascota.id;
        row.insertCell().textContent = mascota.nombre;
        row.insertCell().textContent = mascota.edad;

        const actionCell = row.insertCell();

        // Editar
        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.classList.add('btn', 'btn-info', 'btn-sm');
        editButton.onclick = () => {
          window.location.href = `/mascotas/editar/${mascota.id}`;
        };

        // Eliminar
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
        deleteButton.onclick = () => eliminarMascota(mascota.id, mascota.nombre);

        actionCell.appendChild(editButton);
        actionCell.appendChild(deleteButton);
      });
    } catch (e) {
      console.error(e);
    }
  }

  async function eliminarMascota(id, nombreMascota) {
    if (confirm(`¿Está seguro de eliminar a ${nombreMascota}?`)) {
      try {
        const response = await fetch(`${API_URL}/${id}`, { method: 'delete' });
        if (!response.ok) throw new Error(`Error al eliminar ${nombreMascota}`);
        await response.json();
        obtenerMascotas();
      } catch (e) {
        console.error(e);
      }
    }
  }

  formulario?.addEventListener('submit', async (event) => {
    event.preventDefault();

    const data = {
      nombre: nombre.value,
      edad: parseInt(edad.value)
    };

    try {
      let response;

      if (idmascota && idmascota.value !== '') {
        response = await fetch(`${API_URL}/${idmascota.value}`, {
          method: 'PUT',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });
      } else {
        response = await fetch(API_URL, {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });
      }

      if (!response.ok) throw new Error('Error al guardar/actualizar');
      const result = await response.json();
      console.log(result);

      if (window.location.pathname.includes('/mascotas/editar')) {
        window.location.href = '/mascotas';
      } else {
        btnGuardar.innerText = 'Guardar';
        formulario.reset();
        obtenerMascotas();
      }

    } catch (e) {
      console.error(e);
    }
  });

  obtenerMascotas();
});
