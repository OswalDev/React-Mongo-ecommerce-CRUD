
document.getElementById("buttom").addEventListener("click", function() {
    document.querySelector(".sidebar").classList.add("open")
})

document.getElementById("sidebar-close").addEventListener("click", function() {
    document.querySelector(".sidebar").classList.remove("open")
})
