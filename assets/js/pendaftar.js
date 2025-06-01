document.addEventListener('DOMContentLoaded', function () {
  fetchDataPendaftar();
});

async function fetchDataPendaftar() {
  const token = localStorage.getItem('authToken');
  if (!token) {
    window.location.href = 'login.html';
    return;
  }

  const url = 'https://pendaftaran-coc-api.up.railway.app/api/pendaftar/get';
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Gagal mengambil data pendaftar');
    }
    const result = await response.json();
    renderTableData(result.data);
  } catch (error) {
    console.error('Error:', error);
  }
}

function renderTableData(data) {
  const tableBody = document.getElementById('tbl').getElementsByTagName('tbody')[0];
  const jumlahElement = document.getElementById('jumlah');
  jumlahElement.textContent = data.length;

  // Clear existing rows
  tableBody.innerHTML = '';

  data.forEach((pendaftar, index) => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${pendaftar["nama-lengkap"]}</td>
      <td>${pendaftar.email}</td>
      <td>${pendaftar["no-telp"]}</td>
      <td>
        <i class="fas fa-eye text-primary" 
           style="cursor: pointer;" 
           data-image-url="https://pendaftaran-coc-api.up.railway.app/api/pendaftar/uploads/${pendaftar["bukti-follow"]}"
           onclick="showImageModal(this.getAttribute('data-image-url'))"
           title="Lihat Bukti Follow">
        </i>
      </td>
    `;

    tableBody.appendChild(row);
  });
}

function showImageModal(src) {
  const modalImage = document.getElementById('modalImage');
  modalImage.src = src;

  $('#imageModal').modal('show');
}