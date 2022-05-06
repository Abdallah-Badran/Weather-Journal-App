const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='
const apiKey = '&appid=80602efa0b5db3e00c2aca4f3d924a7b&units=metric'


const UIData = () => {
    const zipCode = document.getElementById('zip').value
    const feeling = document.getElementById('feelings').value
    const dateInst = new Date();
    const date = `${dateInst.getMonth() + 1}/${dateInst.getDate()}/${dateInst.getFullYear()}`;
    return { zipCode, feeling, date }
}

const getTemp = async (zipCode) => {
    const res = await fetch(baseURL + zipCode + apiKey)
    const data = await res.json()
    const temp = data.main.temp
    return temp
}

const toServer = async (temp, feeling, date) => {
    await fetch('/saveData', {
        method: 'POST',
        headers: { 'content-Type': 'application/json' },
        body: JSON.stringify({ temp, feeling, date })
    })
}

const fromServer = async () => {
    const res = await fetch('/getData')
    const data = await res.json()
    return data //{ temp, feeling, date }
}

const updateUI = ({ temp, feeling, date }) => {
    document.getElementById('temp').innerHTML = temp
    document.getElementById('date').innerHTML = date
    document.getElementById('content').innerHTML = feeling
}

const performAction = async () => {
    try {
        // get zipCode, feeling and generate date
        const { zipCode, feeling, date } = UIData()

        // get temperature via API
        const temp = await getTemp(zipCode)

        // send temp, feeling and date to local backend
        await toServer(temp, feeling, date)

        // get data from local backend
        const data = await fromServer()

        // update UI
        updateUI(data)

    } catch (error) {
        console.log(error)
    }
}


document.getElementById('generate').addEventListener('click', performAction)