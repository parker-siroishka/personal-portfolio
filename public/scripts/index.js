const URL = location.origin; // root domain




// redirects

$("#ret-home").on("click", e => {
    window.location.assign(`${URL}/`);
});

$("#go-p0").on("click", e => {
    window.location.assign(`${URL}/pages/p0.html`);
});

$("#src-p0").on("click", e => {
    window.location.assign(`https://drive.google.com/file/d/1H5PZpiWlJfv92e5IhVExGJdY1EqBo_t6/view?usp=sharing`);
});

$("#det-p0").on("click", e => {
    window.location.assign(`${URL}/pages/p0Details.html`);
});


$("#go-p1").on("click", e => {
    window.location.assign(`${URL}/pages/p1.html`);
});

$("#det-p1").on("click", e => {
    window.location.assign(`${URL}/pages/p1Details.html`);
});