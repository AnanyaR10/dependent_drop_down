console.log('hello')

const divisionsDataBox = document.getElementById('divisions-data-box')
const divisionInput = document.getElementById('divisions')
const divisionText = document.getElementById('division-text')

const addressForm=document.getElementById('address-form')

const districtsDataBox = document.getElementById('districts-data-box')
const districtInput = document.getElementById('districts')
const districtText = document.getElementById('district-text')

const upazillasDataBox = document.getElementById('upazillas-data-box')
const upazillaInput = document.getElementById('upazillas')
const upazillaText = document.getElementById('upazilla-text')

const btnBox=document.getElementById('btn-box')
const alertBox=document.getElementById('alert-box')

var selectedDivision;




const csrf=document.getElementsByName('csrfmiddlewaretoken')

$.ajax({
    type: 'GET',
    url: '/divisions-json/',
    success: function (response) {
        console.log(response.data)
        const divisionsData = response.data
        divisionsData.map(item => {
            const option = document.createElement('div')
            option.textContent = item.division
            option.setAttribute('class', 'item')
            option.setAttribute('data-value', item.division)
            divisionsDataBox.appendChild(option)
        })

    },
    error: function (error) {
        console.log(error)
    },
})

divisionInput.addEventListener('change', e => {
    console.log(e.target.value)
    selectedDivision=e.target.value

    alertBox.innerHTML = ""
    districtsDataBox.innerHTML = ""
    districtText.textContent = "Choose a district"
    upazillasDataBox.innerHTML = ""
    upazillaText.textContent = "Choose an upazilla"
    $.ajax({
        type: 'GET',
        url: `/districts-json/${selectedDivision}/`,
        success: function (response) {
            console.log(response.data)
            const districtsData = response.data
            districtsData.map(item => {
                const option = document.createElement('div')
                option.textContent = item.district
                option.setAttribute('class', 'item')
                option.setAttribute('data-value', item.district)
                districtsDataBox.appendChild(option)
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


districtInput.addEventListener('change', e => {
    console.log(e.target.value)
    const selectedDistrict = e.target.value
    
    alertBox.innerHTML = ""
    upazillasDataBox.innerHTML = ""
    upazillaText.textContent = "Choose an upazilla"
    $.ajax({
        type: 'GET',
        url: `/upazillas-json/${selectedDivision}/${selectedDistrict}`,
        success: function (response) {
            console.log(response.data)
            const upazillasData = response.data
            upazillasData.map(item => {
                const option = document.createElement('div')
                option.textContent = item.upazilla
                option.setAttribute('class', 'item')
                option.setAttribute('data-value', item.upazilla)
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

addressForm.addEventListener('submit',e=>{
    e.preventDefault()
    console.log("submitted")

    $.ajax({
        type:'POST',
        url:'/create/',
        data:{
            'csrfmiddlewaretoken':csrf[0].value,
            'car':divisionText.textContent,
            'model':districtText.textContent,
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
