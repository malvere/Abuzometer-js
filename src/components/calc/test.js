// Ваш строковый массив
const discountDataString = '2000/16000;4000/30000;6000/45000;8000/60000'

// Разделение строки на пары "величина скидки/сумма"
const discountPairs = discountDataString.split(';')

// Преобразование в объект
const discountObject = discountPairs.reduce((acc, pair) => {
  const [discount, amount] = pair.split('/').map(Number)
  acc[amount] = discount
  return acc
}, {})

// Теперь discountObject представляет собой объект, где ключи - суммы, а значения - величины скидок
console.log(discountObject)

// Пример использования: получение скидки для суммы 16000
const discountForAmount16000 = discountObject[16000]
console.log(discountForAmount16000) // Выводит 2000
