// Toggle theme between light and dark mode
document.getElementById('theme-toggle-button').addEventListener('click', function () {
    var currentTheme = document.body.dataset.theme;
    if (currentTheme === 'dark') {
        document.body.dataset.theme = '';
        this.textContent = '☀️'; // Sun emoji for day mode
    } else {
        document.body.dataset.theme = 'dark';
        this.textContent = '🌙'; // Moon emoji for night mode
    }
});

// Filter portfolio items by tags
function filterPortfolio(tag) {
    var items = document.getElementsByClassName('portfolio-item');
    for (var i = 0; i < items.length; i++) {
        var itemTags = items[i].dataset.tags || "";
        if (itemTags.split(',').includes(tag) || tag === 'all') {
            items[i].style.display = '';
        } else {
            items[i].style.display = 'none';
        }
    }
}

// Search portfolio items
function searchPortfolio() {
    var input = document.getElementById('searchBar');
    var filter = input.value.toUpperCase();
    var items = document.getElementsByClassName('portfolio-item');

    for (var i = 0; i < items.length; i++) {
        var titleElement = items[i].getElementsByTagName('h4')[0];
        var itemTitle = titleElement ? titleElement.textContent.toUpperCase() : "";
        var itemTags = (items[i].dataset.tags || "").toUpperCase();

        if (itemTitle.indexOf(filter) > -1 || itemTags.indexOf(filter) > -1) {
            items[i].style.display = '';
        } else {
            items[i].style.display = 'none';
        }
    }
}






// Populate dropdown with tags and manage dropdown hover feature
document.addEventListener('DOMContentLoaded', function () {
    var items = document.getElementsByClassName('portfolio-item');
    var dropdown = document.getElementById('tagDropdown');
    var tags = new Set();

    for (var i = 0; i < items.length; i++) {
        var itemTags = items[i].dataset.tags.split(',');
        itemTags.forEach(function (tag) {
            tags.add(tag.trim());
        });
    }

    // Add dropdown tags dynamically
    tags.forEach(function (tag) {
        var div = document.createElement('div');
        div.textContent = tag;
        div.className = 'dropdown-tag';
        div.onclick = function () {
            document.getElementById('searchBar').value = tag; // Populate the search bar
            searchPortfolio(); // Trigger the search
        };
        dropdown.appendChild(div);
    });

    // Function to repopulate dropdown
    function populateDropdown() {
        dropdown.innerHTML = ''; // Clear existing tags
        tags.forEach(function (tag) {
            var div = document.createElement('div');
            div.textContent = tag;
            div.className = 'dropdown-tag';
            div.onclick = function () {
                document.getElementById('searchBar').value = tag; // Populate the search bar
                searchPortfolio(); // Trigger the search
            };
            dropdown.appendChild(div);
        });
    }

    // Call populateDropdown initially and after each search
    document.addEventListener('DOMContentLoaded', populateDropdown);
});
