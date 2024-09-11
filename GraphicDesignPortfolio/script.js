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

// Full-screen image and video functionality
document.addEventListener('DOMContentLoaded', function () {
    // Create the overlay for full-screen images and videos
    var overlay = document.createElement('div');
    overlay.id = 'fullscreen-overlay';
    overlay.innerHTML = '<span id="close-btn">✖</span><iframe id="fullscreen-iframe" src="" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
    document.body.appendChild(overlay);

    var fullscreenIframe = document.getElementById('fullscreen-iframe');
    var closeButton = document.getElementById('close-btn');

    // Add click event to images and videos
    document.querySelectorAll('.fullscreen-img').forEach(function (element) {
        element.addEventListener('click', function () {
            if (element.tagName === 'IFRAME') {
                fullscreenIframe.src = this.src; // Set the clicked iframe's source for full-screen view
            } else {
                fullscreenIframe.src = ''; // Clear iframe src if it's not an iframe
                fullscreenIframe.style.display = 'none'; // Hide iframe
                overlay.innerHTML = '<span id="close-btn">✖</span><img id="fullscreen-image" src="' + this.src + '">';
            }
            overlay.style.display = 'flex'; // Show overlay
        });
    });

    // Add click event to close button
    closeButton.addEventListener('click', function () {
        overlay.style.display = 'none'; // Hide overlay
        fullscreenIframe.src = ''; // Clear the iframe source when closing
    });

    // Add event listener for 'ESC' key press
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            overlay.style.display = 'none'; // Hide overlay when ESC is pressed
            fullscreenIframe.src = ''; // Clear the iframe source when exiting
        }
    });
});
