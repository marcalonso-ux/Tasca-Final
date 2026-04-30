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

            // Filtrar: solo añadir si el ID no existe ya
            const filtrades = dadesNoves.filter(nova => 
                !dadesActuals.some(actual => actual.id === nova.id)
            );

            const llistaFinal = [...dadesActuals, ...filtrades];
            this.saveActivitats(llistaFinal);
            return llistaFinal;
        } catch (e) {
            console.error("Error cargando " + url, e);
            return this.getActivitats();
        }
    }
};