document.addEventListener("DOMContentLoaded", function () {
  const scrollTopBtn = document.getElementById("scrollTopBtn");

  window.onscroll = function () {
    if (
      document.body.scrollTop > 100 ||
      document.documentElement.scrollTop > 100
    ) {
      scrollTopBtn.style.display = "block";
    } else {
      scrollTopBtn.style.display = "none";
    }
  };

  scrollTopBtn.onclick = function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth", 
    });
  };

  const elements = document.querySelectorAll(".translate");
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  });

  elements.forEach((element) => observer.observe(element));
  observer.observe(translate);
});

function showPopup() {
  const popup = document.getElementById("popupMessage");
  popup.style.top = "20px";

  setTimeout(() => {
    popup.style.top = "-200px";
  }, 8000);
}

window.onload = showPopup;

document.querySelector('.logout-btn').addEventListener('click', (event) => {
  event.preventDefault();

  // Message générique
  const confirmLogout = confirm("Êtes-vous sûr(e) de vouloir vous déconnecter ?");
  if (confirmLogout) {
      // Redirection vers la route de déconnexion
      window.location.href = '/logout';
  }
});

