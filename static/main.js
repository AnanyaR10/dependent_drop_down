// live search starts from here

const url=window.location.href
const searchForm= document.getElementById('search-form')
const searchInput=document.getElementById('search-input')
const resultsBox=document.getElementById('results-box')

const csrf_live=document.getElementsByName('csrfmiddlewaretoken')[0].value

console.log(csrf_live)

const sendSearchData= (address) =>{
    $.ajax({
        type:'POST',
        url:'search/',
        data:{
            'csrfmiddlewaretoken':csrf_live,
            'address':address,
        },
        success:(res)=>{
            console.log(res.data)
            const data=res.data
            resultsBox.innerHTML=``
            if(Array.isArray(data)){
                data.forEach(ad=>{
                    resultsBox.innerHTML+=
                    `<div>
                        <h3> division :${ad.division} </h3>
                        <h3> district :${ad.district} </h3>
                        <h3> upazilla :${ad.upazilla} </h3>
                        <br>
                        <br>
                    </div>
                    `
                })
            }
            else{
                if(searchInput.value.length>0){
                    resultsBox.innerHTML=`<b>${data}</b>`
                }
                else{
                    resultsBox.innerHTML=``
                }

            }
        },
        error: (err) =>{
            console.log(err)
        }
    })
}

searchInput.addEventListener('keyup',e=>{
    console.log(e.target.value)
    sendSearchData(e.target.value)
})



// dependent dropdown starts from here
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
            'division':divisionText.textContent,
            'district':districtText.textContent,
            'upazilla': upazillaText.textContent,
        },
        success: function(response){
            console.log(response)
            alertBox.innerHTML=`<div class="ui positive message>
                                    <div class="header">
                                    Success!
                                    </div>
                                    <p> Your address hase been saved </p>
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


