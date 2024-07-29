import moment from 'moment';

export const visitasData = [
    {
        id: 5,
        timestamp: moment().subtract(1, 'hours').format(),
        branch: 'Sucursal Norte',
        observations: 'Quinta visita',
    },
    {
        id: 4,
        timestamp: moment().subtract(1, 'day').format(),
        branch: 'Sucursal Norte',
        observations: 'Cuarta visita',
    },
    {
        id: 3,
        timestamp: moment().subtract(2, 'day').format(),
        branch: 'Sucursal Sur',
        observations: 'Tercera visita',
    },
    {
        id: 2,
        timestamp: moment().subtract(3, 'day').format(),
        branch: 'Sucursal Centro',
        observations: 'Segunda visita',
    },
    {
        id: 1,
        timestamp: moment().subtract(5, 'day').format(),
        branch: 'Sucursal Centro',
        observations: 'Primera visita',
    },
];