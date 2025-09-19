#!/usr/bin/env node

/**
 * Функция для вычисления суммы отрицательных элементов между min и max
 * @param {number[]} arr - Входной массив чисел
 * @returns {number} - Сумма отрицательных элементов между min и max
 */
function sumNegativeBetweenMinMax(arr) {
    if (arr.length < 2) {
        return 0;
    }

    // Находим индексы минимального и максимального элементов
    let minIndex = 0;
    let maxIndex = 0;

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < arr[minIndex]) {
            minIndex = i;
        }
        if (arr[i] > arr[maxIndex]) {
            maxIndex = i;
        }
    }

    // Определяем границы для итерации
    const startIndex = Math.min(minIndex, maxIndex);
    const endIndex = Math.max(minIndex, maxIndex);

    // Суммируем отрицательные элементы в диапазоне
    let sum = 0;
    for (let i = startIndex + 1; i < endIndex; i++) {
        if (arr[i] < 0) {
            sum += arr[i];
        }
    }

    return sum;
}

/**
 * Парсим аргументы командной строки
 * Ожидаемый формат: node index.js 1 -2 3 -4 5
 */
function parseArguments() {
    const args = process.argv.slice(2);
    
    if (args.length === 0) {
        console.error('Ошибка: Необходимо передать массив чисел в качестве аргументов');
        console.log('Пример использования: node src/index.js 1 -2 3 -4 5 -6');
        process.exit(1);
    }

    const numbers = args.map(arg => {
        const num = parseFloat(arg);
        if (isNaN(num)) {
            console.error(`Ошибка: "${arg}" не является числом`);
            process.exit(1);
        }
        return num;
    });

    return numbers;
}

/**
 * Основная функция
 */
function main() {
    try {
        const inputArray = parseArguments();
        
        console.log('Входной массив:', inputArray);
        
        const result = sumNegativeBetweenMinMax(inputArray);
        
        console.log('Сумма отрицательных элементов между min и max:', result);
        
    } catch (error) {
        console.error('Произошла ошибка:', error.message);
        process.exit(1);
    }
}

// Запускаем программу
if (import.meta.url === `file://${process.argv[1]}`) {
    main();
}
