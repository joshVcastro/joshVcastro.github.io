document.getElementById('theme-toggle-button').addEventListener('click', function() {
    var currentTheme = document.body.dataset.theme;
    if (currentTheme === 'dark') {
        document.body.dataset.theme = '';
        this.textContent = '☀️'; // Sun emoji for day mode
    } else {
        document.body.dataset.theme = 'dark';
        this.textContent = '🌙'; // Moon emoji for night mode
    }
});


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

function searchPortfolio() {
  var input, filter, items, i, itemTitle, itemTags, titleElement;
  input = document.getElementById('searchBar');
  filter = input.value.toUpperCase();
  items = document.getElementsByClassName('portfolio-item');

  for (i = 0; i < items.length; i++) {
    titleElement = items[i].getElementsByTagName('h4')[0];
    itemTitle = titleElement ? titleElement.textContent.toUpperCase() : "";
    itemTags = (items[i].dataset.tags || "").toUpperCase();
    
    if (itemTitle.indexOf(filter) > -1 || itemTags.indexOf(filter) > -1) {
      items[i].style.display = '';
    } else {
      items[i].style.display = 'none';
    }
  }
}



document.addEventListener('DOMContentLoaded', function() {
    var items = document.getElementsByClassName('portfolio-item');
    var dropdown = document.getElementById('tagDropdown');
    var tags = new Set();

    for (var i = 0; i < items.length; i++) {
        var itemTags = items[i].dataset.tags.split(',');
        itemTags.forEach(function(tag) {
            tags.add(tag.trim());
        });
    }

	// Inside populateDropdown function

	tags.forEach(function(tag) {
		var div = document.createElement('div');
		div.textContent = tag;
		div.className = 'dropdown-tag';
		div.onclick = function() {
			document.getElementById('searchBar').value = tag; // Populate the search bar
			searchPortfolio(); // Trigger the search
			// Do not change the display property here
		};
		dropdown.appendChild(div);
	});
	

});

// ...previous code for dropdown population...

tags.forEach(function(tag) {
    var div = document.createElement('div');
    div.textContent = tag;
    div.className = 'dropdown-tag';
    div.onclick = function() {
        searchPortfolio(tag); // Pass the tag to the search function
    };
    dropdown.appendChild(div);
});

// ...rest of the code...


function populateDropdown() {
    var dropdown = document.getElementById('tagDropdown');
    dropdown.innerHTML = ''; // Clear existing tags
    // ... rest of the code to populate the dropdown ...
}

// Call populateDropdown initially and after each search
document.addEventListener('DOMContentLoaded', populateDropdown);

// Modify the tag onclick function
div.onclick = function() {
    document.getElementById('searchBar').value = tag;
    searchPortfolio();
    populateDropdown(); // Repopulate the dropdown
};

// Full-screen image functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all images with the class 'fullscreen-img'
    var images = document.querySelectorAll('.fullscreen-img');
    var overlay = document.createElement('div');
    overlay.id = 'fullscreen-overlay';
    overlay.innerHTML = '<span id="close-btn">✖</span><img id="fullscreen-image" src="">';
    document.body.appendChild(overlay);

    var fullscreenImage = document.getElementById('fullscreen-image');
    var closeButton = document.getElementById('close-btn');

    // Add click event to each image
    images.forEach(function(image) {
        image.addEventListener('click', function() {
            fullscreenImage.src = this.src; // Set the clicked image as the source for full-screen view
            overlay.style.display = 'flex'; // Show overlay
        });
    });

    // Add click event to close button
    closeButton.addEventListener('click', function() {
        overlay.style.display = 'none'; // Hide overlay
    });

    // Add event listener for 'ESC' key press
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            overlay.style.display = 'none'; // Hide overlay when ESC is pressed
        }
    });
});


