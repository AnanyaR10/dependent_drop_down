console.log('hello')

const carsDataBox = document.getElementById('cars-data-box')
const carInput = document.getElementById('cars')

const modelsDataBox = document.getElementById('models-data-box')
const modelInput = document.getElementById('models')

const modelText = document.getElementById('model-text')

$.ajax({
    type: 'GET',
    url: '/cars-json/',
    success: function (response) {
        console.log(response.data)
        const carsData = response.data
        carsData.map(item => {
            const option = document.createElement('div')
            option.textContent = item.name
            option.setAttribute('class', 'item')
            option.setAttribute('data-value', item.name)
            carsDataBox.appendChild(option)
        })

    },
    error: function (error) {
        console.log(error)
    },
})

carInput.addEventListener('change', e => {
    console.log(e.target.value)
    const selectedCar = e.target.value

    modelsDataBox.innerHTML = ""
    modelText.textContent = "Choose a model"
    $.ajax({
        type: 'GET',
        url: `/models-json/${selectedCar}/`,
        success: function (response) {
            console.log(response.data)
            const modelsData = response.data
            modelsData.map(item => {
                const option = document.createElement('div')
                option.textContent = item.name
                option.setAttribute('class', 'item')
                option.setAttribute('data-value', item.name)
                modelsDataBox.appendChild(option)
            })

        },
        error: function (error) {
            console.log(error)
        },
    })
})