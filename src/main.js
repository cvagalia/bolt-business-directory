import { initialBusinesses } from './data.js';

    const searchInput = document.getElementById('search-input');
    const businessList = document.getElementById('business-list');
    const editModal = document.getElementById('edit-modal');
    const editForm = document.getElementById('edit-form');
    const closeButton = document.querySelector('.close-button');

    let businesses = JSON.parse(localStorage.getItem('businesses')) || initialBusinesses;

    function saveBusinesses() {
      localStorage.setItem('businesses', JSON.stringify(businesses));
    }

    function displayBusinesses(businessesToDisplay) {
      businessList.innerHTML = '';
      businessesToDisplay.forEach(business => {
        const businessItem = document.createElement('div');
        businessItem.classList.add('business-item');
        businessItem.innerHTML = `
          <div>
            <h3>${business.name}</h3>
            <p><strong>Company No.:</strong> ${business.companyNo || 'N/A'}</p>
            <p><strong>TIN Certificate No.:</strong> ${business.tin || 'N/A'}</p>
            <p><strong>Category:</strong> ${business.category}</p>
             <p><strong>Province:</strong> ${business.province || 'N/A'}</p>
            <p><strong>Address:</strong> ${business.address}</p>
            <p><strong>Phone:</strong> ${business.phone}</p>
          </div>
          <div>
            <button class="edit-button" data-id="${business.id}">Edit</button>
            <button class="delete-button" data-id="${business.id}">Delete</button>
          </div>
        `;
        businessList.appendChild(businessItem);
      });

      const editButtons = document.querySelectorAll('.edit-button');
      editButtons.forEach(button => {
        button.addEventListener('click', () => {
          const businessId = button.getAttribute('data-id');
          openEditModal(businessId);
        });
      });

      const deleteButtons = document.querySelectorAll('.delete-button');
      deleteButtons.forEach(button => {
        button.addEventListener('click', () => {
          const businessId = button.getAttribute('data-id');
          deleteBusiness(businessId);
        });
      });
    }

    function openEditModal(id) {
      const business = businesses.find(b => b.id === id);
      if (business) {
        document.getElementById('edit-id').value = business.id;
        document.getElementById('edit-name').value = business.name;
        document.getElementById('edit-company-no').value = business.companyNo || '';
        document.getElementById('edit-tin').value = business.tin || '';
        document.getElementById('edit-category').value = business.category;
        document.getElementById('edit-province').value = business.province || '';
        document.getElementById('edit-address').value = business.address;
        document.getElementById('edit-phone').value = business.phone;
        const logoInput = document.getElementById('edit-logo');
        logoInput.value = '';
        editModal.style.display = 'block';
      }
    }

    function deleteBusiness(id) {
      businesses = businesses.filter(business => business.id !== id);
      saveBusinesses();
      displayBusinesses(businesses);
    }

    closeButton.addEventListener('click', () => {
      editModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
      if (event.target === editModal) {
        editModal.style.display = 'none';
      }
    });

    editForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const id = document.getElementById('edit-id').value;
      const logoInput = document.getElementById('edit-logo');
      let logoBase64 = null;

      if (logoInput.files && logoInput.files[0]) {
        logoBase64 = await readFileAsBase64(logoInput.files[0]);
      }

      const updatedBusiness = {
        id: id,
        name: document.getElementById('edit-name').value,
        companyNo: document.getElementById('edit-company-no').value,
        tin: document.getElementById('edit-tin').value,
        category: document.getElementById('edit-category').value,
        province: document.getElementById('edit-province').value,
        address: document.getElementById('edit-address').value,
        phone: document.getElementById('edit-phone').value,
        logo: logoBase64
      };
      businesses = businesses.map(business => business.id === id ? updatedBusiness : business);
      saveBusinesses();
      displayBusinesses(businesses);
      editModal.style.display = 'none';
    });

    function readFileAsBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }

    searchInput.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase();
      const filteredBusinesses = businesses.filter(business => {
        return (
          business.name.toLowerCase().includes(searchTerm) ||
          business.category.toLowerCase().includes(searchTerm) ||
           business.province?.toLowerCase().includes(searchTerm) ||
          business.address.toLowerCase().includes(searchTerm)
        );
      });
      displayBusinesses(filteredBusinesses);
    });

    displayBusinesses(businesses);
