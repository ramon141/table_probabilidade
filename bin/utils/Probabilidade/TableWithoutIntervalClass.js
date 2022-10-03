export function TableWithoutIntervalClass(datas, precision = 2) {

    const header = [
        'Xi', 'Frequência', 'Fac', 'Xi * Fi', '(Xi - xbar)²', 'Fi*(Xi - xbar)²'
    ];

    const columnMapping = {
        'frequency': 1,
        'fac': 2,
        'xi*fi': 3,
        'xi-xbar^2': 4,
        'fi*(xi-xbar)^2': 5,
    };

    let footer = {
        'total': 'Total',
        'frequency': 0,
        'fac': '-',
        'xi*fi': 0,
        'xi-xbar^2': 0,
        'fi*(xi-xbar)^2': 0,
    };

    let rows = [];

    convertDataToTable();
    calc();
    function convertDataToTable() {
        datas.forEach((data) => {
            rows.push([data]);
        })
    }

    function calc() {
        rol();
        calcFrequency();
        calcFac();
        calcXiFi();
        calcXi_XbarPow2();
        calcFiXi_Xbar();
    }

    function rol() {
        rows.sort((rowA, rowB) => {
            if (rowA[0] > rowB[0]) return 1;
            if (rowA[0] < rowB[0]) return -1;
            return 0;
        })
    }

    function removeDuplicates() {
        for (let i = 1; i < rows.length; i++) {
            if (rows[i - 1][0] === rows[i][0]) {
                rows.splice(i, 1);
                i--;
            }
        }
    }

    function calcFrequency() {
        let mapFrequency = {};
        footer['frequency'] = rows.length;

        rows.forEach((row) => {
            mapFrequency[row[0]] = (mapFrequency[row[0]] || 0) + 1;
        })

        removeDuplicates();

        rows.forEach((row, index) => {
            rows[index][columnMapping['frequency']] = mapFrequency[row[0]];
        })
    }

    function calcFac() {
        rows[0][columnMapping['fac']] = rows[0][0];
        for (let i = 1; i < rows.length; i++)
            rows[i][columnMapping['fac']] = (rows[i - 1][columnMapping['fac']] || 0) + rows[i][0];
    }

    function calcXiFi() {
        rows.forEach((row, index) => {
            const value = (row[0] * row[columnMapping['frequency']]);
            rows[index][columnMapping['xi*fi']] = value;
            footer['xi*fi'] += value;
        })
    }

    function getXbar() {
        return footer['xi*fi'] / footer['frequency'];
    }

    function calcXi_XbarPow2() {
        const xBar = getXbar();
        rows.forEach((row, index) => {
            const value = Math.pow(row[0] - xBar, 2);
            rows[index][columnMapping['xi-xbar^2']] = value;
            footer['xi-xbar^2'] += value;
        })
    }

    function calcFiXi_Xbar() {
        const xBar = getXbar();
        rows.forEach((row, index) => {
            const value = row[columnMapping['frequency']] * Math.pow(row[0] - xBar, 2);
            rows[index][columnMapping['fi*(xi-xbar)^2']] = value;
            footer['fi*(xi-xbar)^2'] += value;
        })
    }

    return {
        rows,
        footer,
        header,
        precision
    };
}