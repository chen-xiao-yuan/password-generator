const flags = {
    uppercase: false,
    numbers: false,
    symbols: false,
    length: 5
}
const selectors = {
    copy: "copy",
    checkbox: "checkbox",
    slider: "slider",
    button: "button",
    sliderValue: document.querySelector(".value"),
    input: document.querySelector("input[type='text']")
}
//生成密码函数
const generatePassword = () => {
    const defaultCharacters = 'abcdefghijklmnopqrstuvwxyz'
    const characters = {
        uppercase: defaultCharacters.toUpperCase(),
        numbers: '0123456789',
        symbols: '~!@-#$'
    }
    //符合条件的字符列表
    const characterList = [
        defaultCharacters,
        ...flags.uppercase ? characters.uppercase : [],
        ...flags.numbers ? characters.numbers : [],
        ...flags.symbols ? characters.symbols : []
    ].join('')
    return Array.from({length: flags.length}, () => Math.floor(Math.random() * characterList.length)).map(number => characterList[number]).join('')
}
//使用switch为selectors对象中的每个选择器添加事件监听器
document.querySelector('#app').addEventListener('click', event => {
    switch (event.target.dataset.jsSelector) {
        //copy
        case selectors.copy:
            //选中框内全部文字
            selectors.input.select()
            //复制选中内容
            document.execCommand('copy')
            break;
        //checkboxs
        case selectors.checkbox:
            // flags[event.target.control.id] = !event.target.control.checked
            flags[event.target.id] = event.target.checked
            console.log(flags)
            break;
        //slider
        case selectors.slider:
            // const value = event.target.valueAsNumber
            const value = Number(event.target.value)
            selectors.sliderValue.innerText = value
            flags.length = value
            break;
        //button
        case selectors.button:
            //生成密码
            selectors.input.value = generatePassword()
            break;
    }
} )