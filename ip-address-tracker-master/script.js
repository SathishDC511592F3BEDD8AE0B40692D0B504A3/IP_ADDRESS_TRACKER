const input = document.querySelector(".input")
const arrow = document.querySelector(".arrow")
const list = document.querySelectorAll(".info")


const map = L.map('map').setView([ 12.7994747, 80.2285224], 13);
const tileLayer = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
const attribution = { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }
const firstTile = L.tileLayer(tileLayer, attribution)
firstTile.addTo(map)
let marker = null;

function sendRequest() {
    let inputValue = input.value
    fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_95GefK9AfbWca3LCsB6Q27q8Kmlya&ipAddress=${inputValue}`)
        .then((response) => response.json())
        .then((responseData) => {
            if (responseData.code == 422) {
                alert(responseData.messages)
            } else {
                list[0].innerText = responseData.ip
                list[1].innerText = responseData.location.city + " " + responseData.location.region + " " + responseData.location.country
                list[2].innerText = responseData.location.timezone
                list[3].innerText = responseData.isp
            }
            map.flyTo([responseData.location.lat, responseData.location.lng], 13)
            if (marker !== null) {
                map.removeLayer(marker)
            }
            marker = L.marker([responseData.location.lat, responseData.location.lng])
            marker.addTo(map)
            marker.bindPopup(responseData.location.city + " " + responseData.location.region + " " + responseData.location.country).openPopup()
            marker.addEventListener("click", () => {
                map.flyTo([responseData.location.lat, responseData.location.lng], 13)
            })
        })


}
arrow.addEventListener("click", () => {
    sendRequest()
})
document.addEventListener("keypress", (e) => {

    if (e.key == "Enter") {
        sendRequest()
    }
})
sendRequest()