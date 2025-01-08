import { initialBusinesses } from './data.js';

    document.addEventListener('DOMContentLoaded', () => {
      const businessList = document.getElementById('business-list');
      if (!businessList) return;

      initialBusinesses.forEach(business => {
        const businessItem = document.createElement('div');
        businessItem.classList.add('business-item');
        businessItem.innerHTML = `
          <h3>${business.name}</h3>
          <p><strong>Category:</strong> ${business.category}</p>
          <p><strong>Address:</strong> ${business.address}</p>
          <p><strong>Phone:</strong> ${business.phone}</p>
        `;
        businessList.appendChild(businessItem);
      });
    });
