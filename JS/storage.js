export const storage = {
    getActivitats() {
        return JSON.parse(localStorage.getItem('activitats')) || [];
    },
    saveActivitats(activitats) {
        localStorage.setItem('activitats', JSON.stringify(activitats));
    },
    async importarDesdeJSON(url) {
        try {
            const response = await fetch(url);
            const dadesNoves = await response.json();
            const dadesActuals = this.getActivitats();
            const filtrades = dadesNoves.filter(n => !dadesActuals.some(a => a.id === n.id));
            const final = [...dadesActuals, ...filtrades];
            this.saveActivitats(final);
            return final;
        } catch (e) { return this.getActivitats(); }
    }
};