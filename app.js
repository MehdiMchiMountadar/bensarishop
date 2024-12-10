var binID = "64984a9b9d312622a3755c0c";

var nameElm = document.querySelector('#name');
var phoneElm = document.querySelector('#phone');
var adressElm = document.querySelector('#adress');
var wilayaElm = document.querySelector('#wilaya');
var quantityElm = document.querySelector('#quantity');

var buybtn = document.querySelector('#buybtn')

price = 1890
let activeColor;

nameElm.oninput = phoneElm.oninput = adressElm.oninput = wilayaElm.oninput = (e) => {
    if ( nameElm.value == '' || nameElm.value == " ") {
        nameElm.classList.add('redborder')
        buybtn.setAttribute('disabled', true)
        return;
    } else {
        nameElm.classList.remove('redborder')
    }

    if ( phoneElm.value.length != 10) {
        phoneElm.classList.add('redborder')
        buybtn.setAttribute('disabled', true)
        return;
    } else {
        phoneElm.classList.remove('redborder')
    }

    if ( adressElm.value == '' || adressElm.value == " ") {
        adressElm.classList.add('redborder')
        buybtn.setAttribute('disabled', true)
        return;
    } else {
        adressElm.classList.remove('redborder')
    }

    if ( wilayaElm.value == 0) {
        wilayaElm.classList.add('redborder')
        buybtn.setAttribute('disabled', true)
        return;
    } else {
        wilayaElm.classList.remove('redborder')
    }

    buybtn.removeAttribute('disabled')
}

quantityElm.oninput = (e) => {
    if(parseInt(e.target.value) > 3 ) {
        e.target.value = 3
    }
    document.querySelector('#total').textContent = (price * e.target.value) + parseInt(wilayaElm.value) ;
    document.querySelector('#total').textContent += ' DA' ;


}

wilayaElm.onchange = (e) => {
    document.querySelector('#deliverycost').textContent = wilayaElm.value;
    document.querySelector('#total').textContent = (price * quantityElm.value) + parseInt(wilayaElm.value);
    document.querySelector('#total').textContent += ' DA';
    document.querySelector('#deliverycost').textContent += ' DA' ;

}


async function sendOrder() {
    // Variables for JSON collecting.

    buybtn.value = 'Loading ...'
    buybtn.style.backgroundColor = 'royalblue';

    var name = nameElm.value;
    var phone = phoneElm.value;
    var adress = adressElm.value;
    var wilaya = wilayaElm.options[wilayaElm.selectedIndex].text;
    var quantity = quantityElm.value;
    var total = (quantity*price) + parseInt(wilayaElm.value);
    var color = activeColor
    var order;



    order = {
        name: name,
        phone: phone,
        adress: adress,
        wilaya: wilaya,
        total: total,
        color: color,
        quantity: quantity
    }


    fetch('https://api.jsonbin.io/v3/b/'+binID, {
        method: 'GET',
        headers: {
            'X-MASTER-KEY': '$2b$10$y558gdCBv36GFj23LrzbTuHOpS2ux62Py3Eln7PrwXB3vQPvs/xb.',
            'X-ACCESS-KEY': '$2b$10$8R1SzYPNNDrFSVJJVINwnOPz6Xp4sSRBkW53GsiJvOiVEK9Uu.Mhe'
        }
    }).then(response => {
        if (response.status === 200) {
            return response.json();
        } else {return;}
    }).then(result => {
        rec = result.record
        rec.orders[rec.orders.length] = order
        console.log(rec);
        fetch('https://api.jsonbin.io/v3/b/'+binID, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-MASTER-KEY': '$2b$10$y558gdCBv36GFj23LrzbTuHOpS2ux62Py3Eln7PrwXB3vQPvs/xb.',
                'X-ACCESS-KEY': '$2b$10$8R1SzYPNNDrFSVJJVINwnOPz6Xp4sSRBkW53GsiJvOiVEK9Uu.Mhe'
            },
            body: JSON.stringify(rec)
        }).then(res => res.json())
        .then(result => {
            console.log(result)
            buybtn.setAttribute('disabled', 'true')
            buybtn.value = 'CONFIRMED'
            buybtn.style.backgroundColor = 'grey'
        })
    })

    // Send it to the API using the fetch API.
}
activeColorElm = null
function enableColor(e){
    if (activeColorElm) { activeColorElm.classList.remove("active") }
    e.classList.add("active")
    activeColorElm = e

    activeColor = e.dataset.color
}