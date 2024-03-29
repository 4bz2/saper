const rozmiarPlanszy = 10;
const liczbaMin = 15;

let plansza = [];
let flagi = 0;
let czas = 0;

function nowaGra() {
	plansza = [];
	flagi = 0;
	czas = 0;
	const tabela = document.getElementById("board");
	tabela.innerHTML = "";
	for (let i = 0; i < rozmiarPlanszy; i++) {
		const wiersz = tabela.insertRow();
		plansza[i] = [];
		for (let j = 0; j < rozmiarPlanszy; j++) {
			const komorka = wiersz.insertCell();
			plansza[i][j] = {
				wartosc: null,
				odkryta: false,
				flaga: false
			};
			komorka.onclick = () => otworzKomorki(i, j);
			komorka.oncontextmenu = (e) => {
				e.preventDefault();
				ustawFlage(i, j);
			};
		}
	}
	wstawBomby();
	zliczMinyWokolKomorek();
}

function wstawBomby() {
	for (let i = 0; i < liczbaMin; i++) {
		let x, y;
		do {
			x = Math.floor(Math.random() * rozmiarPlanszy);
			y = Math.floor(Math.random() * rozmiarPlanszy);
		} while (plansza[x][y].wartosc === "BOMBA");
		plansza[x][y].wartosc = "BOMBA";
	}
}

function zliczMinyWokolKomorek() {
	for (let i = 0; i < rozmiarPlanszy; i++) {
		for (let j = 0; j < rozmiarPlanszy; j++) {
			if (plansza[i][j].wartosc === "BOMBA") continue;
			let miny = 0;
			for (let x = Math.max(0, i - 1); x <= Math.min(rozmiarPlanszy - 1, i + 1); x++) {
				for (let y = Math.max(0, j - 1); y <= Math.min(rozmiarPlanszy - 1, j + 1); y++) {
					if (plansza[x][y].wartosc === "BOMBA") miny++;
				}
			}
			plansza[i][j].wartosc = miny;
		}
	}
}

function otworzKomorki(x, y) {
	if (plansza[x][y].odkryta) return;
	plansza[x][y].odkryta = true;
	const komorka = document.getElementById("board").rows[x].cells[y];
	if (plansza[x][y].wartosc === "BOMBA") {
		komorka.classList.add("bomb");
		alert("Przegrałeś!");
		return;
	}
	komorka.textContent = plansza[x][y].wartosc;
	if (plansza[x][y].wartosc === 0) {
		for (let a = Math.max(0, x - 1); a <= Math.min(rozmiarPlanszy - 1, x + 1); a++) {
			for (let b = Math.max(0, y - 1); b <= Math.min(rozmiarPlanszy - 1, y + 1); b++) {
				otworzKomorki(a, b);
			}
		}
	}
}

function ustawFlage(x, y) {
	if (plansza[x][y].flaga) {
		plansza[x][y].flaga = false;
		flagi--;
		document.getElementById("board").rows[x].cells[y].classList.remove("flag");
	} else {
		plansza[x][y].flaga = true;
		flagi++;
		document.getElementById("board").rows[x].cells[y].classList.add("flag");
	}
}

// nowaGra();
