export function crearTasca({ id, titol, descripcio, fecha, categoria, prioritat, color }) {
    return {
        id: id || `task-${Date.now()}`,
        titol: titol || '',
        descripcio: descripcio || '',
        fecha: fecha || new Date().toISOString().split('T')[0],
        categoria: categoria || { nom: 'General', color: '#cccccc' },
        prioritat: prioritat || 'Mitjana',
        color: color || '#cccccc',
        realitzada: false
    };
}