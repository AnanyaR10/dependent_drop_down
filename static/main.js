console.log('hello')

const carsDataBox = document.getElementById('cars-data-box')
const carInput = document.getElementById('cars')
const carText = document.getElementById('car-text')

const carForm=document.getElementById('car-form')

const modelsDataBox = document.getElementById('models-data-box')
const modelInput = document.getElementById('models')
const modelText = document.getElementById('model-text')

const upazillasDataBox = document.getElementById('upazillas-data-box')
const upazillaInput = document.getElementById('upazillas')
const upazillaText = document.getElementById('upazilla-text')

const btnBox=document.getElementById('btn-box')
const alertBox=document.getElementById('alert-box')




const csrf=document.getElementsByName('csrfmiddlewaretoken')

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

    alertBox.innerHTML = ""
    modelsDataBox.innerHTML = ""
    modelText.textContent = "Choose a model"
    upazillasDataBox.innerHTML = ""
    upazillaText.textContent = "Choose an upazilla"
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

           // modelInput.addEventListener('change', e=>{  
               // btnBox.classList.remove('not-visible')
            //})

        },
        error: function (error) {
            console.log(error)
        },
    })
})


modelInput.addEventListener('change', e => {
    console.log(e.target.value)
    const selectedModel = e.target.value
    
    alertBox.innerHTML = ""
    upazillasDataBox.innerHTML = ""
    upazillaText.textContent = "Choose an upazilla"
    $.ajax({
        type: 'GET',
        url: `/upazillas-json/${selectedModel}/`,
        success: function (response) {
            console.log(response.data)
            const upazillasData = response.data
            upazillasData.map(item => {
                const option = document.createElement('div')
                option.textContent = item.name
                option.setAttribute('class', 'item')
                option.setAttribute('data-value', item.name)
                upazillasDataBox.appendChild(option)
            })

            //upazillaInput.addEventListener('change', e=>{
              //  btnBox.classList.remove('not-visible')
           // })

        },
        error: function (error) {
            console.log(error)
        },
    })
})
// 

carForm.addEventListener('submit',e=>{
    e.preventDefault()
    console.log("submitted")

    $.ajax({
        type:'POST',
        url:'/create/',
        data:{
            'csrfmiddlewaretoken':csrf[0].value,
            'car':carText.textContent,
            'model':modelText.textContent,
        },
        success: function(response){
            console.log(response)
            alertBox.innerHTML=`<div class="ui positive message>
                                    <div class="header">
                                    Success!
                                    </div>
                                    <p> Your order has been placed </p>
                                </div>`
        },
        error:function(error){
            console.log(error)
            alertBox.innerHTML=`<div class="ui negative message>
                                    <div class="header">
                                    Oops!
                                    </div>
                                    <p> Something went wrong </p>
                                </div>`
        }
    })
})
