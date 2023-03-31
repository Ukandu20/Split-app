/* This is a function that is adding an event listener to the document. When the DOM is loaded,
the slick carousel is displayed. */
document.addEventListener("DOMContentLoaded", function() {
    $('.slick-carousel').slick({
      centerMode: true,
      centerPadding: '60px',
      slidesToShow: 3,
      autoplay: true,
      autoplaySpeed: 2000,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 3
          }
        },
        {
          breakpoint: 480,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 1
          }
        }
      ]
    });
  });

  
/**
 * If the type of the password input is "password", change it to "text", otherwise change it to
 * "password"
 */
  function togglePassword() {
    let passwordInput = document.getElementById("password");
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
    } else {
        passwordInput.type = "password";
    }
}


// script.js

/* This is a function that is adding an event listener to the notificationBadge element. When the
notificationBadge element is clicked, the notificationDropdown element is displayed. When the user
clicks anywhere outside of the notificationBadge and notificationDropdown elements, the
notificationDropdown element is hidden. */
document.addEventListener('DOMContentLoaded', function () {
    const notificationBadge = document.querySelector('.notification-badge');
    const notificationDropdown = document.createElement('div');
  
    const notifications = [
      { text: 'New message from John', link: '#', type: 'message' },
      { text: 'Payment reminder', link: '#', type: 'payment' },
      { text: 'Website update', link: '#', type: 'update' }
    ];
  
    notificationDropdown.classList.add('notification-dropdown');
    notificationDropdown.style.display = 'none';
  
    let notificationList = '<ul>';

    for (let i = 0; i < notifications.length && i < 3; i++) {
      notificationList += `<li><a href="${notifications[i].link}">${notifications[i].text}</a></li>`;
    }
  
    if (notifications.length > 3) {
      notificationList += '<li><a href="notifications.html">See more</a></li>';
    }
  
    notificationList += '</ul>';
    notificationDropdown.innerHTML = notificationList;
    document.querySelector('.authLinks').insertBefore(notificationDropdown, document.querySelector('.fa-solid.fa-user').parentElement);
  
    notificationBadge.addEventListener('click', () => {
      if (notificationDropdown.style.display === 'none') {
        notificationDropdown.style.display = 'block';
      } else {
        notificationDropdown.style.display = 'none';
      }
    });
  
    // Clicking outside of the notification dropdown should close it
    document.addEventListener('click', (e) => {
      if (!notificationBadge.contains(e.target) && !notificationDropdown.contains(e.target)) {
        notificationDropdown.style.display = 'none';
      }
    });
  });


 /* The above code is adding an event listener to the userName element. When the userName element is
 clicked, the userMenu element is displayed. When the logoutBtn element is clicked, the user is
 redirected to the index.html page. When the user clicks anywhere outside of the userName and
 userMenu elements, the userMenu element is hidden. */
  document.addEventListener('DOMContentLoaded', function () {
    const userName = document.querySelector('.user-name');
    const userMenu = document.getElementById('userMenu');
    const logoutBtn = document.getElementById('logoutBtn');

    userName.addEventListener('click', function () {
        userMenu.style.display = userMenu.style.display === 'block' ? 'none' : 'block';
    });

    logoutBtn.addEventListener('click', function () {
        // Add your logout functionality here
        window.location.href = 'index.html';
    });

    window.addEventListener('click', function (e) {
        if (!userName.contains(e.target) && !userMenu.contains(e.target)) {
            userMenu.style.display = 'none';
        }
    });
});


/* This is a function that is adding an event listener to each item in the sidebar. When the item is
clicked, it removes the active class from all items in the sidebar and adds the active class to the
item that was clicked. */
document.querySelectorAll('.sidebar a').forEach(item => {
    item.addEventListener('click', event => {
        document.querySelectorAll('.sidebar a').forEach(link => {
            link.classList.remove('active');
        });
        event.target.classList.add('active');
    });
});

  