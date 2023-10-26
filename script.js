
const ip = document.querySelector(".user-ip");
const btn = document.querySelector(".btn");
const details = document.querySelectorAll(".detail");

var map = L.map('map', {zoomControl: false}).setView([0, 0], 1);
const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 13,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

btn.addEventListener("click", function(){
	fetch(`https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_xL4AhuPqOnLeesIa5yRzwFAV0LPar&ipAddress=${ip.value}`)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        if (ip.value){
            details[0].textContent = ip.value;
        } else {
            details[0].textContent = "PLEASE DISABLE YOUR TRACKER?"
        }
        // details[0].textContent = ip.value;
        details[1].textContent = `${data.location.country}, ${data.location.region}`;
        details[2].textContent = `UTC ${data.location.timezone}`;
        details[3].textContent = data.isp;
		map.setView([data.location.lat, data.location.lng], 1);

		const marker = L.marker([data.location.lat, data.location.lng]).addTo(map);
		map.flyTo([data.location.lat, data.location.lng], 8)
    })
    .catch(function(error){
        ip.style.backgroundColor = "red";
        alert('PLEASE DISABLE YOUR TRACKERS', error);
    })
})


