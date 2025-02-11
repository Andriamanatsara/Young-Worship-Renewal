
document.querySelectorAll("tbody tr").forEach(row => {
    row.addEventListener("click", () => {
        updateProfile(row);
    });
});

function updateProfile(element) {
    let name = element.dataset.name;
    let engagement = element.dataset.engagement;
    let role = element.dataset.role;
    let address = element.dataset.address;
    let phone = element.dataset.phone;
    let facebook = element.dataset.facebook;
    let email = element.dataset.email;
    let image = element.dataset.image;

    // Mise à jour du profil dans la section desktop
    document.getElementById("profileImage").src = image;
    document.getElementById("profileName").textContent = name;
    document.getElementById("profileRole").textContent = role;
    document.getElementById("profileAddress").textContent = address;
    document.getElementById("profilePhone").textContent = phone;
    document.getElementById("profileFacebook").href = facebook;
    document.getElementById("profileEmail").href = "mailto:" + email;

    // Mise à jour du popup mobile
    document.getElementById("popupImage").src = image;
    document.getElementById("popupName").textContent = name;
    document.getElementById("popupRole").textContent = role;
    document.getElementById("popupAddress").textContent = address;
    document.getElementById("popupPhone").textContent = phone;
    document.getElementById("popupFacebook").href = facebook;
    document.getElementById("popupEmail").href = "mailto:" + email;

    // Affichage du popup sur mobile
    document.getElementById("profilePopup").classList.add("active");
    document.getElementById("overlay").classList.add("active");
}

// --- FERMETURE DU POPUP ---
document.getElementById("closePopup").addEventListener("click", () => {
    document.getElementById("profilePopup").classList.remove("active");
    document.getElementById("overlay").classList.remove("active");
});

document.getElementById("overlay").addEventListener("click", () => {
    document.getElementById("profilePopup").classList.remove("active");
    document.getElementById("overlay").classList.remove("active");
});

// --- RECHERCHE AVEC SUPPRESSION ---
document.getElementById("searchInput").addEventListener("input", function() {
    let filter = this.value.toUpperCase();
    let rows = document.querySelectorAll("#memberTable tr");
    let clearBtn = document.getElementById("clearSearchBtn");
    let noResultsRow = document.getElementById("noResultsRow");

    // Affichage du bouton de suppression si le champ n'est pas vide
    clearBtn.style.display = filter.length > 0 ? "inline-block" : "none";

    let found = false; // Variable pour savoir si des résultats sont trouvés

    rows.forEach(row => {
        let name = row.dataset.name.toUpperCase();
        let engagement = row.dataset.engagement.toUpperCase();
        if (name.includes(filter) || engagement.includes(filter)) {
            row.style.display = "";
            found = true;
        } else {
            row.style.display = "none";
        }
    });

    // Afficher ou masquer le message "Aucun membre trouvé"
    if (!found && filter.length > 0) {
        noResultsRow.style.display = ""; 
    } else {
        noResultsRow.style.display = "none"; 
    }
});

// Fonction pour effacer la recherche
function clearSearch() {
    let searchInput = document.getElementById("searchInput");
    searchInput.value = "";
    document.getElementById("clearSearchBtn").style.display = "none"; 
    searchTable(); 
}

function searchTable() {
    let rows = document.querySelectorAll("#memberTable tr");
    rows.forEach(row => row.style.display = "");
    document.getElementById("noResultsRow").style.display = "none"; // Masquer le message
}

// --- TRI DU TABLEAU ---
let sortDirection = 1; // 1 = croissant, -1 = décroissant

function sortTable(columnIndex) {
    let table = document.getElementById("memberTable");
    let rows = Array.from(table.getElementsByTagName("tr"));

    rows.sort((a, b) => {
        let nameA = a.cells[columnIndex]?.textContent.trim().toLowerCase() || "";
        let nameB = b.cells[columnIndex]?.textContent.trim().toLowerCase() || "";
        return nameA.localeCompare(nameB) * sortDirection;
    });

    // Réinsérer les lignes triées
    rows.forEach(row => table.appendChild(row));

    // Mettre à jour l'icône de tri
    let indicator = document.querySelector(".sort-indicator");
    indicator.innerHTML = sortDirection === 1 ? "▲" : "▼";
    
    sortDirection *= -1; // Inverser le tri pour le prochain clic
}







 // Fonction de filtrage des éléments de la galerie
 filterSelection("all");

 function filterSelection(c) {
   var x, i;
   x = document.getElementsByClassName("column");
   if (c == "all") c = "";
   for (i = 0; i < x.length; i++) {
     x[i].classList.remove("show");
     if (x[i].className.indexOf(c) > -1) x[i].classList.add("show");
   }
 }

 // Activation de la classe .active sur le bouton sélectionné
 var btnContainer = document.getElementById("myBtnContainer");
 var btns = btnContainer.getElementsByClassName("btn");
 for (var i = 0; i < btns.length; i++) {
   btns[i].addEventListener("click", function() {
     var current = document.getElementsByClassName("active");
     current[0].classList.remove("active");
     this.classList.add("active");
   });
 }