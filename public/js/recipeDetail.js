// document.addEventListener('DOMContentLoaded', function() {
//     const detailElements = document.querySelectorAll('.recipe-detail-ins');

//     detailElements.forEach(function(element) {
//         element.addEventListener('click', function() {
//             this.classList.toggle('expanded');
//         });
//     });
// });

$(document).ready(function() {
    $('.recipe-detail-ins').on('click', function() {
        $(this).toggleClass('expanded');
    });
});

