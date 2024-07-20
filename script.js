const vendors = JSON.parse(localStorage.getItem('vendors')) || [];
const products = JSON.parse(localStorage.getItem('products')) || [];

document.addEventListener('DOMContentLoaded', () => {
    updateVendorList();
    updateProductTable();
    initializeTheme();
});

document.getElementById('vendorForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const vendorName = document.getElementById('vendorName').value;
    if (vendorName) {
        vendors.push(vendorName);
        localStorage.setItem('vendors', JSON.stringify(vendors));
        updateVendorList();
        document.getElementById('vendorName').value = '';
    }
});

document.getElementById('productForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const productName = document.getElementById('productName').value;
    const purchasePrice = parseFloat(document.getElementById('purchasePrice').value);
    const sellingPrice = parseFloat(document.getElementById('sellingPrice').value);

    if (productName && purchasePrice && sellingPrice) {
        const profitAmount = sellingPrice - purchasePrice;
        products.push({ productName, purchasePrice, sellingPrice, profitAmount });
        localStorage.setItem('products', JSON.stringify(products));
        updateProductTable();
        document.getElementById('productForm').reset();
    }
});

function updateVendorList() {
    const vendorList = document.getElementById('vendorList');
    vendorList.innerHTML = '';
    vendors.forEach((vendor, index) => {
        const li = document.createElement('li');
        li.textContent = vendor;

        const editButton = document.createElement('button');
        editButton.textContent = 'ویرایش';
        editButton.addEventListener('click', () => openEditVendorModal(index));

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'حذف';
        deleteButton.addEventListener('click', () => deleteVendor(index));

        li.appendChild(editButton);
        li.appendChild(deleteButton);
        vendorList.appendChild(li);
    });
}

function updateProductTable() {
    const tbody = document.querySelector('#productTable tbody');
    tbody.innerHTML = '';
    products.forEach((product, index) => {
        const row = document.createElement('tr');

        const cell1 = document.createElement('td');
        cell1.textContent = product.productName;

        const cell2 = document.createElement('td');
        cell2.textContent = formatNumber(product.purchasePrice) + ' تومان';

        const cell3 = document.createElement('td');
        cell3.textContent = formatNumber(product.sellingPrice) + ' تومان';

        const cell4 = document.createElement('td');
        cell4.textContent = formatNumber(product.profitAmount) + ' تومان';

        const cell5 = document.createElement('td');
        const editButton = document.createElement('button');
        editButton.textContent = 'ویرایش';
        editButton.addEventListener('click', () => openEditProductModal(index));
        cell5.appendChild(editButton);

        const cell6 = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'حذف';
        deleteButton.addEventListener('click', () => deleteProduct(index));
        cell6.appendChild(deleteButton);

        row.appendChild(cell1);
        row.appendChild(cell2);
        row.appendChild(cell3);
        row.appendChild(cell4);
        row.appendChild(cell5);
        row.appendChild(cell6);

        tbody.appendChild(row);
    });
}

function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "-");
}

function editVendor(index) {
    const newName = prompt('نام جدید فروشنده:', vendors[index]);
    if (newName !== null && newName.trim() !== '') {
        vendors[index] = newName;
        localStorage.setItem('vendors', JSON.stringify(vendors));
        updateVendorList();
    }
}

function deleteVendor(index) {
    vendors.splice(index, 1);
    localStorage.setItem('vendors', JSON.stringify(vendors));
    updateVendorList();
}

function openEditProductModal(index) {
    const product = products[index];
    document.getElementById('editProductIndex').value = index;
    document.getElementById('editProductName').value = product.productName;
    document.getElementById('editPurchasePrice').value = product.purchasePrice;
    document.getElementById('editSellingPrice').value = product.sellingPrice;

    document.getElementById('editProductModal').style.display = 'flex';
}

function closeEditProductModal() {
    document.getElementById('editProductModal').style.display = 'none';
}

document.querySelector('#editProductModal .close').addEventListener('click', closeEditProductModal);

document.getElementById('editProductForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const index = document.getElementById('editProductIndex').value;
    const productName = document.getElementById('editProductName').value;
    const purchasePrice = parseFloat(document.getElementById('editPurchasePrice').value);
    const sellingPrice = parseFloat(document.getElementById('editSellingPrice').value);

    if (productName && !isNaN(purchasePrice) && !isNaN(sellingPrice)) {
        const profitAmount = sellingPrice - purchasePrice;
        products[index] = {
            productName,
            purchasePrice,
            sellingPrice,
            profitAmount
        };
        localStorage.setItem('products', JSON.stringify(products));
        updateProductTable();
        closeEditProductModal();
    }
});

function deleteProduct(index) {
    products.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(products));
    updateProductTable();
}

function initializeTheme() {
    const darkMode = localStorage.getItem('darkMode') === 'true';
    if (darkMode) {
        document.body.classList.add('dark-mode');
    }
}

document.getElementById('themeToggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
});


function openEditVendorModal(index) {
    const vendor = vendors[index];
    document.getElementById('editVendorIndex').value = index;
    document.getElementById('editVendorName').value = vendor;

    document.getElementById('editVendorModal').style.display = 'flex';
}

document.querySelector('#editVendorModal .close').addEventListener('click', function() {
    document.getElementById('editVendorModal').style.display = 'none';
});

document.getElementById('editVendorForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const index = document.getElementById('editVendorIndex').value;
    const vendorName = document.getElementById('editVendorName').value;

    if (vendorName) {
        vendors[index] = vendorName;
        localStorage.setItem('vendors', JSON.stringify(vendors));
        updateVendorList();
        document.getElementById('editVendorModal').style.display = 'none';
    }
});
